require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    polygonAmoy:{
      url: 'https://rpc-amoy.polygon.technology/',
      accounts: ['0237ff2ad0de9c13520b961f3f5eb834510c5e63d22922e1f1088b43bfa1e656'],
  }
  }
};
