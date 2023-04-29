import React, { useEffect, useState } from "react";
import "./Register.css";
import { Avatar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";
const Register = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const alert = useAlert();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };

    Reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(name, email, password, avatar));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography className="heading">Welcome to V-Chat</Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
        />
        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          className="registerInputs"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email@gmail.com"
          required
          value={email}
          className="registerInputs"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          className="registerInputs"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading} type="submit" className="button">
          Register
        </Button>
        <Link to="/">
          <Typography>Already registered ? Login Here</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Register;
