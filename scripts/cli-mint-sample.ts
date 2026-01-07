// scripts/cli-mint-sample.ts
import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const contractAddress = process.env.CONTRACT_ADDR;
  if (!contractAddress) {
    console.error("Set CONTRACT_ADDR env var (e.g. export CONTRACT_ADDR=0x...)");
    process.exit(1);
  }
  // Assuming the diamond exposes an ERC721-like mint function
  const ABI = ["function mint(address to, string memory tokenURI) public returns (uint256)"];
  const c = new ethers.Contract(contractAddress, ABI, signer);
  const tx = await c.mint(signer.address, "ipfs://QmTestCid");
  console.log("Mint tx:", tx.hash);
  await tx.wait();
  console.log("Mint complete");
}

main().catch((e) => { console.error(e); process.exit(1); });
