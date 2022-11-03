import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Quilites from "./qualities";
import Table from "../common/table";

const UsersTable = ({
    userCrop,
    onSort,
    selectedSort,
    onGetDeleteRow,
    onHeandleToggleBookmark
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <Quilites user={user} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <button onClick={() => onHeandleToggleBookmark(user._id)}>
                    <Bookmark status={user.bookmark} />
                </button>
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onGetDeleteRow(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        // <Table>
        //     <TableHeader {...{ onSort, selectedSort, columns }} />
        //     <TableBody {...{ columns, data: userCrop }} />
        // </Table>
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={userCrop}
        />
    );
};

UsersTable.propTypes = {
    userCrop: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onGetDeleteRow: PropTypes.func.isRequired,
    onHeandleToggleBookmark: PropTypes.func.isRequired
};
export default UsersTable;
