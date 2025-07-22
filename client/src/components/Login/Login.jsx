import React, { useState, useEffect } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setShowText(true); // Trigger animation when component mounts
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting login request...');
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok && data.loginId) {
        localStorage.setItem('loginId', data.loginId);
        localStorage.setItem('role', data.role); // Store user's role
        navigateToHomePage(data.role); // Redirect based on role
      } else {
        console.log('Login failed:', data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again later.');
    }
  };

  const navigateToHomePage = (role) => {
    switch (role) {
      case 'farmer':
        navigate('/Farmer-Home');
        break;
      case 'customer':
        navigate('/Customer-Home');
        break;
      case 'admin':
        navigate('/bid-request');
        break;
      default:
        // Handle unknown role or error condition
        navigate('/login');
        break;
    }
  };

  return (
    <div className="login-container1">
         <div className="full-login">
             <div className="login-overlay"></div>
                 <div className="login-title">
                     <h1>FARMERS PORTAL</h1>
                 </div>
                      <div className={`text-part ${showText ? 'show' : ''}`}>
                         <h2>Empowering Farmers</h2>
                         <p className='p1-login'> Join us in revolutionizing agriculture and empowering farmers worldwide.</p>
                         <p className='p2-login'>Farmers are the backbone of our society, working tirelessly to feed and nourish.</p>
                        </div>
                             <div className="login2-container">
                                 <div className="loginform">
                                       <form onSubmit={handleLogin}>
                                            <h1>Login</h1>
                                                 <div className="login-input-box">
                                                        <FaUser className='user-icon' />
                                                              <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} style={{ color: 'black' }} />
               
                                                  </div>
                                                    <div className="login-input-box">
                                                           <FaLock className='password-icon' /> 
                                                      
                                                               <input type="password"  name="password"  placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ color: 'black' }} />
                
                                                    </div>
                                                              <button type='submit'>Login</button>
                                                            <div className="login-reglink">
                                                                  <p>Don't have an account? <Link to='/Signup'>Register</Link></p>
                                                             </div>
                                                         <div className="error-message">{error}</div>
                                         </form>
                                  </div>
                              </div>
             </div>
    </div>
  );
};
