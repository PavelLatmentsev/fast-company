import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quility = ({ id }) => {
    console.log(id);
    const { getQuality } = useQuality();
    const { color, name } = getQuality(id);
    console.log(color, name);
    return (
        <>
            <span className={`badge m-1 bg-${color}`}>
                {name}
            </span>
        </>
    );
};
Quility.propTypes = {
    id: PropTypes.object.isRequired
};
export default Quility;
