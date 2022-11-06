import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import API from "../../../api/index.js";
import PropTypes from "prop-types";
import UserEditPage from "../userEditPage/userEditPage.jsx";

const UsersPage = ({ userID }) => {
    const history = useHistory();
    const params = useParams();
    const { edit } = params;
    const [userData, setUser] = useState();
    useEffect(() => {
        API.users.getById(userID).then((data) => {
            setUser(data);
        });
    }, [userData]);

    const handleToEdit = () => {
        history.push("/users/" + userID + "/edit");
    };
    if (userData) {
        return (
            <>
                { edit ? (<div>
                    <UserEditPage userID={userID} />
                </div>) : (
                    <div>
                        <h1>{userData.name}</h1>
                        <h2>Профессия:{userData.profession.name}</h2>
                        <span>
                            {userData.qualities.map((item) => (
                                <span
                                    key={item._id}
                                    className={"badge m-2 bg-" + item.color}
                                >
                                    {" "}
                                    {item.name}{" "}
                                </span>
                            ))}
                        </span>
                        <div>Встреч:{userData.completedMeetings}</div>
                        <h1>Rate:{userData.rate}</h1>
                        <button className="btn btn-warning" onClick={() => handleToEdit()}
                        >
                        Изменить
                        </button>
                    </div>

                )}

            </>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UsersPage.propTypes = {
    userID: PropTypes.string
};

export default UsersPage;
