import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Quiz.css';




const Quiz = () => {
    const[questions,setQuestions]=useState([]);
    const[score,setScore]=useState(0);
    const[currentQuestion,setCurrentQuestion]=useState(0);
    const[isComplete,setIsComplete]=useState(false);
    const navigate=useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const[loading,setLoading]=useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
      fetchAIQuestions();
    }, []);
  
    const fetchAIQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=5&type=multiple");
          
          const formattedQuestions = response.data.results.map((q) => ({
            question:decodeEntities(q.question),
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            correctAnswer: q.correct_answer,
          }));
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
      const handleSubmit=()=>{
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
        
    
      {currentQuestion === questions.length -1  && (
        <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
      )}
        </div>

    </div>
  )
}

export default Quiz
