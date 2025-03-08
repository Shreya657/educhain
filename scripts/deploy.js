async function main() {
    const QuizRewards = await ethers.getContractFactory("QuizRewards");
    console.log("Deploying QuizRewards contract...");
    const quizRewards = await QuizRewards.deploy();
    await quizRewards.deployed();
    console.log("QuizRewards deployed to:", quizRewards.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  