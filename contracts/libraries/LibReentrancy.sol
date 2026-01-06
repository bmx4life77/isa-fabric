// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

/// @notice Simple, Diamond-local reentrancy guard.
/// @dev Uses storage slot so all facets share the same guard.
library LibReentrancy {
    bytes32 internal constant REENTRANCY_STORAGE_POSITION =
        keccak256("natspecpp.fabric.reentrancy.storage");

    uint256 internal constant _NOT_ENTERED = 1;
    uint256 internal constant _ENTERED = 2;

    struct ReentrancyStorage {
        uint256 status;
    }

    function reentrancyStorage()
        internal
        pure
        returns (ReentrancyStorage storage rs)
    {
        bytes32 position = REENTRANCY_STORAGE_POSITION;
        assembly {
            rs.slot := position
        }
    }

    function enter() internal {
        ReentrancyStorage storage rs = reentrancyStorage();
        require(rs.status != _ENTERED, "ReentrancyGuard: reentrant call");
        rs.status = _ENTERED;
    }

    function exit() internal {
        ReentrancyStorage storage rs = reentrancyStorage();
        rs.status = _NOT_ENTERED;
    }

    /// @notice Optional helper to initialize the guard in diamond init
    function init() internal {
        ReentrancyStorage storage rs = reentrancyStorage();
        if (rs.status == 0) {
            rs.status = _NOT_ENTERED;
        }
    }
}
