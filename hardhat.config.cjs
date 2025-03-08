require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
 
  network: {
    opencampus: {
      url: "https://rpc.open-campus-codex.gelato.digital/",
      accounts: ["5f40cabec0d26d9f75a1ac3415b8a0b810973fc1ef978261be8368ace5df4db9"],
    },
  }

};