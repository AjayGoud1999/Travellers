import React, { useState } from "react";
import "./AddPlace.css";
import { Link, useHistory } from "react-router-dom";
import { handleFormSubmit } from "../../utilities/formHandler";
import { useDispatch, useSelector } from "react-redux";

const AddPlace = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [placeData, setPlaceData] = useState({
    placeName: "",
    image: "",
    address: "",
    stateName: "",
    budget: "",
    description: "",
  });
  const handleChange = (event) => {
    setPlaceData({
      ...placeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let addPlaceResponse = await handleFormSubmit(
        "http://localhost:3001/api/admin/addplace",
        event,
        placeData,
        "POST"
      );

      //   if (addplaceResponse.hasOwnProperty("username")) {
      //     dispatch(addCurrentUser(addplaceResponse));
      //   }

      // console.log("addplace", addPlaceResponse);
      alert("Place Added Successfully")
      setPlaceData({
        placeName: "",
        image: "",
        address: "",
        stateName: "",
        budget: "",
        description: "",
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  if (user && user.username) {
    if (user.isAdmin) {
      return (
        <div className="addplace-container">
          <form className="addplace-form" onSubmit={handleSubmit} action="POST">
            <div className="addplace-fields">
              <input
                type="text"
                name="placeName"
                placeholder="Enter a place name"
                onChange={handleChange}
                value={placeData.placeName}
              />
              <input
                type="text"
                name="image"
                placeholder="Enter image url"
                onChange={handleChange}
                value={placeData.image}
              />
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                onChange={handleChange}
                value={placeData.address}
              />
              <input
                type="text"
                name="stateName"
                placeholder="Enter the state name"
                onChange={handleChange}
                value={placeData.stateName}
              />
              <input
                type="text"
                name="description"
                placeholder="Enter description"
                onChange={handleChange}
                value={placeData.description}
              />
              <input
                type="text"
                name="budget"
                placeholder="Enter budget for this place"
                onChange={handleChange}
                value={placeData.budget}
              />
            </div>
            <div className="addplace-button">
              <button type="submit">Add Place</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="addplace-container">
          <h1>Access Denied</h1>
        </div>
      );
    }
  } else {
    history.push("/login");
  }
};

export default AddPlace;
