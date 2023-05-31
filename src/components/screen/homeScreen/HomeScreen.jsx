import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../../categoriesBar/CategoriesBar";
import Video from "../../video/Video";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getPopularVideos,
  getVideosCategory,
} from "../../../redux/actions/videoAction";
import { useState } from "react";
import { useRef } from "react";
import LoadingSpinnerButton from "./LoadingSpinnerButton";

const HomeScreen = () => {
  const { videos, activecategory } = useSelector((state) => state.homeVideos);
  const dispatch = useDispatch();
  const StrictMode = useRef(true);
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (StrictMode.current) {
      StrictMode.current = false;
      dispatch(getPopularVideos());
    }
  }, [dispatch]);

  const handleMore = () => {
    setLoading(true);

    setTimeout(() => {
      activecategory === "All"
        ? dispatch(getPopularVideos())
        : dispatch(getVideosCategory(activecategory));
      setLoading(false);

      if (videos > videos.length - 21) {
        setShowButton(false);
      }
    }, 2000);
  };

  return (
    <Container>
      <CategoriesBar />
      <Row>
        {videos.map((video, i) => (
          <Col lg={3} md={4} key={i}>
            <Video video={video} />
          </Col>
        ))}
        <div className="d-flex justify-content-center m-5">
          {showButton && (
            <LoadingSpinnerButton
              onClick={handleMore}
              title={"Load More"}
              loading={loading}
            ></LoadingSpinnerButton>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default HomeScreen;
