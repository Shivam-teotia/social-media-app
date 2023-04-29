import { configureStore } from "@reduxjs/toolkit";

import {
  allUserReducer,
  postofFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/User";
import { likeReducer, myPostReducer, userPostReducer } from "./Reducers/Post";
const store = configureStore({
  reducer: {
    user: userReducer,
    postofFollowing: postofFollowingReducer,
    allUsers: allUserReducer,
    like: likeReducer,
    myPosts: myPostReducer,
    userProfile: userProfileReducer,
    userPosts: userPostReducer,
  },
});

export default store;
