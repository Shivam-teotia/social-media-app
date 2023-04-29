import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { loadUser, updatePassword } from "../../Actions/User";
import { useAlert } from "react-alert";
const UpdatePassword = () => {
  const { error, loading, message } = useSelector((state) => state.like);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword));
    dispatch(loadUser());
    navigate("/account");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, message]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography className="heading">Change Password</Typography>
        <input
          type="password"
          placeholder="old password"
          required
          value={oldPassword}
          className="updatePasswordInputs"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="new password"
          required
          value={newPassword}
          className="updatePasswordInputs"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button disabled={loading} type="submit" className="button">
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
