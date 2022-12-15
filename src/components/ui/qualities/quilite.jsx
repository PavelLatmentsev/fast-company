import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quility = ({ id }) => {
    const { getQuality } = useQuality();
    const { color, name } = getQuality(id.q);
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
