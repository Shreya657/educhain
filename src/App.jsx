import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';  // Home component
import Quiz from './Components/Quiz';  // Quiz component
import Result from './Components/Result';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {



  return (
    <div>
      <div className='appdiv'>
        
      <h1>WELCOME TO DQIZ</h1>
      </div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/quiz' element={<ProtectedRoute><Quiz/></ProtectedRoute>}/>
          <Route path='/result' element={<ProtectedRoute><Result/></ProtectedRoute>}/>

        </Routes>
      </Router>

    </div>
  )
}

export default App
