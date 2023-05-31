import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../../../redux/actions/videoAction";
import VideoHorizontal from "./../watchScreen/videoHorizontal/VideoHorizontal";

const SearchScreen = () => {
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchVideos);

  return (
    <Container>
      {!loading ? (
        videos?.map((video, i) => (
          <VideoHorizontal video={video} key={i} searchScreen />
        ))
      ) : (
        <div className="spinner-border text-danger d-block mx-auto"></div>
      )}
    </Container>
  );
};

export default SearchScreen;
