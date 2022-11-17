import React, { useState, useEffect } from "react";
import AddComments from "../common/comments/addComments";
import CommentsList from "../common/comments/commentsList";
import { useParams } from "react-router-dom";
import API from "../../api";

const Comments = () => {
    const { userID } = useParams();
    const [commentsUser, setCommentsUser] = useState([]);
    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userID)
            .then((data) => setCommentsUser(data));
    }, []);
    const handleSubmit = (commentData) => {
        API.comments.add({ ...commentData, pageId: userID }).then((data) => setCommentsUser([...commentsUser, data]));
    };
    const heandleRemove = (id) => {
        API.comments.remove(id).then((id) => setCommentsUser(commentsUser.filter((commentUser) => commentUser._id !== id)));
    };
    console.log(commentsUser);
    return (
        <div>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddComments onSubmit={handleSubmit} />
                </div>
            </div>
            {commentsUser.length > 0 && <CommentsList commentsUser={commentsUser} onRemove={heandleRemove} />}

        </div>
    );
};

export default Comments;