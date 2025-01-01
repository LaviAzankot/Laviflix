import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function changeEmail(event){
    setEmail(event.target.value);
  };

  function signUp(){
    navigate("/signUp", {state: {email: email}});
  }

  return (
    <div className="joinUs">
      <input name="emali" type="email" placeholder="email@gmail.com" onChange={changeEmail} value={email}/>
      <button className="join getStarted" onClick={signUp}>Get Started</button>
    </div>
  );
}
