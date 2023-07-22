// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Quoter = await hre.ethers.getContractFactory("Quoter");
  const quoter = await Quoter.deploy(
    // "0x1F98431c8aD98523631AE4a59f267346ea31F984
    // Uniswap Factory address (Sepolia network), WETH address on sepolia
    "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008", "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"
  );

  await quoter.deployed();

  console.log(
    `Quoter Contract deployed at address: ${quoter.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
