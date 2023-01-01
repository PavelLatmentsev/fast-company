import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import PropTypes from "prop-types";
import { loadProfessionList } from "../../../store/professions";
import { loadQualitiesList } from "../../../store/quilities";
const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const UsersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadProfessionList());
        dispatch(loadQualitiesList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);
    if (UsersStatusLoading) return "Loading";
    return children;
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default AppLoader;
