import React from "react";
import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";
const Professions = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "Loading...";
    }
};
Professions.propTypes = {
    id: PropTypes.string
};
export default Professions;
