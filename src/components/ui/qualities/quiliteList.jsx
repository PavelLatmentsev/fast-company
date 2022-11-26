import React from "react";
import Quility from "./quilite";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";
const QuiliteList = ({ qualities }) => {
    const { isLoading } = useQuality();
    if (isLoading) return "Loading...";
       return (<>
       {qualities.map((qual) => <Quility key={qual} id={qual} />)}
       </>);
};

QuiliteList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QuiliteList;
