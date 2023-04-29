import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcon from "@mui/icons-material/Add";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Header = () => {
  const [tab, settab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => settab("/")}>
        {tab === "/" ? (
          <HomeIcon style={{ color: "#454545" }} />
        ) : (
          <HomeOutlinedIcon />
        )}
      </Link>
      <Link to="/newpost" onClick={() => settab("/newpost")}>
        {tab === "/newpost" ? (
          <AddIcon style={{ color: "#454545" }} />
        ) : (
          <AddOutlinedIcon />
        )}
      </Link>
      <Link to="/search" onClick={() => settab("/search")}>
        {tab === "/search" ? (
          <SearchIcon style={{ color: "#454545" }} />
        ) : (
          <SearchOutlinedIcon />
        )}
      </Link>
      <Link to="/account" onClick={() => settab("/account")}>
        {tab === "/account" ? (
          <AccountCircleIcon style={{ color: "#454545" }} />
        ) : (
          <AccountCircleOutlinedIcon />
        )}
      </Link>
    </div>
  );
};

export default Header;
