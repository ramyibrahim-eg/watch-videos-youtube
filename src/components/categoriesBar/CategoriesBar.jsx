import React, { useState } from "react";
import "./_style.scss";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosCategory,
} from "../../redux/actions/videoAction";
const keywords = [
  "All",
  "Music",
  "Movie",
  "Food",
  "Football",
  "Trending content",
  "live feed",
  "video games",
  "sports",
];

const CategoriesBar = () => {
  const [activeE, setActiveE] = useState("All");

  const dispatch = useDispatch();

  const handleClick = (value) => {
    setActiveE(value);
    value === "All"
      ? dispatch(getPopularVideos())
      : dispatch(getVideosCategory(value));
  };

  return (
    <div className="categoriesBar">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeE === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
