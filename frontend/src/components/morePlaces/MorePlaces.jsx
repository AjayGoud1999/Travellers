import React,{useState,useEffect}from "react";
import "./MorePlaces.css";
import MoreCard from "./MoreCard";
import { placeData } from "../../config/places";

const MorePlaces = ({ state, placeId }) => {
  const [placeList, setPlaceList] = useState([]);

  const fetchAllPlacesByState = async (stateName) => {
    if (stateName) {
      const places = await fetch(
        `http://localhost:3001/api/places/getplaces/${stateName}`
      );
      const res = await places.json();
      // console.log("fetchAllPlacesByState", res);
      setPlaceList(res);
    } else return;
  };

  useEffect(() => {
    fetchAllPlacesByState(state);
  }, [state]);
  const morePlaces = placeList?.filter(
    (place) => place.id != placeId && place.stateName === state
  );
  // console.log("more", morePlaces);
  return (
    <div className="moreplaces-container">
      {morePlaces.map((place) => (
        <MoreCard place={place} />
      ))}
    </div>
  );
};

export default MorePlaces;
