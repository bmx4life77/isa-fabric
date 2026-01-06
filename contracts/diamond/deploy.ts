// deploy.ts
// Root deploy script for the Diamond + core facets

import { ethers } from "hardhat";
import type { Contract } from "ethers";
import fs from "fs";
import path from "path";

function getSelectors(contract: Contract): string[] {
  const signatures = Object.keys(contract.interface.functions);
  return signatures.map((sig) => contract.interface.getSighash(sig));
}

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`\n👤 Deployer: ${deployer.address}`);

  // 1. Deploy DiamondCutFacet
  console.log("\n⛏ Deploying DiamondCutFacet...");
  const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet");
  const diamondCutFacet = await DiamondCutFacet.deploy();
  await diamondCutFacet.waitForDeployment();
  console.log("   DiamondCutFacet at:", diamondCutFacet.target);

  // 2. Deploy Diamond core
  console.log("\n💎 Deploying Diamond core...");
  const Diamond = await ethers.getContractFactory("Diamond");
  const diamond = await Diamond.deploy(
    deployer.address,
    diamondCutFacet.target
  );
  await diamond.waitForDeployment();
  const diamondAddress = diamond.target as string;
  console.log("   Diamond deployed at:", diamondAddress);

  // 3. Deploy facets
  console.log("\n🧩 Deploying facets...");

  const DiamondLoupeFacet = await ethers.getContractFactory(
    "DiamondLoupeFacet"
  );
  const diamondLoupeFacet = await DiamondLoupeFacet.deploy();
  await diamondLoupeFacet.waitForDeployment();
  console.log("   DiamondLoupeFacet at:", diamondLoupeFacet.target);

  const OwnershipFacet = await ethers.getContractFactory("OwnershipFacet");
  const ownershipFacet = await OwnershipFacet.deploy();
  await ownershipFacet.waitForDeployment();
  console.log("   OwnershipFacet at:", ownershipFacet.target);

  const ExecutionFacet = await ethers.getContractFactory("ExecutionFacet");
  const executionFacet = await ExecutionFacet.deploy();
  await executionFacet.waitForDeployment();
  console.log("   ExecutionFacet at:", executionFacet.target);

  const GovernanceFacet = await ethers.getContractFactory("GovernanceFacet");
  const governanceFacet = await GovernanceFacet.deploy();
  await governanceFacet.waitForDeployment();
  console.log("   GovernanceFacet at:", governanceFacet.target);

  const TagBankFacet = await ethers.getContractFactory("TagBankFacet");
  const tagBankFacet = await TagBankFacet.deploy();
  await tagBankFacet.waitForDeployment();
  console.log("   TagBankFacet at:", tagBankFacet.target);

  // 4. Prepare diamondCut
  console.log("\n✂️  Preparing diamondCut...");

  const cuts: {
    facetAddress: string;
    action: number;
    functionSelectors: string[];
  }[] = [];

  const FacetCutAction = {
    Add: 0,
    Replace: 1,
    Remove: 2,
  };

  function pushFacet(contract: Contract) {
    const selectors = getSelectors(contract);
    cuts.push({
      facetAddress: contract.target as string,
      action: FacetCutAction.Add,
      functionSelectors: selectors,
    });
  }

  pushFacet(diamondLoupeFacet);
  pushFacet(ownershipFacet);
  pushFacet(executionFacet);
  pushFacet(governanceFacet);
  pushFacet(tagBankFacet);

  // 5. Execute diamondCut through Diamond
  console.log("\n🚀 Executing diamondCut on Diamond...");
  const diamondCut = await ethers.getContractAt(
    "IDiamondCut",
    diamondAddress
  );

  const tx = await diamondCut.diamondCut(
    cuts,
    ethers.ZeroAddress,
    "0x"
  );
  const receipt = await tx.wait();
  if (!receipt || receipt.status !== 1) {
    throw new Error("diamondCut failed");
  }
  console.log("   diamondCut complete.");

  // 6. Save deployment info
  const outDir = path.join(__dirname, "deployments");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    diamond: diamondAddress,
    facets: {
      diamondCutFacet: diamondCutFacet.target,
      diamondLoupeFacet: diamondLoupeFacet.target,
      ownershipFacet: ownershipFacet.target,
      executionFacet: executionFacet.target,
      governanceFacet: governanceFacet.target,
      tagBankFacet: tagBankFacet.target,
    },
  };

  fs.writeFileSync(
    path.join(outDir, "diamond.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n✅ Diamond deployment complete.");
  console.log("   Deployment info saved to deployments/diamond.json\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
