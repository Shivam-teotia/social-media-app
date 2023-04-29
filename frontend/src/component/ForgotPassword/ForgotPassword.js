import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { forgotPassword } from "../../Actions/User";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
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
  }, [alert, error, dispatch, message]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography className="heading">Forgot Password</Typography>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          className="forgotPasswordInputs"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button disabled={loading} type="submit" className="button">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
