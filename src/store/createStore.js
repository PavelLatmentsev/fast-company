import qualitiesReducer from "./quilities";
import professionsReducer from "./professions";
import usersReducer from "./users";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ qualities: qualitiesReducer, professions: professionsReducer, users: usersReducer });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
};
