// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IReputationFacet {
    function getInfluence(address user) external view returns (uint256);
}

interface IGovernanceFacet {
    function hasRole(bytes32 role, address account) external view returns (bool);
}

contract ProposalCoreFacet {
    enum ProposalStage {
        Submission,
        StewardReview,
        SeniorStewardReview,
        ReviewerEvaluation,
        ApproverDecision,
        Finalized
    }

    struct Proposal {
        uint256 id;
        address proposer;
        string description;        // NatSpec++ compatible
        string[] affectedDomains;  // hybrid aware
        uint8 riskLevel;           // 0: Low, 1: Medium, 2: High
        uint256 createdAt;
        ProposalStage stage;
        bool emergencyFrozen;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;

    // Cross-facet references (set via diamond init / config)
    address public reputationFacet;
    address public governanceFacet;

    event ProposalSubmitted(uint256 indexed id, address proposer, uint8 riskLevel);
    event ProposalStageAdvanced(uint256 indexed id, ProposalStage newStage);

    modifier onlyContributorWithInfluence() {
        uint256 influence = IReputationFacet(reputationFacet).getInfluence(msg.sender);
        require(influence > 0.1e18, "Insufficient impact to submit");
        _;
    }

    function submitProposal(
        string memory desc,
        string[] memory domains,
        uint8 risk
    ) external onlyContributorWithInfluence {
        // basic guardrails for Genesis
        require(risk <= 2, "Invalid risk level");

        Proposal storage p = proposals[proposalCount];
        p.id = proposalCount;
        p.proposer = msg.sender;
        p.description = desc;
        p.affectedDomains = domains;
        p.riskLevel = risk;
        p.createdAt = block.timestamp;
        p.stage = ProposalStage.Submission;

        emit ProposalSubmitted(proposalCount, msg.sender, risk);
        proposalCount++;
    }

    // simple internal utility for other facets
    function _advanceStage(uint256 id, ProposalStage newStage) internal {
        Proposal storage p = proposals[id];
        require(!p.emergencyFrozen, "Proposal frozen");
        require(uint8(newStage) == uint8(p.stage) + 1, "Invalid stage transition");
        p.stage = newStage;
        emit ProposalStageAdvanced(id, newStage);
    }
}
