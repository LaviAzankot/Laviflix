import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function changeEmail(event){
    setEmail(event.target.value);
  };

  function changePassword(event){
    setPassword(event.target.value);
  };

  async function authUser(event){
    event.preventDefault();

    try {
      const response = await axios.post("/api/signIn", {
        email: email,
        password: password
      });

      if (response.data.success) {
        navigate("/");
      } else {
        setMessage(response.data.message);
      }

    } catch (err) {
      console.log(err.message);
  }
}



  return (
    <div>
      <form className="sign" onSubmit={authUser}>  
        <p id="message">{message}</p>   
        <label>Email</label>
        <input name="emali" type="email" placeholder="email@gmail.com" onChange={changeEmail} value={email} required/>
        <label>Password</label>
        <input  name="password" type="password" placeholder="password" onChange={changePassword} value={password} required/>
        <button className="join getStarted">Get Started</button>
      </form>
    </div>
  );
}
