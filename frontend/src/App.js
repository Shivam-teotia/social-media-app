import Header from "./component/Header/Header";
import Login from "./component/Login/Login";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import { loadUser } from "./Actions/User";
import Home from "./component/Home/Home";
import Account from "./component/Account/Account";
import NewPost from "./component/NewPost/NewPost";
import Register from "./component/Register/Register";
import UpdateProfile from "./component/UpdateProfile/UpdateProfile";
import UpdatePassword from "./component/UpdatePassword/UpdatePassword";
import ForgotPassword from "./component/ForgotPassword/ForgotPassword";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import UserProfile from "./component/UserProfile/UserProfile";
import Search from "./component/Search/Search";
import Notfound from "./component/NotFound/Notfound";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, isAuthenticated]);
  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Account />}
        />
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />
        <Route
          path="/forgot/password"
          element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
        />
        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
        />
        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />
        <Route
          path="/search"
          element={isAuthenticated ? <Search /> : <Login />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
