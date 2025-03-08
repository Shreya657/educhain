import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';



const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
       
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('user', email);
      setIsLoggedIn(true);
    } else {
      alert('Please enter email and password!');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="home-container">

      <div className="home-box">
        <h1 className="home-title">Welcome to Quiz app</h1>
   
      <h2>Login Page</h2>
      {isLoggedIn?(
        <div className="logged-in-box">
          <p className="user-info">you are logged in as <strong>{localStorage.getItem('user')}</strong></p>
          <Link to="/quiz">
        <button className="btn quiz-btn">go to quiz</button>
      </Link>
      <button onClick={handleLogout} className="btn logout-btn">Log out</button>
      </div>
      ):(
        <form action="" onSubmit={handleLogin} className="login-form">


          <div className="input-group">

            <label htmlFor="">Email</label>
            <input placeholder='enter email' className="input-field" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />

          </div>
          <div className="input-group">

<label htmlFor="">Password</label>
<input placeholder='enter password' className="input-field" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />


</div>
<button type='submit'  className="btn login-btn">Login</button>
        </form>
      )}
    
    </div>
    </div>
  )
}

export default Home
