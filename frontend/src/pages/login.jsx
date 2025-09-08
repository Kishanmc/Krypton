import React, { useState } from "react";

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map 'name' to 'username' for signup API, keep original for login
    const payload = isSignup
      ? { name: formData.name, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    const endpoint = isSignup ? "/signup" : "/login";

    try {
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(isSignup ? "Signup Successful! Please log in." : "Login Successful!");
        
        if (!isSignup) {
          localStorage.setItem("auth-token", data.token);
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          // Reset form after successful signup
          setFormData({ name: "", email: "", password: "" });
          setIsSignup(false); // switch to login form after signup
        }
      } else {
        setMessage(data.errors || data.message || "Authentication failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="auth-page">
        <form className="auth-box" onSubmit={handleSubmit}>
          <h2>{isSignup ? "Create Your Account" : "Welcome Back"}</h2>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isSignup && (
            <label className="terms">
              <input type="checkbox" required />
              <span>I agree to the terms and privacy policy</span>
            </label>
          )}
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
          <p className="switch">
            {isSignup ? "Already have an account?" : "New here?"}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? " Login" : " Sign up"}
            </span>
          </p>
          {message && <p className="message">{message}</p>}
        </form>
      </div>

      <style jsx="true">{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #e0eafc, #cfdef3);
        }

        .auth-page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #d9e4f5, #ffffff);
        }

        .auth-box {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .auth-box h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #222;
        }

        .auth-box input[type="text"],
        .auth-box input[type="email"],
        .auth-box input[type="password"] {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: none;
          border-radius: 12px;
          background: #f1f5f9;
          font-size: 1rem;
          transition: 0.3s ease;
        }

        .auth-box input:focus {
          outline: none;
          background: #fff;
          box-shadow: 0 0 0 2px #4f46e5;
        }

        .terms {
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          margin: 12px 0;
          gap: 6px;
          color: #444;
        }

        .auth-box button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(to right, #667eea, #764ba2);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .auth-box button:hover {
          background: linear-gradient(to right, #5a67d8, #6b46c1);
        }

        .switch {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #444;
        }

        .switch span {
          color: #5a67d8;
          cursor: pointer;
          font-weight: bold;
          margin-left: 5px;
        }

        .switch span:hover {
          text-decoration: underline;
        }

        .message {
          margin-top: 1rem;
          color: #2f855a;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default Login;
