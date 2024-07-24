import React from "react";
import "./ReviewCardMini.css";
import { useHistory } from "react-router-dom";

const ReviewCardMini = ({ experience }) => {
  const history = useHistory();

  // const handleClick = (placeId, stateName) => {
  //   history.push(`/explore-places/${stateName}/${placeId}`);
  // };

  let placeImage = experience?.image;
  placeImage = placeImage?.replace("\\", "/");
  placeImage = placeImage?.replace("\\", "/");
  // console.log(placeImage);
  // console.log(
  //   "placeImage",
  //   `url(http://localhost:3001/${placeImage}/?not-from-cache-please)`
  // );
  return (
    <div
      className="reviewcardmini-container"
      style={{
        backgroundImage: `url(http://localhost:3001/${placeImage})`,
      }}
    >
      {/* <img
        src={`http://localhost:3001/${placeImage}`}
        alt=""
        referrerPolicy="noreferrer"
      /> */}
      {experience?.review}
    </div>
  );
};

export default ReviewCardMini;
