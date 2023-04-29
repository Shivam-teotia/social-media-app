import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { Avatar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfileUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
const UpdateProfile = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
  const [email, setEmail] = useState(user.email);

  const alert = useAlert();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };

    Reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfileUser(name, email, avatar));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, updateError, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="update">
      <form className="updateForm" onSubmit={submitHandler}>
        <Typography className="heading">Update Profile!</Typography>

        <Avatar
          src={avatarPrev}
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
          className="updateInputs"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          className="updateInputs"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} type="submit" className="button">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
