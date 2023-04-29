import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const { message } = useSelector((state) => state.like);
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, isAuthenticated, message, error, alert]);
  return loading ? (
    <Loader />
  ) : (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography className="heading">Welcome Back!</Typography>
        <input
          type="email"
          placeholder="email@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>
        <Button type="submit" className="button">
          Login
        </Button>
        <Link to="/register">
          <Typography>New User ? Register Here</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
