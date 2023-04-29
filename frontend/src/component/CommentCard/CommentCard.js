import React from "react";
import "./CommentCard.css";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post";
import {
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
} from "../../Actions/User";

const CommentCard = ({
  isAccount,
  isotherUser,
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const deleteCommentHandler = async () => {
    dispatch(deleteCommentOnPost(postId, commentId));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
    if (isotherUser) {
      dispatch(getUserPosts(params.id));
    }
  };
  const { user } = useSelector((state) => state.user);
  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt="" />
        <Typography style={{ minWidth: "6vmax", color: "grey" }}>
          {name}
        </Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isAccount || userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete style={{ color: "red" }} />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
