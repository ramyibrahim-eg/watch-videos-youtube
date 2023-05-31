import React from "react";
import "./_style.scss";
import { Link } from "react-router-dom";
import image from "../img/background-404.webp";

const NotFound = () => {
  return (
    <div className="section">
      <div className="not-found">
        <img src={image} alt="not-found" />
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
