// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.19;

/// @title EIP-2535 Diamond Loupe Interface
interface IDiamondLoupe {
    struct Facet {
        address facetAddress;
        bytes4[] functionSelectors;
    }

    /// @notice Gets all facets and their selectors.
    function facets() external view returns (Facet[] memory);

    /// @notice Gets all the function selectors provided by a facet.
    function facetFunctionSelectors(address _facet)
        external
        view
        returns (bytes4[] memory);

    /// @notice Get all facet addresses used by a diamond.
    function facetAddresses() external view returns (address[] memory);

    /// @notice Gets the facet that supports the given selector.
    function facetAddress(bytes4 _selector) external view returns (address);
}
