import React, { Suspense, useEffect, useState } from "react";
import "./FavPlace.css";
import { placeData } from "../../config/places";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Place from "../../components/place/Place";
import { removeDuplicatesFromArray } from "../../utilities/removeDuplicates.js";

const FavPlace = () => {
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const favPlaceList = useSelector((state) => state.fav);

  const uniqueFavPlaceList = removeDuplicatesFromArray(favPlaceList);

  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const places = await fetch(`http://localhost:3001/api/places/getplaces`);
      const res = await places.json();
      // console.log("fetchAllPlaces", res);
      // console.log("fetchAllPlaces", user);
      setPlaceList(res);
    };
    fetchAllPlaces();
  }, []);

  if (user && user.username) {
    return (
      <Suspense fallback={<h2>Loading.....</h2>}>
        <div className="places-container">
          {!placeList && <h1> Add Attractive Places </h1>}

          {placeList &&
            placeList
              ?.filter((place) => uniqueFavPlaceList.includes(place.id))
              .map((place, index) => {
                return <Place key={index} place={place} />;
              })}
        </div>
      </Suspense>
    );
  } else {
    history.push("/login");
  }
};

export default FavPlace;
