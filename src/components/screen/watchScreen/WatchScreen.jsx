import React, { useEffect } from "react";
import "./_style.scss";
import { Col, Container, Row } from "react-bootstrap";
import VideoData from "./videoData/VideoData";
import VideoHorizontal from "./videoHorizontal/VideoHorizontal";
import Comments from "./comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedVideos,
  getVideoById,
} from "./../../../redux/actions/videoAction";

const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  const { video, loading } = useSelector((state) => state.selectedVideo);

  return (
    <Container>
      <Row>
        <Col lg={8}>
          <div className="watchScreen__player">
            <iframe
              src={`https://www.youtube.com/embed/${id}`} //?&autoplay=1
              title={video?.snippet?.title}
              allowFullScreen
              width="100%"
              height="100%"
              allow="autoplay"
            ></iframe>
          </div>

          {!loading ? (
            <VideoData video={video} videoId={id} />
          ) : (
            <div className="spinner-border text-danger d-block mx-auto"></div>
          )}

          <Comments
            videoId={id}
            totalComments={video?.statistics?.commentCount}
          />
        </Col>
        <Col lg={4}>
          {!loading ? (
            videos
              ?.filter((video) => video.snippet)
              .map((video) => (
                <VideoHorizontal video={video} key={video.id.videoId} />
              ))
          ) : (
            <div className="spinner-border text-danger d-block mx-auto"></div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WatchScreen;
