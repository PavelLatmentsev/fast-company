import React from "react";
import Quilites from "./quilite";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onHeandleToggleBookmark, onGetDeleteRow, ...rest }) => {
    return (
        <>
            <th scope="row">{user.name}</th>
            <td>
                {user.qualities.map((item) => (
                    <Quilites key={item._id} {...item} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <button
                    onClick={() =>
                        onHeandleToggleBookmark(user._id)
                    }
                >
                    <Bookmark status={user.bookmark} />
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onGetDeleteRow(user._id)}
                >
                    delete
                </button>
            </td>
        </>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onHeandleToggleBookmark: PropTypes.func.isRequired,
    onGetDeleteRow: PropTypes.func.isRequired
};

export default User;
