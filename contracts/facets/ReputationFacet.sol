// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProposalReviewFacet.sol";

interface IReputationFacet {
    function updateImpactForProposal(
        address proposer,
        address[] calldata reviewers,
        uint256[5] calldata aggregatedLensScores, // [beta, vu, iota, phi, psi5]
        uint8 riskLevel
    ) external;

    function getInfluence(address user) external view returns (uint256);
}

interface ILensBenchmarkingFacet {
    function updatePostProposalMetrics(
        uint256 proposalId,
        uint256[5] calldata aggregatedLensScores,
        uint8 riskLevel
    ) external;
}

contract ProposalFinalizationFacet is ProposalReviewFacet {
    bytes32 public constant APPROVER_ROLE = keccak256("APPROVER_ROLE");

    address public reputationFacet;
    address public lensBenchmarkingFacet; // optional in Genesis

    // Minimum lens balance thresholds for Genesis (scaled to 1e18)
    uint256 public minLensScore = 0.6e18;      // e.g., no lens < 0.60
    uint256 public minSecurityScore = 0.75e18; // ψ5 stricter for high risk

    mapping(uint256 => bool) public approved; // proposalId => decision recorded

    event ProposalApproved(uint256 indexed id, address approver);
    event ProposalRejected(uint256 indexed id, address approver);

    modifier onlyApprover() {
        require(
            IGovernanceFacet(governanceFacet).hasRole(APPROVER_ROLE, msg.sender),
            "Not approver"
        );
        _;
    }

    function setFacets(address _reputationFacet, address _lensBenchmarkingFacet) external {
        // in a real diamond, this would be restricted (e.g., only admin)
        reputationFacet = _reputationFacet;
        lensBenchmarkingFacet = _lensBenchmarkingFacet;
    }

    /// @notice Aggregate lens scores from Steward/Senior/Reviewer reviews.
    function getAggregatedLensScores(uint256 id)
        public
        view
        returns (uint256[5] memory aggregated)
    {
        // For Genesis we’ll just do a simple arithmetic mean over all reviews.
        // Later you can weight by role, risk, or lens.

        uint256 count = 0;

        // iterate over known reviewers? For Genesis, we can assume off-chain
        // aggregation or store a simple set of addresses per role.
        // Here, we show structure, not full iteration logic.

        // This function is intentionally left as a conceptual stub:
        // in a real implementation, you’d also track arrays of reviewer addresses
        // per proposal and sum their scores into `aggregated[...]`.

        // Example shape:
        // aggregated[0] = avg(beta);
        // aggregated[1] = avg(vu);
        // aggregated[2] = avg(iota);
        // aggregated[3] = avg(phi);
        // aggregated[4] = avg(psi5);

        // For now, return zeros as placeholder; logic will be wired when
        // you define how many reviewers per stage & how you store the sets.
        aggregated[0] = 0;
        aggregated[1] = 0;
        aggregated[2] = 0;
        aggregated[3] = 0;
        aggregated[4] = 0;
    }

    /// @notice Check basic lens-balance constraints for Genesis.
    function _checkLensBalance(uint256[5] memory scores, uint8 riskLevel) internal view {
        for (uint256 i = 0; i < 5; i++) {
            require(scores[i] >= minLensScore, "Lens below minimum");
        }

        // Security stricter for higher risk proposals
        uint256 psi5 = scores[4];
        if (riskLevel == 2) {
            require(psi5 >= minSecurityScore, "Security lens too low for high risk");
        }
    }

    /// @notice Approver finalizes the proposal (approve or reject).
    /// This is where lifecycle → impact → benchmarking connects.
    function finalizeProposal(uint256 id, bool approve) external onlyApprover {
        Proposal storage p = proposals[id];
        require(p.stage == ProposalStage.ReviewerEvaluation, "Wrong stage");
        require(!approved[id], "Already finalized");
        require(!p.emergencyFrozen, "Emergency freeze active");

        // Aggregate lens scores across all reviews (stubbed shape for now)
        uint256[5] memory aggregated = getAggregatedLensScores(id);

        if (approve) {
            _checkLensBalance(aggregated, p.riskLevel);
            approved[id] = true;

            // Update impact for proposer + reviewers (offload details to ReputationFacet)
            address[] memory participants = _collectParticipantsForImpact(id);
            IReputationFacet(reputationFacet).updateImpactForProposal(
                p.proposer,
                participants,
                aggregated,
                p.riskLevel
            );

            // Optional: notify benchmarking/meta-health layer
            if (lensBenchmarkingFacet != address(0)) {
                ILensBenchmarkingFacet(lensBenchmarkingFacet).updatePostProposalMetrics(
                    id,
                    aggregated,
                    p.riskLevel
                );
            }

            _advanceStage(id, ProposalStage.ApproverDecision);
            _advanceStage(id, ProposalStage.Finalized);
            emit ProposalApproved(id, msg.sender);
        } else {
            approved[id] = false;
            _advanceStage(id, ProposalStage.ApproverDecision);
            _advanceStage(id, ProposalStage.Finalized);
            emit ProposalRejected(id, msg.sender);
        }
    }

    /// @notice Collect participants (e.g., reviewers) whose impact should be updated.
    /// Genesis stub: in a full implementation, you’d track arrays of addresses
    /// per stage when they review.
    function _collectParticipantsForImpact(uint256 /*id*/)
        internal
        view
        returns (address[] memory)
    {
        address[] memory empty;
        return empty;
    }
}
