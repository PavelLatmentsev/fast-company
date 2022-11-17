import React, { useEffect, useState } from "react";
import Comment from "./comment";
import API from "../../../api";
// import PropTypes from "prop-types";
import PropTypes from "prop-types";

const CommentsList = ({ commentsUser, onRemove }) => {
    const [allComments, setAllComments] = useState([]);
    useEffect(() => {
        API.comments.fetchAll().then((data) => setAllComments(data));
    }, [allComments]);
    return (
        <div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {commentsUser.map((commentUser) => <Comment key={commentUser._id} {...commentUser} onRemove={onRemove} />)}
                </div>
            </div>
        </div>
    );
};
CommentsList.propTypes = {
    commentsUser: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
};
export default CommentsList;
