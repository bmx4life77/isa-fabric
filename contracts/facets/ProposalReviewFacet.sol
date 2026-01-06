// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ProposalCoreFacet.sol";

contract ProposalReviewFacet is ProposalCoreFacet {
    bytes32 public constant STEWARD_ROLE        = keccak256("STEWARD_ROLE");
    bytes32 public constant SENIOR_STEWARD_ROLE = keccak256("SENIOR_STEWARD_ROLE");
    bytes32 public constant REVIEWER_ROLE       = keccak256("REVIEWER_ROLE");

    struct LensReview {
        uint256 beta;
        uint256 vu;
        uint256 iota;
        uint256 phi;
        uint256 psi5;
        string comment;
    }

    // proposalId => steward/senior/reviewer address => review
    mapping(uint256 => mapping(address => LensReview)) public stewardReviews;
    mapping(uint256 => mapping(address => LensReview)) public seniorReviews;
    mapping(uint256 => mapping(address => LensReview)) public reviewerReviews;

    event StewardReviewed(uint256 indexed id, address steward);
    event SeniorReviewed(uint256 indexed id, address senior);
    event ReviewerEvaluated(uint256 indexed id, address reviewer);

    modifier onlyRole(bytes32 role) {
        require(IGovernanceFacet(governanceFacet).hasRole(role, msg.sender), "Invalid role");
        _;
    }

    function stewardReview(
        uint256 id,
        LensReview memory review
    ) external onlyRole(STEWARD_ROLE) {
        Proposal storage p = proposals[id];
        require(p.stage == ProposalStage.Submission, "Wrong stage");

        stewardReviews[id][msg.sender] = review;
        emit StewardReviewed(id, msg.sender);

        // Genesis: single steward review is enough to advance
        _advanceStage(id, ProposalStage.StewardReview);
    }

    function seniorStewardReview(
        uint256 id,
        LensReview memory review
    ) external onlyRole(SENIOR_STEWARD_ROLE) {
        Proposal storage p = proposals[id];
        require(p.stage == ProposalStage.StewardReview, "Wrong stage");

        seniorReviews[id][msg.sender] = review;
        emit SeniorReviewed(id, msg.sender);

        _advanceStage(id, ProposalStage.SeniorStewardReview);
    }

    function reviewerEvaluation(
        uint256 id,
        LensReview memory review
    ) external onlyRole(REVIEWER_ROLE) {
        Proposal storage p = proposals[id];
        require(p.stage == ProposalStage.SeniorStewardReview, "Wrong stage");

        reviewerReviews[id][msg.sender] = review;
        emit ReviewerEvaluated(id, msg.sender);

        _advanceStage(id, ProposalStage.ReviewerEvaluation);
    }
}
