import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { setIntialState } from "../../reducers/userSlice";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  // console.log("redux", user);
  return (
    <div className="nav-container">
      <NavLinks />
      {user && user.username ? (
        <>
          <p style={{textTransform:"capitalize"}}>{`Welcome ${user.username}`}</p>
          <button onClick={() => dispatch(setIntialState())}>Log Out</button>
          {history.push("/")}
        </>
      ) : (
        <div className="button">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
