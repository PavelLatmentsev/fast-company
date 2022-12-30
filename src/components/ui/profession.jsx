import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionByIds, getProfessionsLoadingStatus } from "../../store/professions";
const Professions = ({ id }) => {
    const profession = useSelector(getProfessionByIds(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());

    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else {
        return "Loading...";
    }
};
Professions.propTypes = {
    id: PropTypes.string
};
export default Professions;
