import { useState } from 'react';

const API_URL = "http://localhost:3000";

function AuthSection({ onLoginSuccess }) {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: registerUsername, 
          password: registerPassword 
        })
      });

      const data = await response.json();

      if (data.error) {
        setMessage(data.error);
        setMessageType('error');
      } else {
        setMessage('User registered successfully!');
        setMessageType('success');
        setRegisterUsername('');
        setRegisterPassword('');
      }
    } catch (error) {
      setMessage('Registration failed');
      setMessageType('error');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: loginUsername, 
          password: loginPassword 
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setMessage('Login successful!');
        setMessageType('success');
        setLoginUsername('');
        setLoginPassword('');
        onLoginSuccess(data.token);
      } else {
        setMessage(data.error || 'Login failed');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Login failed');
      setMessageType('error');
    }
  };

  return (
    <div id="authSection">
      {message && (
        <div className={`message-box ${messageType}`}>
          {message}
        </div>
      )}

      <div className="form-section">
        <h2>Register</h2>
        <form id="registerForm" onSubmit={handleRegister}>
          <input 
            type="text" 
            id="regUsername" 
            placeholder="Username" 
            required
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input 
            type="password" 
            id="regPassword" 
            placeholder="Password" 
            required
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
      
      <div className="form-section">
        <h2>Login</h2>
        <form id="loginForm" onSubmit={handleLogin}>
          <input 
            type="text" 
            id="loginUsername" 
            placeholder="Username" 
            required
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input 
            type="password" 
            id="loginPassword" 
            placeholder="Password" 
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AuthSection;