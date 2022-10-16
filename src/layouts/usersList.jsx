import React from "react";
import Users from "../components/users";
import { useParams } from "react-router-dom";
import UsersPage from "../components/usersPage";

const UsersList = () => {
    const params = useParams();
    const { userID } = params;
    return userID ? <UsersPage userID={userID} /> : <Users/>;
};
export default UsersList;
