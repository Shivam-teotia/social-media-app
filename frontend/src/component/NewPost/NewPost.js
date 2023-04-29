import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NewPost.css";
import { useAlert } from "react-alert";
import { Button, Typography } from "@mui/material";
import { createNewPost } from "../../Actions/Post";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../../Actions/User";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const { loading, error, message } = useSelector((state) => state.like);
  const disaptch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await disaptch(createNewPost(caption, image));
    await disaptch(loadUser());
    navigate("/account");
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };

    Reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      disaptch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      disaptch({ type: "clearMessage" });
    }
  }, [alert, error, message, disaptch]);
  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3" className="newPostHeading">
          New Post
        </Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption.."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
