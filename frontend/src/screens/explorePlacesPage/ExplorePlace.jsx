import React from "react";
import "./ExplorePlace.css";
import StateCards from "../../components/stateCard/StateCards";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const ExplorePlace = () => {
  const history = useHistory();

  const user = useSelector((state) => state.user);

  if (user && user.username) {
    return (
      <div className="container">
        <p>Please select a state</p>
        <StateCards />
      </div>
    );
  } else {
    history.push("/login");
  }
};

export default ExplorePlace;
