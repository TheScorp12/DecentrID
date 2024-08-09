const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const DecentraID = await hre.ethers.deployContract("DecentraID");

  await DecentraID.deployed();

  console.log("DecentraID deployed to:", decentraID.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });