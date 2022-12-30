import React, { useEffect } from "react";
import Quility from "./quilite";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/quilities";
const QuiliteList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return "Loading...";
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (<>
        {qualitiesList.map((qual) => <Quility key={qual._id} {...qual} />)}
    </>);
};

QuiliteList.propTypes = {
    qualities: PropTypes.array
};
export default QuiliteList;
