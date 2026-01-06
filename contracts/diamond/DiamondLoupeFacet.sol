// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {LibDiamond} from "./libraries/LibDiamond.sol";

contract DiamondLoupeFacet {
    function facets() external view returns (address[] memory) {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        uint256 len = ds.selectors.length;
        address[] memory addrs = new address[](len);

        for (uint256 i = 0; i < len; i++) {
            bytes4 sel = ds.selectors[i];
            addrs[i] = ds.selectorToFacet[sel].facetAddress;
        }

        return addrs;
    }
}
