import React, { useState, useEffect } from "react";
import UserCard from "../../ui/userCard.jsx";
import { useParams } from "react-router-dom";
import API from "../../../api/index.js";
import PropTypes from "prop-types";
import UserEditPage from "../userEditPage/userEditPage.jsx";
import QualitiesCard from "../../ui/qualitiesCard";
import MeteengsCard from "../../ui/meetingsCard.jsx";
import Comments from "../../ui/comments.jsx";

const UsersPage = ({ userID }) => {
    const params = useParams();
    const { edit } = params;
    const [userData, setUser] = useState();
    useEffect(() => {
        API.users.getById(userID).then((data) => {
            setUser(data);
        });
    }, []);

    if (userData) {
        return (
            <>
                {edit ? (
                    <div>
                        <UserEditPage userID={userID} />
                    </div>
                ) : (
                    <div className="container">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <UserCard user={userData} />
                                <QualitiesCard data={userData} />
                                <MeteengsCard user={userData} />
                            </div>

                            <div className="col-md-8">
                                <Comments />
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }
};

UsersPage.propTypes = {
    userID: PropTypes.string
};

export default UsersPage;

// <div>
//     <h1>{userData.name}</h1>
//     <h2>Профессия:{userData.profession.name}</h2>
//     <span>
//         {userData.qualities.map((item) => (
//             <span
//                 key={item._id}
//                 className={"badge m-2 bg-" + item.color}
//             >
//                 {" "}
//                 {item.name}{" "}
//             </span>
//         ))}
//     </span>
//     <div>Встреч:{userData.completedMeetings}</div>
//     <h1>Rate:{userData.rate}</h1>
//     <button className="btn btn-warning" onClick={() => handleToEdit()}
//     >
//     Изменить
//     </button>
// </div>
