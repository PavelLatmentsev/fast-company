import React from "react";
import PropTypes from "prop-types";

const Quility = ({ color, name, _id }) => {
    return (
        <>
            <span key={_id} className={`badge m-1 bg-${color}`}>
                {name}
            </span>
        </>
    );
};
Quility.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};
export default Quility;
