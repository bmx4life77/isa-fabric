// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.19;

/// @title GovernanceFacet
/// @notice Minimal placeholder for governance-related functions
contract GovernanceFacet {
    function governancePing() external pure returns (string memory) {
        return "GovernanceFacet alive";
    }
}
