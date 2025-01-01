import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const [isAuthanticated, setAuthanticated] = useState(false);

  function logout(){
    axios.get("/api/logout");
    window.location.reload();
    navigate("/");
  }

  useEffect(() => {
    axios.get("/api/authanticated")
    .then(response => response.data)
    .then(data => setAuthanticated(data.isAuthanticated))
  }, []);
  
  return (
    <div className="header">
      {console.log(isAuthanticated)}
      { isAuthanticated ?
      <button className="join" onClick={logout}>Logout</button>
      :
      <>
        <Link to="/signIn"><button className="join">Sign In</button></Link>
        <Link to="/signUp"><button className="join">Sign Up</button></Link>
      </>
      }
    </div>
  );
}
