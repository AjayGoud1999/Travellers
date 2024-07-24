import React from "react";
import "./NavLinks.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  return (
    <div className="navlinks-container">
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link exact to="/explore-places">
          <li>Travel Places</li>
        </Link>
        <Link exact to="/favourite-places">
          <li>Attractive Places</li>
        </Link>
        <Link exact to="/admin/addstate">
          <li>Add State</li>
        </Link>
        <Link exact to="/admin/addplace">
          <li>Add Place</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavLinks;
