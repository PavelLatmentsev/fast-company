import React from "react";
import UsersListPage from "../components/page/userListPage";
import { useParams } from "react-router-dom";
import UsersPage from "../components/page/userPage";
import UserProvider from "../hooks/useUsers";
const UsersList = () => {
    const params = useParams();
    const { userID } = params;
    return (<>
    <UserProvider>
    {userID ? <UsersPage userID={userID} /> : <UsersListPage />}
    </UserProvider>
    </>);
};
export default UsersList;
