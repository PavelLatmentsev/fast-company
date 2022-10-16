import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../api/index.js";
import PropTypes from "prop-types";

const UsersPage = ({ userID }) => {
    const history = useHistory();
    const [userFind, setUserFind] = useState();
    useEffect(() => {
        API.users.getById(userID).then((resolve) => {
            setUserFind(resolve);
        });
    });
    const heandleReturnBack = () => {
        history.replace("/users");
    };
    if (userFind) {
        return (
            <>
                {
                    <div>
                        <h1>{userFind.name}</h1>
                        <h2>Профессия:{userFind.profession.name}</h2>
                        <span>
                            {userFind.qualities.map((item) => (
                                <span key={item._id} className={"badge m-2 bg-" + item.color}> {item.name} </span>
                            ))}
                        </span>
                        <div>Встреч:{userFind.completedMeetings}</div>
                        <h1>Rate:{userFind.rate}</h1>
                    </div>
                }
                <button className="btn btn-warning" onClick={() => heandleReturnBack()}>Назад</button>
            </>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UsersPage.propTypes = {
    userID: PropTypes.string.isRequired
};

export default UsersPage;
