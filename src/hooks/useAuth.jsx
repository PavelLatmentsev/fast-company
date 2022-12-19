import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    async function updateUserData(newData) {
        try {
            const { content } = await userService.update(newData);
            setCurrentUser(content);
        } catch (error) {
            errorCather(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function singIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(`accounts:signInWithPassword`, { email, password, returnSecureToken: true });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCather(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "INVALID_PASSWORD":
                        throw new Error("Email или пароль введены не правильно");

                    default:
                        throw new Error("Слишком много попыток входа, попробуйте позже");
                }
            }
        }
    };
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function logOut() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push("/");
    }

    async function signUp({ email, password, ...rest }) {
        // const keyFireBasePrivate = "AIzaSyCI2Rkzkav6Vnc2ViUSSNpOW5tpthe0sj4";
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCather(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким Email уже существует" };
                    throw errorObject;
                }
            }
            // throw new Error;
        }
    };
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            errorCather(error);
        }
    };
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            errorCather(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccesToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <AuthContext.Provider value={{ signUp, currentUser, singIn, logOut, updateUserData }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
