import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/signUp" element={<SignUp />}/>
          <Route path="/signIn" element={<SignIn />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

