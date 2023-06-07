/** @type import('hardhat/config').HardhatUserConfig */

import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-contract-sizer";
import "@nomicfoundation/hardhat-foundry";
import { NetworkUserConfig } from "hardhat/types";
dotenv.config({ path: "./.env" });

const {
  INFURA_KEY,
  ETHERSCAN_KEY,
  PRIVATE_KEY,
  MNEMONIC,
  NOT_CI,
  POLYGONSCAN_KEY,
  OPTIMIZER_RUNS,
  COINMARKETCAP_API,
} = process.env;

const sharedNetworkConfig = {};

const sharedCompilerConfig = {
  optimizer: {
    enabled: true,
    runs: parseInt(OPTIMIZER_RUNS),
  },
  outputSelection: {
    "*": {
      "*": ["storageLayout"],
    },
  },
};

if (PRIVATE_KEY) {
  sharedNetworkConfig.accounts = [PRIVATE_KEY];
} else if (MNEMONIC) {
  sharedNetworkConfig.accounts = {
    mnemonic: MNEMONIC,
  };
} else {
  sharedNetworkConfig.accounts = {
    mnemonic: "Life is tufff",
  };
}

const config = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "build/artifacts",
    cache: "build/cache",
    deploy: "deploy",
    sources: "src",
  },
  solidity: {
    compilers: [{ version: "0.8.19", settings: sharedCompilerConfig }],
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    hardhat: {},
    mainnet: {
      ...sharedNetworkConfig,
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    goerli: {
      ...sharedNetworkConfig,
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    },
    matic: {
      ...sharedNetworkConfig,
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    mumbai: {
      ...sharedNetworkConfig,
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API,
    excludeContracts: ["contracts/testing/"],
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      ethereum: ETHERSCAN_KEY,
      goerli: ETHERSCAN_KEY,
      polygonMumbai: POLYGONSCAN_KEY,
      polygon: POLYGONSCAN_KEY,
    },
  },
};

export default config;
