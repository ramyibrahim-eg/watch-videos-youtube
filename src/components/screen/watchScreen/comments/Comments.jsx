import React, { useEffect } from "react";
import "./_style.scss";
import Comment from "./comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsVideoById,
} from "../../../../redux/actions/commentsAction";

const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.commentList.comments);

  const comment_s = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  return (
    <div className="comments">
      <p>{totalComments} comments</p>

      <div className="comments__list">
        {comment_s?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
