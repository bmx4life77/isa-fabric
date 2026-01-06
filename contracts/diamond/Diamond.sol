// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {LibDiamond} from "./libraries/LibDiamond.sol";

contract Diamond {
    constructor(address owner) {
        LibDiamond.setContractOwner(owner);
    }

    fallback() external payable {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();

        LibDiamond.FacetAddressAndSelectorPosition memory f =
            ds.selectorToFacet[msg.sig];

        address facet = f.facetAddress;
        require(facet != address(0), "Diamond: Function not found");

        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(
                gas(),
                facet,
                0,
                calldatasize(),
                0,
                0
            )
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {}
}


