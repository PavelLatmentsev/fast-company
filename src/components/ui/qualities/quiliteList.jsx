import React from "react";
import Quility from "./quilite";
import PropTypes from "prop-types";

const QuiliteList = ({ user }) => {
    return (
        <>
            {user.qualities.map((item) => (
                <Quility key={item._id} {...item} />
            ))}
        </>
    );
};

QuiliteList.propTypes = {
    user: PropTypes.object.isRequired
};
export default QuiliteList;
