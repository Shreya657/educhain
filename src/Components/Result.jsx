import React from 'react'
import { useLocation,useNavigate} from 'react-router-dom';
import './Result.css';
import { useState } from 'react';



const Result = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const{score,total,questions=[]}=location.state||{score:0,total:0,questions:[]};
    const [showAnswers, setShowAnswers] = useState(false);

    const handleClaimRewards = () => {
      console.log("Claiming blockchain rewards...");
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
        <button className="claim-reward-btn" onClick={handleClaimRewards}>Claim Rewards</button>
      </div>
      <button className="toggle-answers-btn" onClick={() => setShowAnswers(!showAnswers)}>
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
