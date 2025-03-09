# DQiz: Decentralized Quiz dApp

DQiz is a decentralized quiz application that combines interactive quiz functionality with blockchain-based rewards. Built using Vite, React, and Hardhat, DQiz allows users to test their knowledge on various topics (e.g., computer science) and earn token rewards for high scores—all managed transparently on the blockchain.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Smart Contract Details](#smart-contract-details)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **Interactive Quiz:**  
  Fetches questions from the Open Trivia Database API, allowing users to select categories and specify the number of questions.
  
- **Blockchain-Based Rewards:**  
  Integrates with a smart contract deployed on the Educhain testnet. Users receive token rewards based on their quiz performance.
  
- **Decentralized Authentication:**  
  Users connect via MetaMask, and their rewards are tied to their wallet addresses.
  
- **Result Review:**  
  After completing the quiz, users can view their results along with the correct answers and a message indicating whether they’re eligible for rewards.
  
- **Claim Rewards:**  
  Only users who score above a threshold can claim rewards. The reward amount scales with the score.

## Technologies Used

- **Frontend:**  
  - [React](https://reactjs.org/) with [Vite](https://vitejs.dev/) for fast, modern development.
  - CSS for styling.

- **Backend & Blockchain:**  
  - [Hardhat](https://hardhat.org/) for smart contract development and deployment.
  - Solidity for writing smart contracts.
  - [Ethers.js](https://docs.ethers.io/) for blockchain interactions.
  - MetaMask for wallet integration.

- **APIs:**  
  - [Open Trivia Database](https://opentdb.com/) for fetching quiz questions.

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MetaMask](https://metamask.io/) browser extension
- Basic knowledge of React and blockchain development

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dqiz.git
cd dqiz
