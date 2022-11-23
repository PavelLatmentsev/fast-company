import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import API from "../../../api";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const { users } = useUser();
    let [count, setCount] = useState(users.length);
    const [searchValue, setSearchValue] = useState("");

    const getDeleteRow = (id) => {
        // setUsers((prevState) => prevState.filter((user) => user._id !== id));
        setCount(count - 1);
    };

    const heandleToggleBookmark = (id) => {
        const newBox = users.map((item) => {
            if (item._id === id) {
                item.bookmark = !item.bookmark;
            }
            return item;
        });
        console.log(newBox);
        // setUsers(newBox);
    };

    const heandleSearch = ({ target }) => {
        setSelectedProf(undefined);
        setSearchValue(target.value);
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
    }, [selectedProf, searchValue]);

    const heandleGroupList = (item) => {
        if (searchValue !== "") {
            setSearchValue("");
        }
        setSelectedProf(item);
    };

    const heandlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const heandleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filterdUsers = searchValue
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchValue.toLowerCase()) !== -1
              )
            : selectedProf
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
                    <div className="input-group">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search..."
                            className="form-control"
                            value={searchValue}
                            onChange={heandleSearch}
                        />
                    </div>
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
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

UsersListPage.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    count: PropTypes.number
};

export default UsersListPage;
