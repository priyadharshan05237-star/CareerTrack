import { useState } from "react";

function Login({ onRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

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
        email
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

        <p>
          Don't have an account?
        </p>

        <button onClick={onRegister}>
          Register
        </button>

      </div>
    </div>
  );
}

export default Login;