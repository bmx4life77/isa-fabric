// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {LibDiamond} from "./libraries/LibDiamond.sol";

contract DiamondCutFacet {
    function diamondCut(
        address facetAddress,
        bytes4[] calldata selectors
    ) external {
        LibDiamond.enforceIsContractOwner();
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        for (uint256 i = 0; i < selectors.length; i++) {
            ds.selectorToFacet[selectors[i]] =
                LibDiamond.FacetAddressAndSelectorPosition({
                    facetAddress: facetAddress,
                    selectorPosition: uint16(ds.selectors.length)
                });

            ds.selectors.push(selectors[i]);
        }
    }
}
