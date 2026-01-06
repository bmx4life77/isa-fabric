// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.19;

/// @title ERC-173: Ownable standard used in Diamonds
interface IERC173 {
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /// @notice Get the address of the owner
    function owner() external view returns (address);

    /// @notice Set the address of the new owner
    function transferOwnership(address _newOwner) external;
}
