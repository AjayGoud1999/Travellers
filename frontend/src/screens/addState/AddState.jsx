import React, { useState } from "react";
import "./AddState.css";
import { Link, useHistory } from "react-router-dom";
import { handleFormSubmit } from "../../utilities/formHandler";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentUser } from "../../reducers/userSlice";

const AddState = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [stateData, setStateData] = useState({
    stateName: "",
  });
  const handleChange = (event) => {
    setStateData({
      ...stateData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let addStateResponse = await handleFormSubmit(
        "http://localhost:3001/api/admin/addstate",
        event,
        stateData,
        "POST"
      );

      //   if (addStateResponse.hasOwnProperty("username")) {
      //     dispatch(addCurrentUser(addStateResponse));
      //   }
        alert("State Added Successfully")
      // console.log("addstate", addStateResponse);
      setStateData({
        stateName: "",
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  if (user && user.username) {
    if (user.isAdmin) {
      return (
        <div className="addstate-container">
          <form className="addstate-form" onSubmit={handleSubmit} action="POST">
            <div className="addstate-fields">
              <input
                type="text"
                name="stateName"
                placeholder="Enter a state name"
                onChange={handleChange}
                value={stateData.stateName}
              />
            </div>
            <div className="addstate-button">
              <button type="submit">Add State</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="addstate-container">
          <h1>Access Denied</h1>
        </div>
      );
    }
  } else {
    history.push("/login");
  }
};

export default AddState;
