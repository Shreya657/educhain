import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Quiz.css';
import { ethers, BrowserProvider } from "ethers";
import QuizRewardsABI from "../Contracts/QuizRewards.json"; // Adjust the path if needed
import { CONTRACT_ADDRESS } from "../config";




const Quiz = () => {
    const[questions,setQuestions]=useState([]);
    const[score,setScore]=useState(0);
    const[currentQuestion,setCurrentQuestion]=useState(0);
    const[isComplete,setIsComplete]=useState(false);
    const navigate=useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const[loading,setLoading]=useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizContract, setQuizContract] = useState(null);

    useEffect(() => {
      const initBlockchain = async () => {
        console.log({ethereum: window.ethereum})
        if (window.ethereum) {
          try {
            const provider = new BrowserProvider(window.ethereum);
            console.log({provider})
            // Request account access
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = provider.getSigner();
            console.log({signer});
            // Create a contract instance using the ABI and contract address
            const contract = new ethers.Contract(
              CONTRACT_ADDRESS,
              QuizRewardsABI.abi || QuizRewardsABI, // Use .abi if your JSON has it, else use directly
              signer
            );
            setQuizContract(contract);
            console.log("Blockchain connected and contract instance created");
          } catch (error) {
            console.error("Error connecting to blockchain:", error);
          }
        } else {
          console.error("MetaMask is not installed.");
        }
      };
  
      initBlockchain();
    }, []);
  
    
    useEffect(() => {
      fetchAIQuestions();
    }, []);
  
    const fetchAIQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=5&category=18&type=multiple");
          
          const formattedQuestions = response.data.results.map((q) => ({
            question:decodeEntities(q.question),
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            correctAnswer: q.correct_answer,
          }));
          console.log({formattedQuestions})
          setQuestions(formattedQuestions);
        } catch (error) {
          console.error("Error fetching quiz:", error);
          setLoading(false);
        }
      };
        
      const decodeEntities = (encodedString) => {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = encodedString;
        return textArea.value;
      };
     


      const handleAnswer = (answer) => {
        // const updatedAnswers = [...userAnswers];
        // updatedAnswers[currentQuestion] = answer;
        // setUserAnswers(updatedAnswers);
        setSelectedAnswer(answer);
        setQuestions((prevQuestions) =>
          prevQuestions.map((q, index) =>
              index === currentQuestion ? { ...q, selectedAnswer: answer } : q
          )
      );
    
        if (answer === questions[currentQuestion].correctAnswer) {
          setScore((prevScore) => prevScore + 1);
        }
    
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setIsComplete(true);
        }
      
      };
      const handleBack = () => {
        if (currentQuestion > 0) {
          setCurrentQuestion((prev) => prev - 1);
        }
      };
      const handleNext = () => {
        if (currentQuestion > 0) {
          setCurrentQuestion((prev) => prev + 1);
        }
      };
      const handleSubmit=async()=>{
        if(currentQuestion===questions.length){
          navigate('/result',{state:{score,total:questions.length,questions}});
          return ;
        }
        if(quizContract){
          try {
            // Calling the smart contract function 'issueReward'
            // Ensure that your smart contract function signature matches:
            // function issueReward(address _user, uint256 _amount) public
            const tx = await quizContract.issueReward(window.ethereum.selectedAddress, score);
            await tx.wait();
            console.log("Reward issued on blockchain!");
          } catch (error) {
            console.error("Error issuing reward:", error);
          }
        } else {
          console.log("Blockchain contract not connected.");
        }
        
        navigate('/result',{state:{score,total:questions.length,questions}});
      }
    
      if (loading) {
        return <div className="loading">Loading Questions...</div>;
      }
    
      if (questions.length === 0) {
        return <div className="error">Failed to load questions. Please refresh.</div>;
      }
    
      const current = questions[currentQuestion];
    
      
    
  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      <h3>Question {currentQuestion + 1} of {questions.length}</h3>
      <h2 className="question-text">{current.question}</h2>

      <div className="options-container">
      {current.options.map((option, index) => (

        <button key={index}
        
        
          className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
        onClick={() => handleAnswer(option)}
       >
        {option}
        </button>
      ))}
      </div>

      <div className="navigation-buttons">
        <button className="back-btn" onClick={handleBack} disabled={currentQuestion === 0}>
          Back
        </button>
        
        <button className="next-btn" onClick={handleNext} disabled={currentQuestion ===questions.length -1 }>
          Next
        </button>
        {currentQuestion === questions.length - 1 && 
          // Conditionally render the submit button if score > threshold; otherwise, show a message.
            (
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Quiz
            </button>
          )}
        </div>
        
    
    
        </div>


  )
}

export default Quiz
