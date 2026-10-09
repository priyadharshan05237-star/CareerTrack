import { useState } from "react";

function Login({ onRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://careertrack-1rj8.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save JWT authentication token
      localStorage.setItem(
        "careerTrackToken",
        data.token
      );

      // Save logged-in user information
      localStorage.setItem(
        "careerTrackUserId",
        data.userId
      );

      localStorage.setItem(
        "careerTrackUserName",
        data.name || ""
      );

      localStorage.setItem(
        "careerTrackUserEmail",
        email.trim().toLowerCase()
      );

      alert("Login successful!");

      onLogin();
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>CareerTrack</h1>
        <h2>Student Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>Don't have an account?</p>

        <button type="button" onClick={onRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;