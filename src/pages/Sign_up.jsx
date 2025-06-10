import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sign_up() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      gender,
      dob,
      role
    };

    try {
      const resp = await fetch('http://localhost:8080/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const msg = await resp.text();
      alert(msg);
      
      if (msg === "User created successfully!") {
        navigate('/sign_in'); 
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit data");
    }
  }

  return (
    <>
      <h4>Sign up below</h4>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <label>Gender: </label>
        Male
        <input
          type="radio"
          name="gender"
          value="M"
          checked={gender === "M"}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
        <input
          type="radio"
          name="gender"
          value="F"
          checked={gender === "F"}
          onChange={(e) => setGender(e.target.value)}
        />
        Other
        <input
          type="radio"
          name="gender"
          value="O"
          checked={gender === "O"}
          onChange={(e) => setGender(e.target.value)}
        />
        <br /><br />

        <label>DOB: </label>
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <br /><br />

        <label>Role: </label>
        ADMIN
        <input
          type="radio"
          name="role"
          value="admin"
          checked={role === "admin"}
          onChange={(e) => setRole(e.target.value)}
        />
        CUSTOMER
        <input
          type="radio"
          name="role"
          value="customer"
          checked={role === "customer"}
          onChange={(e) => setRole(e.target.value)}
        />
        <br /><br />

        <button type="submit">SIGN UP</button>
      </form>
    </>
  );
}