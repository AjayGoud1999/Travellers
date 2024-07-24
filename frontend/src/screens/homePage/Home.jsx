import React from "react";
import "./Home.css";
import logo from '../../images/joypic.png'
import background from '../../images/moon.avif'

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <img src={logo} height='1000' width='400' alt="logo" className="logo" />
      {/* <h1 style={{fontSize:"25px",display:"flex",justifyContent:"center",alignContent:"center"}}> Joy <p style={{fontSize:"20px"}}>(Every mile, a story.)</p></h1> */}
      <div>
        <h2 style={{color:"black",fontSize:"20px"}}>Joy (Every mile, a story.)</h2>
      </div>
      <div className="button-container">
        <Link to="/explore-places">
          <button className="home-button">Travel Places</button>
        </Link>
        <Link to="/favourite-places">
          <button className="home-button">Attractive Places</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
