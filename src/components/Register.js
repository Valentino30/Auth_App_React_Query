import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { register } from "../api/auth";

export default function Register() {
  const [credentials, setCredentias] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();
  const { mutateAsync, data, isLoading, isError } = useMutation(register);
  console.log({ data });

  const handleChange = (e, inputType) => {
    setCredentias({
      ...credentials,
      [inputType]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const { email, password, confirmPassword } = credentials;
    if (password === confirmPassword) {
      await mutateAsync({ email, password });
      history.push("/");
    } else {
      alert("Passwords must match");
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Oops!</h1>;

  return (
    <div>
      <input
        type="email"
        autoComplete
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <input
        type="text"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => handleChange(e, "password")}
      />
      <input
        type="text"
        placeholder="Confirm Password"
        value={credentials.confirmPassword}
        onChange={(e) => handleChange(e, "confirmPassword")}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
