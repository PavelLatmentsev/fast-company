import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import UsersTable from "./usersTable";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../api";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState([]);
    let [count, setCount] = useState(users.length);
    useEffect(() => {
        API.users.fetchAll().then((resolve) => setUsers(resolve));
    }, []);

    const getDeleteRow = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
        setCount(count - 1);
    };

    const heandleToggleBookmark = (id) => {
        const newBox = users.map((item) => {
            if (item._id === id) {
                item.bookmark = !item.bookmark;
            }
            return item;
        });

        setUsers(newBox);
    };

    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessons] = useState(API.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessons(data));
    });
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const heandleGroupList = (item) => {
        setSelectedProf(item);
    };

    const heandlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const heandleSort = (item) => {
        console.log(item);
        setSortBy(item);
    };
    if (users) {
        const filterdUsers = selectedProf
            ? users.filter((user) => _.isEqual(user?.profession, selectedProf))
            : users;
        count = filterdUsers.length;
        const sortUsers = _.orderBy(
            filterdUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortUsers, currentPage, pageSize);
        const restart = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex justify-content-center">
                {professions && (
                    <div className="d-flex flex-column p-3 flex-shrink-0">
                        <GroupList
                            items={professions}
                            onHeandleGroupList={heandleGroupList}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-danger mt-2"
                            onClick={() => restart()}
                        >
                            Cбросить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus users={users} count={count} />
                    {count > 0 && (
                        <UsersTable
                            userCrop={userCrop}
                            onSort={heandleSort}
                            selectedSort={sortBy}
                            onGetDeleteRow={getDeleteRow}
                            onHeandleToggleBookmark={heandleToggleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            onPageChange={heandlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    count: PropTypes.number
};

export default Users;
