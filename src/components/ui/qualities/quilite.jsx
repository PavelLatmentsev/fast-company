import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quility = ({ id }) => {
    const { getQuality } = useQuality();
    const { _id, color, name } = getQuality(id);
    return (
        <>
            <span key={_id} className={`badge m-1 bg-${color}`}>
                {name}
            </span>
        </>
    );
};
Quility.propTypes = {
    id: PropTypes.string.isRequired
};
export default Quility;
