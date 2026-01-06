// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { LibReentrancy } from "../libraries/LibReentrancy.sol";
import { Storage } from "../Storage.sol"; // adjust if your Storage.sol name/namespace differs

contract ExampleFacet {
    /// @notice Local nonReentrant modifier using the shared LibReentrancy guard.
    modifier nonReentrant() {
        LibReentrancy.enter();
        _;
        LibReentrancy.exit();
    }

    /// @notice Example state-changing function protected against reentrancy.
    function setValue(uint256 v) external nonReentrant {
        // ⚠️ Adjust this to match your actual Storage layout.
        Storage.AppStorage storage s = Storage.appStorage();
        s.value = v;
    }

    /// @notice Example read function (no guard needed).
    function getValue() external view returns (uint256) {
        Storage.AppStorage storage s = Storage.appStorage();
        return s.value;
    }
}
