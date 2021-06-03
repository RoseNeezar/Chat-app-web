import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import InputGroup from "../../components/InputGroup";
import { ACurrentUser, ALogin } from "../../redux/actions/auth";
import { IState } from "../../redux/reducers/rootReducer";
import { errorHelper } from "../../utils/error-serial";

const Login: FC = () => {
  const registerError = useSelector(
    (state: IState) => state.authReducer.apiState.IARegister?.error
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formState;

  const onChangeText =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState({ ...formState, [name]: e.target.value });
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username && password) {
      dispatch(ALogin({ username, password }, history));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark-main">
      <h1 className="mb-10 text-6xl text-white">Login</h1>
      <div className="flex flex-col items-center justify-center h-auto p-10 shadow-lg w-96 mb-44 bg-dark-second rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col w-full ">
          <InputGroup
            className="mb-10"
            type="username"
            value={username}
            setValue={onChangeText}
            placeholder="Username"
            error={errorHelper(registerError?.message as any, "Username")}
          />
          <InputGroup
            className="mb-4"
            type="password"
            value={password}
            setValue={onChangeText}
            placeholder="Password"
            error={errorHelper(registerError?.message as any, "Password")}
          />

          <button className="self-center w-1/2 py-6 mt-10 mb-4 text-lg font-bold text-white uppercase rounded-2xl bg-dark-main">
            Login
          </button>
        </form>
        <small className="flex flex-row">
          <p className="text-gray-400"> Dont have an account?</p>
          <Link to="/register">
            <p className="ml-1 text-white uppercase hover:text-gray-400">
              Sign Up
            </p>
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Login;
