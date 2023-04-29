import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import User from "../User/User";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const {
    error: likeError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);
  const params = useParams();
  const [followersToggle, setfollowersToggle] = useState(false);
  const [followingToggle, setfollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };
  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, message, likeError, userError, dispatch]);
  return loading || userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountright">
        <Avatar
          src={user && user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h6">{user && user.name}</Typography>
        <div>
          <div>
            <button onClick={() => setfollowersToggle(!followersToggle)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user && user.followers.length}</Typography>
          </div>
          <div>
            <button onClick={() => setfollowingToggle(!followingToggle)}>
              <Typography>Following</Typography>
            </button>
            <Typography>{user && user.following.length}</Typography>
          </div>
          <div>
            <Typography>Posts</Typography>

            <Typography>{user && user.posts.length}</Typography>
          </div>
          {myProfile ? null : (
            <Button
              variant="contained"
              style={{ background: following ? "red" : "" }}
              onClick={followHandler}
              disabled={followLoading}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          )}
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
              <Typography>{user && user.name} have no followers</Typography>
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
              <Typography>{user && user.name} no followed anyone</Typography>
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
                isotherUser={true}
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

export default UserProfile;
