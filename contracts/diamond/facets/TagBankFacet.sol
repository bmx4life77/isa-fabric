// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.19;

/// @title TagBankFacet
/// @notice Seed version — emits events for NatSpec++ tag registrations
contract TagBankFacet {
    event TagRegistered(bytes32 indexed tagKey, string schemaUri);

    /// @notice Registers a tag schema (placeholder, no on-chain storage yet)
    function registerTag(bytes32 tagKey, string calldata schemaUri) external {
        emit TagRegistered(tagKey, schemaUri);
    }

    function tagBankPing() external pure returns (string memory) {
        return "TagBankFacet alive";
    }
}
