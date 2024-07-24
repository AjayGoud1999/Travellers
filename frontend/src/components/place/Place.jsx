import React from "react";
import "./Place.css";
import { useHistory } from "react-router-dom";

const Place = ({ place }) => {
  const history = useHistory();
  const handleClick = (placeId, stateName) => {
    history.push(`/explore-places/${stateName}/${placeId}`);
  };
  return (
    <div className="place-container">
      <div className="image-container">
        <img src={place.image} alt="" loading="lazy" />
      </div>
      <div className="content">
        <h2>{place.placeName}</h2>
        <button onClick={() => handleClick(place.id, place.stateName)}>
          Know more
        </button>
      </div>
    </div>
  );
};

export default Place;
