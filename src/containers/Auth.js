import React from "react";
import { useLocation } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";

export default function Auth() {
  const { pathname } = useLocation();
  return <div>{pathname === "/register" ? <Register /> : <Login />}</div>;
}
