import React from "react";
import Quilites from "./quilite";
import PropTypes from "prop-types";

const QuiliteList = ({ user }) => {
    return (
        <>
            {user.qualities.map((item) => (
                <Quilites key={item._id} {...item} />
            ))}
        </>
    );
};

QuiliteList.propTypes = {
    user: PropTypes.object.isRequired
};
export default QuiliteList;
