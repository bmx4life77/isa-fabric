// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LensBenchmarkingFacet {
    struct LensHealth {
        uint256 healthScore;     // 0-1 scaled to 1e18
        uint256 driftIndex;      // arbitrary normalized
        uint256 varianceIndex;
        bool    anomalyFlag;
        uint256 lastUpdated;
    }

    mapping(bytes32 => LensHealth) public lensHealth; // lensId => health
    uint256 public systemHealthScore;   // RASUV-style aggregate
    uint256 public calibrationUrgency;  // 0-1e18
    uint256 public emergencyRisk;       // 0-1e18

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    event LensHealthUpdated(bytes32 indexed lensId, uint256 healthScore, bool anomaly);
    event SystemHealthUpdated(uint256 systemHealthScore, uint256 calibrationUrgency, uint256 emergencyRisk);

    modifier onlyAdmin() {
        // in diamond, wired to GovernanceFacet role check
        _;
    }

    function updateLensHealth(
        bytes32 lensId,
        uint256 healthScore,
        uint256 driftIndex,
        uint256 varianceIndex,
        bool anomalyFlag
    ) external onlyAdmin {
        lensHealth[lensId] = LensHealth({
            healthScore: healthScore,
            driftIndex: driftIndex,
            varianceIndex: varianceIndex,
            anomalyFlag: anomalyFlag,
            lastUpdated: block.timestamp
        });
        emit LensHealthUpdated(lensId, healthScore, anomalyFlag);
    }

    function updateSystemHealth(
        uint256 _systemHealthScore,
        uint256 _calibrationUrgency,
        uint256 _emergencyRisk
    ) external onlyAdmin {
        systemHealthScore = _systemHealthScore;
        calibrationUrgency = _calibrationUrgency;
        emergencyRisk = _emergencyRisk;
        emit SystemHealthUpdated(_systemHealthScore, _calibrationUrgency, _emergencyRisk);
    }
}
