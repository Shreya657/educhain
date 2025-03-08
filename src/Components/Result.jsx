import React from 'react'
import { useLocation,useNavigate} from 'react-router-dom';
import './Result.css';
import { useState,useEffect } from 'react';
import { ethers, BrowserProvider } from "ethers";
import QuizRewardsABI from "../Contracts/QuizRewards.json"; // Adjust the path if needed
import { CONTRACT_ADDRESS } from "../config";



const Result = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const{score,total,questions=[]}=location.state||{score:4,total:5,questions:[]};
    const [showAnswers, setShowAnswers] = useState(false);
    const [quizContract, setQuizContract] = useState(null);
    const [isClaiming, setIsClaiming] = useState(false);
    const [claimSuccess, setClaimSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const rewardAmount = score > 1 ? (score - 1) * 100 : 0;
    useEffect(() => {
      const initBlockchain = async () => {
          if (!window.ethereum) {
              console.error("MetaMask is not installed.");
              return;
          }
          try {
            const provider = new BrowserProvider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                QuizRewardsABI, // Ensure ABI is correct
                signer
            );

            setQuizContract(contract);
            console.log("Blockchain connected in Result component");
        } catch (error) {
            console.error("Error connecting to blockchain:", error);
        }
      };

      initBlockchain();
  }, []);
  useEffect(() => {
    const hasClaimed = localStorage.getItem(`claimed_${window.ethereum.selectedAddress}_${score}`);
    if (hasClaimed === "true") {
        setClaimSuccess(true);
    }
}, []);

    const handleClaimRewards = async() => {
      if(!quizContract){
      console.log("Claiming blockchain rewards...");
      return;
      }

      try {
        setIsClaiming(true);
        const tx = await quizContract.issueReward(window.ethereum.selectedAddress, score);
        await tx.wait();
        localStorage.setItem(`claimed_${window.ethereum.selectedAddress}_${score}`, "true");

        setClaimSuccess(true);
        setMessage(`Reward claimed successfully! You earned ${rewardAmount} tokens.`);
        console.log("Reward successfully claimed on blockchain!");
    } catch (error) {
        console.error("Error claiming reward:", error);
        setMessage("Error issuing reward. Please try again.");
    } finally {
        setIsClaiming(false);
    }
      // Future blockchain reward logic will go here
    };
  return (
    <div className="result-container">
      <h2 className="result-heading">Your Result</h2>
      <div className="score-box">
      <h3>Your Score:</h3>
        <p className="score">{score} / {total}</p>
      </div>
      {score === total ? (
        <h4 className="success-msg">🎉 Congrats champ! You got all answers right! 🎉</h4>
      ) : (
     
        <h4 className="encourage-msg" >
            Good gob! keep it up
        </h4>
      )}

<div className="buttons">
        <button className="try-again-btn" onClick={() => navigate('/')}>Try Again</button>
        {rewardAmount>0 ?(
        <button className="claim-reward-btn" onClick={handleClaimRewards} disabled={isClaiming || claimSuccess}> {isClaiming ? "Claiming..." : claimSuccess ? "Reward Claimed 🎉" : "Claim Rewards"}</button>
        ):(
          <p className="low-score-msg">Your score is too low to claim rewards.</p>
        )}
      </div>
      <button className="toggle-answers-btn" onClick={() => setShowAnswers(!showAnswers)} >
        {showAnswers ? "Hide" : "Show"} Correct Answers
      </button>   
      {showAnswers &&questions.length>0 && (
        <div className="answer-review">
          <h3>Answer Review</h3>
          {questions.map((q, index) => (
            <div key={index} className="question-box">
              <p className="question-text">{index + 1}. {q.question}</p>
              {q.options.map((option, i) => (
                <p 
                  key={i} 
                  className={`option
                     ${option === q.correctAnswer ? "correct" :""} 
                     ${option === q.selectedAnswer && option!==q.correctAnswer? "wrong" : ""}`}>
                  {option}{option === q.correctAnswer ? "✅" : option === q.selectedAnswer ? "✖️" : ""}
                </p>
              ))}
                 </div>
          ))}
        </div>

        )}
    </div>
  )
}

export default Result
