import React, { useEffect } from "react";
import "./_style.scss";
import request from "../../api";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import noImg from "../img/no-image.webp";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const durations = moment.utc(seconds * 1000).format("mm:ss");

  const video_Id = id?.videoId || id;

  const navigate = useNavigate();

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: video_Id,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();

    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    getChannelIcon();
  }, [channelId, video_Id]);

  const handleVideoClick = () => {
    navigate(`/watch/${video_Id}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        <LazyLoadImage
          src={medium?.url ? medium?.url : noImg}
          alt={title}
          effect="blur"
        />
        <span className="video__top__duration">{durations}</span>
      </div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__title">{title}</div>

      <div className="video__channel">
        <LazyLoadImage
          src={channelIcon?.url ? channelIcon?.url : noImg}
          alt={channelTitle}
          effect="blur"
        />

        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Video;
