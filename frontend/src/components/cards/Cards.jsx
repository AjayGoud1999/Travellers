import React from "react";
import Card from "../card/Card.jsx";
import "./Cards.css";
import { cardData } from "../../config/cards.js";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <div className="cards-container">
      <Link to="/explore-places">
        <button>Explore Places</button>
      </Link>
      <Link to="/explore-places">
        <button>My Favorite Places</button>
      </Link>
    </div>
  );
};

export default Cards;
