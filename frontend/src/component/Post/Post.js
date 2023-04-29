import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import {
  getFollowingPosts,
  getMyPosts,
  getUserPosts,
} from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  isotherUser = false,
}) => {
  const { user } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [likeUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToogle, setCommentToogle] = useState(false);

  const [captionValue, setCaptionValue] = useState("");
  const [captionToogle, setCaptionToogle] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
  };
  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
    if (isotherUser) {
      dispatch(getUserPosts(params.id));
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
    if (isotherUser) {
      dispatch(getUserPosts(params.id));
    }
  };
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);
  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToogle(!captionToogle)}>
            <MoreVertIcon />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="postImage" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likeUser)}
      >
        <Typography>{likes.length} likes</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon style={{ color: "grey" }} />
          )}
        </Button>
        <Button onClick={(e) => setCommentToogle(!commentToogle)}>
          <ChatBubbleOutlineOutlinedIcon style={{ color: "grey" }} />
        </Button>
        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteIcon />
          </Button>
        ) : null}
      </div>
      <Dialog open={likeUser} onClose={() => setLikesUser(!likeUser)}>
        <div className="DialogBox">
          <Typography variant="h5">Liked by:-</Typography>
          {likes.length === 0 ? (
            <Typography style={{ marginTop: "2vmax" }}>
              No One Like this post
            </Typography>
          ) : (
            likes.map((like) => {
              return (
                <User
                  key={like._id}
                  userId={like._id}
                  name={like.name}
                  avatar={like.avatar.url}
                />
              );
            })
          )}
        </div>
      </Dialog>

      <Dialog
        open={commentToogle}
        onClose={() => setCommentToogle(!commentToogle)}
      >
        <div className="DialogBox">
          <Typography variant="h5">Comments:-</Typography>
          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Add Comment"
              required
            />
            <Button
              type="submit"
              variant="contained"
              onClick={() => setCommentToogle(!commentToogle)}
            >
              Add
            </Button>
          </form>
          {comments.length > 0 ? (
            comments.map((item) => {
              return (
                <CommentCard
                  key={item._id}
                  userId={item.user._id}
                  name={item.user.name}
                  avatar={item.user.avatar.url}
                  comment={item.comment}
                  commentId={item._id}
                  postId={postId}
                  isAccount={isAccount}
                  isotherUser={true}
                />
              );
            })
          ) : (
            <Typography>No Comment Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToogle}
        onClose={() => setCaptionToogle(!captionToogle)}
      >
        <div className="DialogBox ">
          <Typography variant="h5">Update Caption</Typography>
          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Change Caption"
              required
            />
            <Button
              type="submit"
              variant="contained"
              onClick={() => setCaptionToogle(!captionToogle)}
            >
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
