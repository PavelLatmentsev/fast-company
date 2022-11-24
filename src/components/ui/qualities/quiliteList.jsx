import React from "react";
import Quility from "./quilite";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";
const QuiliteList = ({ user }) => {
    const { getQualityList, isLoading } = useQuality();
    const qualityList = getQualityList(user.qualities);

    if (!isLoading) {
       return qualityList.map((item) => <Quility key={item._id} {...item} />);
    } else {
        return "Loading...";
    }
};

QuiliteList.propTypes = {
    user: PropTypes.object.isRequired
};
export default QuiliteList;
