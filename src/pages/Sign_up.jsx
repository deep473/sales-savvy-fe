import React, { useState } from "react";

export default function Sign_up() {
  /* state */
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender]     = useState("");
  const [dob, setDob]           = useState("");
  const [role, setRole]         = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { username, email, password, gender, dob, role };

    try {
      const resp = await fetch("http://localhost:8080/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      alert(await resp.text());
    } catch (err) {
      console.error(err);
      alert("Failed to sign up");
    }
  }

  return (
    <div className="auth-wrap center-block card mt-6">
      <h4 className="text-center mb-4">Create account</h4>

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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select…</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select…</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
