// async function main() {
//     const QuizRewards = await ethers.getContractFactory("QuizRewards");
//     console.log("Deploying QuizRewards contract...");
//     const quizRewards = await QuizRewards.deploy();
//     // await quizRewards.deployed();
//     console.log("QuizRewards deployed to:", quizRewards.address);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch(error => {
//       console.error(error);
//       process.exit(1);
//     });
  
    // This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

export default buildModule("QuizRewards", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("QuizRewards", [], {
    
  });

  return { lock };
});