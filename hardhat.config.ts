import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "./tasks/natspec-tasks";
import "./tasks/benchmark-tasks";

const config: HardhatUserConfig = {
  solidity: "0.8.28",

  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./tests",
  },

  gasReporter: {
    enabled: true,
  },
};

export default config;
