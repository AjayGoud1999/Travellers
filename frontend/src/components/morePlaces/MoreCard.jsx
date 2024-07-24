import React from "react";
import "./MoreCard.css";
import { useHistory } from "react-router-dom";

const MoreCard = ({ place }) => {
  const history = useHistory();

  const handleClick = (placeId, stateName) => {
    history.push(`/explore-places/${stateName}/${placeId}`);
  };

  const placeImage = place.image;
  return (
    <div
      className="morecard-container"
      style={{
        backgroundImage: `url(${placeImage})`,
      }}
      onClick={() => handleClick(place.id, place.stateName)}
    >
      {place.placeName}
    </div>
  );
};

export default MoreCard;
