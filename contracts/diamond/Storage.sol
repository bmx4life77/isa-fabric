// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

/**
 * @title Diamond Storage Layout (EIP-2535)
 *
 * @notice This defines the shared storage used by all facets in the Diamond.
 * Each facet imports this file and calls `appStorage()` to get access to the
 * same underlying storage struct.
 *
 * @dev You may safely extend the AppStorage struct as your Diamond grows.
 */
library Storage {
    bytes32 internal constant APP_STORAGE_POSITION =
        keccak256("natspecpp.fabric.app.storage");

    /**
     * @notice The unified application storage layout.
     * @dev Add whatever fields you need — all facets share this struct.
     */
    struct AppStorage {
        uint256 value;     // Example: used by ExampleFacet.setValue()
        // Add more fields here as your Diamond grows
        // uint256 counter;
        // mapping(address => bool) admins;
        // bytes32 configHash;
    }

    /**
     * @notice Returns a pointer to the Diamond's AppStorage.
     */
    function appStorage() internal pure returns (AppStorage storage s) {
        bytes32 position = APP_STORAGE_POSITION;
        assembly {
            s.slot := position
        }
    }
}
