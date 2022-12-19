import React from "react";
import UsersListPage from "../components/page/userListPage";
import { useParams, Redirect } from "react-router-dom";
import UsersPage from "../components/page/userPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
import UserEditPage from "../components/page/userEditPage/userEditPage";

const UsersList = () => {
    const params = useParams();
    const { userID, edit } = params;
    const { currentUser } = useAuth();
    return (<>
        <UserProvider>
            {userID ? (
                edit ? (
                    userID === currentUser._id ? (
                        <UserEditPage />
                    ) : (
                        <Redirect to={`/users/${currentUser._id}/edit`} />
                    )
                ) : (
                    <UsersPage userID={userID} />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    </>);
};
export default UsersList;
