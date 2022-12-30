import React from "react";
import PropTypes from "prop-types";

const Quility = ({ _id, color, name }) => {
    return (
        <>
            <span className={`badge m-1 bg-${color}`} key={_id}>
                {name}
            </span>
        </>
    );
};
Quility.propTypes = {
    _id: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
};
export default Quility;
