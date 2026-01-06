// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ReputationFacet is AccessControl {
    bytes32 public constant STEWARD_ROLE        = keccak256("STEWARD_ROLE");
    bytes32 public constant META_COUNCIL_ROLE   = keccak256("META_COUNCIL_ROLE");

    struct LensImpact {
        uint256 beta;    // β
        uint256 vu;      // VU
        uint256 iota;    // ι
        uint256 phi;     // φ
        uint256 psi5;    // ψ₅
        uint256 composite;
        uint256 lastUpdate;
    }

    mapping(address => LensImpact) public lensProfiles;

    // global decay / ramp parameters (Genesis values)
    uint256 public constant DECAY_RATE  = 10;      // 10% per 30 days
    uint256 public constant DECAY_STEP  = 30 days;
    uint256 public constant MAX_SCORE   = 1e18;    // normalized 0-1
    uint256 public constant RAMP_PERIOD = 7 days;  // delegate-time style

    event LensImpactUpdated(address indexed user, uint256 composite);
    event ImpactReset(address indexed user);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// @notice Apply time-based decay to a user's lens impact.
    function _applyDecay(LensImpact memory li) internal view returns (LensImpact memory) {
        if (li.lastUpdate == 0) return li;

        uint256 elapsed = block.timestamp - li.lastUpdate;
        if (elapsed < DECAY_STEP) return li;

        uint256 steps = elapsed / DECAY_STEP;
        // Simple decay: score * (100-DECAY_RATE)^steps / 100^steps
        for (uint256 i = 0; i < steps; i++) {
            li.beta  = li.beta  * (100 - DECAY_RATE) / 100;
            li.vu    = li.vu    * (100 - DECAY_RATE) / 100;
            li.iota  = li.iota  * (100 - DECAY_RATE) / 100;
            li.phi   = li.phi   * (100 - DECAY_RATE) / 100;
            li.psi5  = li.psi5  * (100 - DECAY_RATE) / 100;
        }

        // recompute composite (simple arithmetic mean for Genesis)
        li.composite = (li.beta + li.vu + li.iota + li.phi + li.psi5) / 5;
        return li;
    }

    /// @notice Public getter for influence (time-decayed composite).
    function getInfluence(address user) external view returns (uint256) {
        LensImpact memory li = lensProfiles[user];
        li = _applyDecay(li);
        return li.composite;
    }

    /// @notice Called by governance after a proposal is approved to update the proposer and reviewers.
    /// `aggregatedLensScores` are proposal-level scores; this function turns them into deltas.
    function updateImpactForProposal(
        address proposer,
        address[] calldata participants,
        uint256[5] calldata aggregatedLensScores,
        uint8 riskLevel
    ) external onlyRole(STEWARD_ROLE) {
        // In Genesis, STEWARD_ROLE acts as the "governance caller".
        // Later you may tighten this or route via a dedicated GovernanceFacet.

        // Simple scheme:
        // - Proposer gets a larger positive delta.
        // - Participants (reviewers) get a smaller delta.
        // - RiskLevel might scale the deltas.

        uint256 proposerScale     = 1e17; // 0.1 per approval, as example
        uint256 participantScale  = 5e16; // 0.05 per approval

        if (riskLevel == 2) {
            proposerScale    = proposerScale * 12 / 10;    // +20% for high-risk
            participantScale = participantScale * 12 / 10;
        }

        _applyDelta(proposer, aggregatedLensScores, proposerScale);

        for (uint256 i = 0; i < participants.length; i++) {
            _applyDelta(participants[i], aggregatedLensScores, participantScale);
        }
    }

    function _applyDelta(
        address user,
        uint256[5] calldata lensScores,
        uint256 scale
    ) internal {
        LensImpact memory li = lensProfiles[user];
        li = _applyDecay(li);

        // ramp-in: if lastUpdate is recent, only partial effect
        uint256 elapsed = li.lastUpdate == 0 ? RAMP_PERIOD : (block.timestamp - li.lastUpdate);
        if (elapsed > RAMP_PERIOD) elapsed = RAMP_PERIOD;
        uint256 rampFactor = (elapsed * 1e18) / RAMP_PERIOD; // 0 → 1e18

        uint256 deltaBeta  = (lensScores[0] * scale * rampFactor) / (MAX_SCORE * 1e18);
        uint256 deltaVu    = (lensScores[1] * scale * rampFactor) / (MAX_SCORE * 1e18);
        uint256 deltaIota  = (lensScores[2] * scale * rampFactor) / (MAX_SCORE * 1e18);
        uint256 deltaPhi   = (lensScores[3] * scale * rampFactor) / (MAX_SCORE * 1e18);
        uint256 deltaPsi5  = (lensScores[4] * scale * rampFactor) / (MAX_SCORE * 1e18);

        li.beta  = _bounded(li.beta  + deltaBeta);
        li.vu    = _bounded(li.vu    + deltaVu);
        li.iota  = _bounded(li.iota  + deltaIota);
        li.phi   = _bounded(li.phi   + deltaPhi);
        li.psi5  = _bounded(li.psi5  + deltaPsi5);

        li.composite = (li.beta + li.vu + li.iota + li.phi + li.psi5) / 5;
        li.lastUpdate = block.timestamp;

        lensProfiles[user] = li;
        emit LensImpactUpdated(user, li.composite);
    }

    function _bounded(uint256 x) internal pure returns (uint256) {
        if (x > MAX_SCORE) return MAX_SCORE;
        return x;
    }

    /// @notice Anti-gaming reset on verified abuse.
    function resetImpact(address user) external onlyRole(META_COUNCIL_ROLE) {
        delete lensProfiles[user];
        emit ImpactReset(user);
    }

    // Optional helper: get full lens impact in one call.
    function getLensImpact(address user) external view returns (LensImpact memory) {
        LensImpact memory li = lensProfiles[user];
        li = _applyDecay(li);
        return li;
    }
}
