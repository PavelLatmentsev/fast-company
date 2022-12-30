import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import { isOutdated } from "./quilities";
const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: false,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsRecived, professionsRequestFailed } = actions;

export const loadProfessionList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
    }

    try {
        const { content } = await professionService.get();
        dispatch(professionsRecived(content));
    } catch (error) {
        dispatch(professionsRequestFailed(error.message));
    }
};
export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;
export const getProfessionByIds = (professionId) => (state) => {
    return state.professions.entities.find(el => el._id === professionId);
};
export default professionsReducer;
