import React, { useEffect } from "react";
import "./_style.scss";
import numeral from "numeral";
import moment from "moment";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails } from "./../../../../redux/actions/channelAction";

const VideoData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const dispatch = useDispatch();

  const regexp = /(https?:\/\/[^\s]+)/g;
  const descWithLinks = snippet.description.replace(regexp, (match, url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="mr-3">
              <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}
            </span>{" "}
            <span className="mr-3">
              <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>

      <div className="py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt={channelTitle}
            className="mr-3 rounded-circle"
          />
          <div className="d-flex flex-column ms-2">
            <span>{channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>

        <button className="p-2 m-2 border-0 btn" disabled>
          Subscried
        </button>
      </div>

      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="Show more"
          less="Show less"
          className="showMoreText"
          anchorClass="show-more-less-clickable"
          expanded={false}
        >
          <p dangerouslySetInnerHTML={{ __html: descWithLinks }}></p>
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoData;
