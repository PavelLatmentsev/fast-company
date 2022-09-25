import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ users, count }) => {
    const renderPhrase = (number) => {
        if (number >= 2 && number <= 4) {
            return "человека";
        } else {
            return "человек";
        }
    };

    if (users.length === 0) {
        return (
            <div>
                <h2>
                    <span className="badge bg-danger">
                        Никто с тобой не тусанет сегодня.
                    </span>
                </h2>
            </div>
        );
    }

    return (
        <div>
            <h2>
                <span className="badge bg-primary">
                    {count} {renderPhrase(count)} тусанут с тобой
                    сегодня
                </span>
            </h2>
        </div>
    );
};

SearchStatus.propTypes = {
    users: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired
};

export default SearchStatus;
