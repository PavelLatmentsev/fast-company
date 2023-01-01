import React from "react";
import UsersListPage from "../components/page/userListPage";
import { useParams, Redirect } from "react-router-dom";
import UsersPage from "../components/page/userPage";
import UserEditPage from "../components/page/userEditPage/userEditPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const UsersList = () => {
    const params = useParams();
    const { userID, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (<>
        <UsersLoader>
            {userID ? (
                edit ? (
                    userID === currentUserId ? (
                        <UserEditPage />
                    ) : (
                        <Redirect to={`/users/${currentUserId}/edit`} />
                    )
                ) : (
                    <UsersPage userID={userID} />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    </>);
};
export default UsersList;
