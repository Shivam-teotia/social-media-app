import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import "./Account.css";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import User from "../User/User";
const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const [followersToggle, setfollowersToggle] = useState(false);
  const [followingToggle, setfollowingToggle] = useState(false);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logged out Successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, dispatch, error, likeError, message]);
  return loading || userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h6">{user.name}</Typography>
        <div>
          <div>
            <button onClick={() => setfollowersToggle(!followersToggle)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user.followers.length}</Typography>
          </div>
          <div>
            <button onClick={() => setfollowingToggle(!followingToggle)}>
              <Typography>Following</Typography>
            </button>
            <Typography>{user.following.length}</Typography>
          </div>
          <div>
            <Typography>Posts</Typography>

            <Typography>{user.posts.length}</Typography>
          </div>
          <Button
            variant="contained"
            color="error"
            onClick={() => logoutHandler()}
          >
            LogOut
          </Button>
          <Link to="/update/profile">Edit Profile</Link>
          <Link to="/update/password">Change Password</Link>
          <Button
            variant="text"
            style={{ color: "red", margin: "2vmax" }}
            onClick={deleteProfileHandler}
            disabled={deleteLoading}
          >
            Delete My Profile
          </Button>
        </div>
        <Dialog
          open={followersToggle}
          onClose={() => setfollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h5">Followed By:-</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => {
                return (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar.url}
                  />
                );
              })
            ) : (
              <Typography>Yoy have no followers</Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setfollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h5">You are Following:-</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((following) => {
                return (
                  <User
                    key={following._id}
                    userId={following._id}
                    name={following.name}
                    avatar={following.avatar.url}
                  />
                );
              })
            ) : (
              <Typography>Yoy have no followed anyone</Typography>
            )}
          </div>
        </Dialog>
      </div>
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Post
                key={post._id}
                postImage={post.image.url}
                postId={post._id}
                caption={post.caption}
                likes={post.likes}
                comments={post.comments}
                ownerImage={user.avatar.url}
                ownerName={user.name}
                ownerId={user._id}
                isAccount={true}
                isDelete={true}
              />
            );
          })
        ) : (
          <Typography variant="h6">No Post to Show</Typography>
        )}
      </div>
    </div>
  );
};

export default Account;
