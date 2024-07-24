import React, { useEffect, useState } from "react";
import "./StateCards.css";
// import { stateList as States } from "../../config/states.js";
import Card from "../card/Card.jsx";
import { Link } from "react-router-dom";

const StateCards = () => {
  const [stateList, setStateList] = useState([]);

  const fetchAllStates = async () => {
    const states = await fetch(`http://localhost:3001/api/states/getstates`);
    const res = await states.json();
    // console.log("fetchAllStates", res);
    setStateList(res);
  };

  useEffect(() => {
    fetchAllStates();
    // setStateList(States)
  }, []);

  return (
    <div className="states-container">
      {stateList?.map((state,index) => {
        return (
          <Link to={`/explore-places/${state.stateName}`}>
            <Card key={index} text={state.stateName} />
            {/* <Card key={state.id} text={state.name} /> */}
          </Link>
        );
      })}
    </div>
  );
};

export default StateCards;
