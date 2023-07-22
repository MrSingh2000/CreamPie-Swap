require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.2",
      },
      {
        version: "0.7.6",
        settings: {},
      },
    ],
  },
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://goerli.infura.io/v3/59ad491c517c444daafca3b6c64663f5",
      accounts: ["28bcd28eb8dfbf42763e0785c3a8f6f76b5aad29a7fb9f38c3d4b560c33ec9ad"]
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/vYe5kCfXNWXYVMPaHaj_J30r_HyFZgiP",
      accounts: ["28bcd28eb8dfbf42763e0785c3a8f6f76b5aad29a7fb9f38c3d4b560c33ec9ad"]
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/SfLT2nHCR7TqUFmn_PeBknA9N-Nl-BRH",
      accounts: ["28bcd28eb8dfbf42763e0785c3a8f6f76b5aad29a7fb9f38c3d4b560c33ec9ad"]
    }
  },
  paths: {
    artifacts: "./client/src/artifacts"
  }
};

// contract address: 0xC516Debd14f7272c1E1Fb995040D996AD9065030