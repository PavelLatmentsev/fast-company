import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";
const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsCreateSucces: (state, action) => {
            state.entities.push(action.payload);
        },
        commentsCreateFailed: (state, action) => {
            state.error = action.payload;
        },
        commentsRemoveSuccess: (state, action) => {
            state.entities = state.entities.filter(comment => comment._id !== action.payload);
        },
        commentsRemoveFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsRecived, commentsRequestFailed, commentsCreateSucces, commentsCreateFailed, commentsRemoveSuccess, commentsRemoveFailed } = actions;
export const removeComment = (id) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentsRemoveSuccess(id));
        }
    } catch (error) {
        dispatch(commentsRemoveFailed(error));
    }
};
export const addComment = (data, userID, currentUserId) => async (dispatch) => {
    const comment = {
        ...data,
        pageId: userID,
        _id: nanoid(),
        created_at: Date.now(),
        userId: currentUserId
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentsCreateSucces(content));
    } catch (error) {
        dispatch(commentsCreateFailed(error));
    }
};
export const loadCommentList = (userID) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComment(userID);
        console.log(content);
        dispatch(commentsRecived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;
export default commentsReducer;
