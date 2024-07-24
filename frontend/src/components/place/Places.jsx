import React, { useEffect, useState } from "react";
import "./Places.css";
// import { placeData } from "../../config/places";
import Place from "./Place";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Places = () => {
  const [stateName, setState] = useState("");
  const location = useLocation();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [placeList, setPlaceList] = useState([]);

  
  useEffect(() => {
    const fetchAllPlacesByState = async (stateName) => {
      if (stateName) {
        const places = await fetch(
          `http://localhost:3001/api/places/getplaces/${stateName}`
        );
        const res = await places.json();
        if(res.length === 0){
          let changeName = stateName.toLowerCase()
          setState(changeName)
        }
        // console.log("fetchAllPlacesByState", res);
        setPlaceList(res);
      } else return;
    };
  
    fetchAllPlacesByState(stateName);
  }, [stateName]);

  useEffect(() => {
    let state = location.pathname.split("/");
    state = state.at(state.length - 1);
    setState(state);
    // console.log(state);
  }, [location.pathname]);

  if (user && user.username) {
    return (
      <div className="places-container">
        {placeList &&
          placeList
            // ?.filter((place) => place.placename === place)
            ?.map((place, index) => {
              return <Place key={index} place={place} />;
            })}
      </div>
    );
  } else {
    history.push("/login");
  }
};

export default Places;
