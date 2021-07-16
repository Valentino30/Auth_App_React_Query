import React from "react";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const { pathname } = useLocation();
  return (
    <div>{pathname === "/register" ? <h1>Register</h1> : <h1>Login</h1>}</div>
  );
}
