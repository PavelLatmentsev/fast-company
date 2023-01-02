import React, { useEffect } from "react";
import AddComments from "../common/comments/addComments";
import CommentsList from "../common/comments/commentsList";
// import { useParams } from "react-router-dom";
// import API from "../../api";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments, getCommentsLoadingStatus, loadCommentList, removeComment } from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userID } = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());
    const commentsUser = useSelector(getComments());
    useEffect(() => {
        dispatch(loadCommentList(userID));
    }, [userID]);
    const isLoading = useSelector(getCommentsLoadingStatus());

    const handleSubmit = (commentData) => {
        dispatch(addComment(commentData, userID, currentUserId));
        // API.comments.add({ ...commentData, pageId: userID }).then((data) => setCommentsUser([...commentsUser, data]));
    };
    const heandleRemove = (id) => {
        console.log(id);
        dispatch(removeComment(id));
        commentsUser.filter(comment => comment._id !== id);
        // API.comments.remove(id).then((id) => setCommentsUser(commentsUser.filter((commentUser) => commentUser._id !== id)));
    };
    const sortArray = _.orderBy(commentsUser, ["created_at"], ["desc"]);
    return (
        <div>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddComments onSubmit={handleSubmit} />
                </div>
            </div>
            {sortArray.length > 0 && (!isLoading ? < CommentsList commentsUser={sortArray} onRemove={heandleRemove} /> : "Loading")}

        </div>
    );
};

export default Comments;

 // const { userID } = useParams();
    // const [commentsUser, setCommentsUser] = useState([]);
     // useEffect(() => {
    //     API.comments
    //         .fetchCommentsForUser(userID)
    //         .then((data) => setCommentsUser(data));
    // }, []);
// fdfdfd;
