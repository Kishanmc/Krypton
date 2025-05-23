import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add authentication logic here
    alert(`Logging in with:\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}`);
  };

  return (
    <div style={{
      backgroundColor: '#0D0D1A',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: '#1A1A2E',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#00FFFF' }}>Login to Krypton</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Login</button>

        <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
          Don’t have an account? <a href="/register" style={{ color: '#00FFFF' }}>Register here</a>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0 16px 0',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#2A2A40',
  color: '#FFF',
  fontSize: '1rem'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#00FFFF',
  color: '#0D0D1A',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default Login;
