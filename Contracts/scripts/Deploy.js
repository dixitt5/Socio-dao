const { ethers } = require("hardhat");

async function main() {
  const sociotokens = await ethers.getContractFactory("socioTokens");
  const socioTokens = await sociotokens.deploy();
  await socioTokens.deployed();
  console.log(`Tokens Contract deployed to: ${socioTokens.address}`);

  const execution = await ethers.getContractFactory("execution");
  const Execution = await execution.deploy();
  await Execution.deployed();

  console.log(`Execution Contract deployed to: ${Execution.address}`);

  const sociodao = await ethers.getContractFactory("socioContract");
  const socioDao = await sociodao.deploy(
    Execution.address,
    socioTokens.address
  );
  await socioDao.deployed();

  console.log(`socioDAO deployed to: ${socioDao.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
