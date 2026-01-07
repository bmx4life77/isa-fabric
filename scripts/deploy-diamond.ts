// scripts/deploy-diamond.ts
import { ethers } from "hardhat";

async function main() {
  console.log("Deploying sample Diamond and facets...");

  const Diamond = await ethers.getContractFactory("Diamond");
  const diamond = await Diamond.deploy();
  await diamond.deployed();
  console.log("Diamond deployed:", diamond.address);

  // Example facet deployment (replace with real facet contracts)
  const FacetA = await ethers.getContractFactory("FacetA");
  const facetA = await FacetA.deploy();
  await facetA.deployed();
  console.log("FacetA deployed:", facetA.address);

  // TODO: perform diamond cut to add facet functions (requires diamondCut interface)
  console.log("NOTE: Implement diamondCut call here if your Diamond supports it.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
