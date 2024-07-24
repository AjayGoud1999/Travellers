import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useHistory, useLocation } from "react-router-dom";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import { placeData } from "../../config/places";

const Reviews = () => {
  const location = useLocation();
  const history = useHistory();
  const [stateName, setStateName] = useState("");
  const [placeId, setPlaceId] = useState();
  const [placeDetailsList, setPlaceDetailsList] = useState([]);

  const fetchPlaceById = async (placeId) => {
    if (placeId) {
      const place = await fetch(
        `http://localhost:3001/api/places/getplace/${placeId}`
      );
      const res = await place.json();
      // console.log("fetchPlaceById", res);
      setPlaceDetailsList(res);
    } else return;
  };

  useEffect(() => {
    fetchPlaceById(placeId);
  }, [placeId]);

  

  useEffect(() => {
    const arr = location.pathname.split("/");
    setStateName(arr[arr.length - 2]);
    setPlaceId(arr[arr.length - 1]);
  }, [location.pathname]);

  return (
    <div className="reviews-container">
      {placeDetailsList[0]// .filter((place) => place.id == placeId)[0]
      ?.experience
        ?.map((reviewItem,index) => (
          <ReviewCard key={index} placeReview={JSON.parse(reviewItem)} />
        ))}
    </div>
  );
};

export default Reviews;
