import React, { useState } from "react";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
const Search = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { users, loading: userLoading } = useSelector(
    (state) => state.allUsers
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };
  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography className="heading">Search</Typography>

        <input
          type="text"
          value={name}
          placeholder="Enter Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={userLoading} type="submit" className="button">
          Search
        </Button>
        <div className="searchResults">
          {users &&
            users.map((user) => {
              return (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              );
            })}
        </div>
      </form>
    </div>
  );
};

export default Search;
