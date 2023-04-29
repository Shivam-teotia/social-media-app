import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(
    (state) => state.postofFollowing
  );
  const { users, loading: userLoading } = useSelector(
    (state) => state.allUsers
  );

  const { message, error: likeError } = useSelector((state) => state.like);
  const alert = useAlert();
  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [message, error, alert, dispatch, likeError]);
  return loading || userLoading ? (
    <Loader />
  ) : (
    <>
      <div className="home">
        <div className="homeright">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Typography>No User Yet</Typography>
          )}
        </div>
        <div className="homeleft">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                postImage={post.image.url}
                postId={post._id}
                caption={post.caption}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
              />
            ))
          ) : (
            <Typography variant="h6">No Post Yet</Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
