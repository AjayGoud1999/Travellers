import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { handleFormSubmit } from "../../utilities/formHandler";
import { useDispatch } from "react-redux";
import { addCurrentUser } from "../../reducers/userSlice";
import logo from "../../images/joypic.png";
import background from '../../images/moon.avif'

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let loginResponse = await handleFormSubmit(
        "http://localhost:3001/api/users/login",
        event,
        loginData,
        "POST"
      );

      if (loginResponse.hasOwnProperty("username")) {
        dispatch(addCurrentUser(loginResponse));
      }

      console.log("login", loginResponse);
      if(loginResponse.hasOwnProperty("username")){
        alert("Login Success")
      }
      else{
        alert(loginResponse)
      }
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="login-container">
        <img src={logo} width="400" alt="logo" className="logo" />
        <div className="main-info">
          <p className="title">Log In</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit} action="POST">
          <div className="login-div">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={loginData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={loginData.password}
            />
            <div className="login-button">
              <button type="submit">Log in</button>
            </div>
          </div>
        </form>
        <div>
          <p className="info">
            Are you a new user?
            <Link to="/register">
              <span className="span-info"> Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
