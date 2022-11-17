import React from "react";
import PropTypes from "prop-types";
import Quilites from "./qualities";
const QualitiesCard = ({ data }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h3 className="card-text">Qualities</h3>
                <h5 className="card-title">
                    <Quilites user={data} />
                </h5>
            </div>
        </div>
    );
};

QualitiesCard.propTypes = {
    data: PropTypes.object
};

export default QualitiesCard;
