import React, { useEffect, useState } from "react";
import "./AddUserReview.css";
import { useHistory, useLocation } from "react-router-dom";
import ImageUpload from "../../components/FormElements/ImageUpload.js";
import Input from "../../components/FormElements/Input.js";
import { useForm } from "../../utilities/hooks/form-hook.js";
import { useHttpClient } from "../../utilities/hooks/http-hook.js";
import { useSelector } from "react-redux";

const AddUserReview = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useState("");
  const [user, setUser] = useState("");
  const [placeId, setPlaceId] = useState(0);
  const { isLoading, sendRequest } = useHttpClient();
  const loggedInUser = useSelector((state) => state.user);

  const [formState, inputHandler] = useForm(
    {
      review: {
        value: "",
      },
      image: {
        value: null,
      },
    },
    false
  );

  useEffect(() => {
    let arr = location.pathname.split("/");
    // console.log("addreview", arr);
    let stateName = arr.at(1);
    let id = arr.at(2);
    let username = arr.at(3);
    setState(stateName);
    setPlaceId(id);
    setUser(username);
  }, [location.pathname, state, placeId, user]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log("added review", formState.inputs, user);

    try {
      const formData = new FormData();
      // console.log(formState)
      if (formState && formState.inputs.image.value) {
        formData.append("review", formState.inputs.review.value);
        formData.append("image", formState.inputs.image.value);
        formData.append("creator", user);
        formData.append("placeId", placeId);
        const reviewData = await sendRequest(
          "http://localhost:3001/api/users/addreview",
          "POST",
          formData
        );
        // console.log("reviewresponse", reviewData);
        alert("Added Review")
        history.push("/");
      }
      else{
        alert("Check all fields")
      }
      
    } catch (err) {}
  };
  if (loggedInUser && loggedInUser.username) {
    return (
      <div className="user-review-container">
        <h1>Please Add Review</h1>
        <div className="review-container">
          <form className="review-form" onSubmit={placeSubmitHandler}>
            <div className="review-fields">
              <Input
                id="review"
                element="input"
                type="text"
                label="Review"
                errorText="Please give your review"
                placeholder="Please give your review"
                onInput={inputHandler}
              />
              <ImageUpload center id="image" onInput={inputHandler} />
              <div className="review-button">
                <button type="submit">Add Review</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    history.push("/login");
  }
};

export default AddUserReview;
