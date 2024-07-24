import React from "react";
import "./ReviewCard.css";

const ReviewCard = ({ placeReview }) => {
  let placeImage = placeReview.image;
  placeImage = placeImage.replace("\\", "/");
  placeImage = placeImage.replace("\\", "/");
  return (
    <div className="reviewcard-container">
      <div className="image-carousel-container">
        {/* <div className="image-carousel-container-left">{`<`}</div> */}
        <img src={`http://localhost:3001/${placeImage}`} alt="" />
        {/* <div className="image-carousel-container-right">{`>`}</div> */}
      </div>
      <div className="reviewcard-maininfo-container">
        <q>{placeReview.review}</q>
        <p className="reviewcard-maininfo-container-username">
          - <span>{placeReview.userName}</span>
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
