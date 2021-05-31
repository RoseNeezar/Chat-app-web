import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import InputGroup from "../../components/InputGroup";
import { errorHelper } from "../../utils/error-serial";

const Login = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formState;
  const [errors, setErrors] = useState<any>({});
  const onChangeText =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState({ ...formState, [name]: e.target.value });
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-main">
      <h1 className="mb-10 text-6xl text-white">Login</h1>
      <div className="flex flex-col items-center justify-center w-1/2 pl-10 pr-10 shadow-lg mb-44 h-1/3 bg-dark-second rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <InputGroup
            className="mb-10"
            type="username"
            value={username}
            setValue={onChangeText}
            placeholder="Username"
            error={errorHelper(errors.message, "Username")}
          />
          <InputGroup
            className="mb-4"
            type="password"
            value={password}
            setValue={onChangeText}
            placeholder="Password"
            error={errorHelper(errors.message, "Password")}
          />

          <button className="self-center w-1/2 py-6 mt-10 mb-4 text-xs font-bold text-white uppercase rounded-2xl bg-dark-main">
            Login
          </button>
        </form>
        <small className="flex flex-row">
          <p className="text-gray-400"> Dont have an account?</p>
          <Link to="/register">
            <a className="ml-1 text-white uppercase hover:text-gray-400">
              Sign Up
            </a>
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Login;