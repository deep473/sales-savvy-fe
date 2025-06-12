import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sign_in() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { username, password };

    try {
      const resp = await fetch("http://localhost:8080/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/plain" 
      },
      body: JSON.stringify(data),
    });


      const msg = await resp.text(); // This will be "admin", "customer", or an error message

      if (msg === "admin" || msg === "customer") {
        localStorage.setItem("username", username); // Username is already known from input
        navigate(`/${msg}_home`);
      } else {
        alert(msg); // show error message like "wrong password"
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Could not sign in");
    }
  }

  return (
    <div className="auth-wrap center-block card mt-6">
      <h4 className="text-center mb-4">Sign in</h4>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
