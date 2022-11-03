import React from "react";
import UsersListPage from "../components/page/userListPage";
import { useParams } from "react-router-dom";
import UsersPage from "../components/page/userPage";

const UsersList = () => {
    const params = useParams();
    const { userID } = params;
    return userID ? <UsersPage userID={userID} /> : <UsersListPage />;
};
export default UsersList;
