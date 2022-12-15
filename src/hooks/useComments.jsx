
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();
export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userID } = useParams();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getComments();
    }, [userID]);

    async function CreateComment(data) {
        const comment = {
            ...data,
            pageId: userID,
            _id: nanoid(),
            created_at: Date.now(),
            userId: currentUser._id
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments(prevState => ([...prevState, content]));
        } catch (error) {
            errorCather(error);
        }
    }
    async function getComments() {
        try {
            const { content } = await commentService.getComment(userID);
            setComments(content);
        } catch (error) {
            errorCather(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments(prevState => prevState.filter((comment) => comment._id !== id));
            }
        } catch (error) {
            errorCather(error);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }
    return (
        <CommentsContext.Provider
            value={{ comments, CreateComment, isLoading, removeComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
