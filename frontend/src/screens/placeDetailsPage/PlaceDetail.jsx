import React, { useEffect, useState } from "react";
import "./PlaceDetail.css";
import MorePlaces from "../../components/morePlaces/MorePlaces";
import { useHistory, useLocation } from "react-router-dom";
import { placeData } from "../../config/places";
import { useDispatch, useSelector } from "react-redux";
import { addToFavList } from "../../reducers/favSlice.js";
import Card from "../../components/card/Card";
import MoreCard from "../../components/morePlaces/MoreCard";
import ReviewCardMini from "../../components/reviewCard/ReviewCardMini";
import { addBudget, clearBudget } from "../../reducers/budgetSlice";

const PlaceDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { username } = useSelector((state) => state.user);
  const { budget } = useSelector((state) => state.budget);
  const [state, setState] = useState("");
  const [placeId, setPlaceId] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const [userBudget, setUserBudget] = useState(0);

  const favPlaceList = useSelector((state) => state.fav);
  console.log("favList", username);

  const [placeDetailsList, setPlaceDetailsList] = useState([]);

  const fetchPlaceById = async (placeId) => {
    if (placeId) {
      const place = await fetch(
        `http://localhost:3001/api/places/getplace/${placeId}`
      );
      const res = await place.json();
      console.log("fetchPlaceById", res);
      setPlaceDetailsList(res);
    } else return;
  };

  useEffect(() => {
    fetchPlaceById(placeId);
  }, [placeId]);

  useEffect(() => {
    let arr = location.pathname.split("/");
    // console.log(arr);
    let stateName = arr.at(arr.length - 2);
    let id = arr.at(arr.length - 1);
    setState(stateName);
    setPlaceId(id);
  }, [location.pathname, state, placeId]);

  // const requiredPlace = placeData.filter((place) => place.id == placeId);
  const requiredPlace = placeDetailsList;

  const isIdPresent = favPlaceList.find((item) => item == requiredPlace[0]?.id);

  const handleClick = (placeId) => {
    dispatch(addToFavList(placeId));
    setIsFav(true);
  };

  const handleReviewClick = (placeId, stateName) => {
    history.push(`/reviews/${stateName}/${placeId}`);
  };

  const handleAddReviewClick = (placeId, stateName, username) => {
    history.push(`/${stateName}/${placeId}/${username}/review/add`);
  };

  const handleAddBudget = (event) => {
    event.preventDefault();
    dispatch(addBudget(userBudget));
    setUserBudget(0);
  };

  const handleClearBudget = (event) => {
    // event.preventDefault();
    dispatch(clearBudget());
  };

  const handleBudgetOnChange = (event) => {
    setUserBudget(event.target.value);

    
  };

  return (
    <div className="placedetails-container">
      <div className="placedetails-container-top">
        <div className="placedetails-image-container">
          <img
            src={requiredPlace && requiredPlace[0] && requiredPlace[0].image}
            alt=""
          />
        </div>
        <div className="placedetails-main-container">
          <div className="info-box">
            <div className="info-container">
              <section className="main-container-info-container">
                <h1>
                  {requiredPlace &&
                    requiredPlace[0] &&
                    requiredPlace[0].placeName}
                </h1>
                <section className="main-container-info-container-details">
                  <p>
                    {requiredPlace &&
                      requiredPlace[0] &&
                      requiredPlace[0].address}
                  </p>
                </section>
              </section>
            </div>
            <section className="main-container-details-container">
              <div className="main-container-details-container-experience-container">
                <h3>Experience</h3>
                <div className="reviews-parent-container">
                  {requiredPlace && requiredPlace[0] && (
                    <ul>
                      {requiredPlace[0]?.experience?.length > 0 &&
                        requiredPlace[0]?.experience
                          .slice(0, 2)
                          .map((singleExperience, index) => (
                            <ReviewCardMini
                              key={index}
                              experience={JSON.parse(singleExperience)}
                            />
                          ))}
                      <div
                        className="reviews-parent-addreview-container"
                        onClick={() =>
                          handleAddReviewClick(placeId, state, username)
                        }
                      >
                        Add a review
                      </div>
                    </ul>
                  )}
                </div>
              </div>
            </section>
          </div>
          {requiredPlace && requiredPlace[0] ? (
            <div className="buttons-container">
              <button onClick={() => handleClick(requiredPlace[0].id)}>
                {favPlaceList && favPlaceList.length > 0 && isIdPresent
                  ? `Added to Favorites`
                  : `Add To Favourites`}
              </button>
              <button onClick={() => handleReviewClick(placeId, state)}>
                See all reviews
              </button>
              <div className="budget-container">
              {username=== "admin" && <p>Place Budget: {requiredPlace[0]?.budget}</p> }
                <p>Your Budget: {budget}</p>
              </div>
              <form>
                <input
                  type="number"
                  placeholder="Enter your budget"
                  value={userBudget}
                  onChange={handleBudgetOnChange}
                />
                <button onClick={handleAddBudget}>Add Your Budget</button>
                <button onClick={handleClearBudget}>Clear Budget</button>
              </form>
              {budget >= requiredPlace[0]?.budget && (
                <img
                  src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-badge-png-image_996483.jpg"
                  alt=""
                  referrerPolicy="noreferrer"
                  width="50px"
                  height="50px"
                />
              )}
            </div>
          ) : null}
          {/* </div> */}
        </div>
      </div>
      <div className="placedetails-container-bottom">
        <h3>More Places</h3>
        <div className="placedetails-container-bottom-more-places">
          <MorePlaces state={state} placeId={placeId} />
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
