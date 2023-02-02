import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let usenavigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inside handle Submit");

    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    

    

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      usenavigate("/");
      props.showAlert("Logged in SuccessFully", "success");

    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='mt-3'>
      <h2>Login to continue to iNote</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login