import React from "react";
import UserCard from "../../ui/userCard.jsx";
import { useParams } from "react-router-dom";
// import API from "../../../api/index.js";
import PropTypes from "prop-types";
import UserEditPage from "../userEditPage/userEditPage.jsx";
import QualitiesCard from "../../ui/qualitiesCard";
import MeteengsCard from "../../ui/meetingsCard.jsx";
import Comments from "../../ui/comments.jsx";
import { useSelector } from "react-redux";
import { getUsersById } from "../../../store/users.js";

const UsersPage = ({ userID }) => {
    const params = useParams();
    const { edit } = params;
    const userData = useSelector(getUsersById(userID));

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
    // const [userData, setUser] = useState();
    // useEffect(() => {
    //     API.users.getById(userID).then((data) => {
    //         setUser(data);
    //     });
    // }, []);
