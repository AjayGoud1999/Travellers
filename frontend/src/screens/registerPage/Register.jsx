import React, { useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { handleFormSubmit } from "../../utilities/formHandler";
import logo from "../../images/joypic.png";
import background from '../../images/moon.avif'


const Register = () => {
  const history = useHistory();
  const [registerData, setRegisterData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    isAdmin:false
  });
  const handleChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    // console.log("register", registerData);
    event.preventDefault();
    try {
      const registerResponse = await handleFormSubmit(
        "http://localhost:3001/api/users/register",
        event,
        registerData,
        "POST"
      );

      // console.log("register", registerResponse);
      if (registerResponse.status == 201) {
        // console.log("register", registerResponse);
        alert(registerResponse.message)
        history.push("/login");
      } else {
        alert(registerResponse.error);
      }
   
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="register-container">
        <img src={logo} alt="logo" className="logo" />
        <div className="register-main-info">
          <p className="register-title">Sign Up</p>
          <p className="register-info">
            Already have an account?
            <Link to="/login">
              <span className="register-span-info"> Log in</span>
            </Link>
          </p>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-fields">
            <input
              type="text"
              name="firstname"
              placeholder="firstname"
              onChange={handleChange}
              value={registerData.firstname}
            />
            <input
              type="text"
              name="lastname"
              placeholder="lastname"
              onChange={handleChange}
              value={registerData.lastname}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={registerData.username}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={registerData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={registerData.password}
            />
          </div>
          <div className="register-button">
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
