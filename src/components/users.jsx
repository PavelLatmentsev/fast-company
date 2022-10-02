import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../api";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const Users = ({ users, count, ...rest }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessons] = useState(API.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        API.professions.fetchAll().then(data => setProfessons(data));
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
    const filterdUsers = selectedProf
        ? users.filter(user => _.isEqual(user?.profession, selectedProf))
        : users;
    count = filterdUsers.length;
    const userCrop = paginate(filterdUsers, currentPage, pageSize);
    const restart = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (

                <div className="d-flex flex-column p-3 flex-shrink-0">
                    <GroupList items={professions} onHeandleGroupList={heandleGroupList} selectedItem={selectedProf} />
                    <button className="btn btn-danger mt-2" onClick={() => restart()}>Cбросить</button>

                </div>

            )}
            <div className="d-flex flex-column">
                <SearchStatus users={users} count={count} />
                {count > 0 && (

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col">Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <tr key={user._id} className="table">
                                    <User user={user} {...rest} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    count: PropTypes.number.isRequired
};

export default Users;
