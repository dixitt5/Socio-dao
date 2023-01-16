const hre = require("hardhat");
const ethers = hre.ethers;
require("dotenv").config({ path: ".env" });
// const { CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  // Compile our Contracts, just in case
  await hre.run("compile");

  // Get a signer from the HardHard environment
  // Learn about signers here: https://docs.ethers.io/v4/api-wallet.html
  const [tokenRecipient] = await ethers.getSigners();
  console.log(tokenRecipient.address);
  // This gets the contract from
  const Token = await hre.ethers.getContractFactory("socioTokens");
  const token = await Token.deploy();
  await token.deployed();
  await token.deployTransaction.wait();

  // Deploy Timelock
  const delay = 172800;
  const Timelock = await ethers.getContractFactory("TimeLock");
  const timelock = await Timelock.deploy(tokenRecipient.address, delay);
  await timelock.deployed();
  await timelock.deployTransaction.wait();

  // Deploy Governance
  const Gov = await ethers.getContractFactory("socioContract");
  const gov = await Gov.deploy(
    tokenRecipient.address,
    token.address,
    tokenRecipient.address
  );
  await gov.deployed();
  await gov.deployTransaction.wait();

  console.log(`Token deployed to: ${token.address}`);
  console.log(`TimeLock deployed to: ${timelock.address}`);
  console.log(`GovernorAlpha deployed to: ${gov.address}`);

  const initialBalance = await token.balanceOf(tokenRecipient.address);
  console.log(
    `${initialBalance / 1e18} tokens transfered to ${tokenRecipient.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
