import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/User";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);
  const params = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(params.token, newPassword));
    navigate("/");
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
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography className="heading">Change Password</Typography>
        <input
          type="password"
          placeholder="new password"
          required
          value={newPassword}
          className="resetPasswordInputs"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Link to="/forgot/password">
          <Typography>Request Another Token!</Typography>
        </Link>
        <Button disabled={loading} type="submit" className="button">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
