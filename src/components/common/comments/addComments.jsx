import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textareaField";
import API from "../../../api";
const initialData = { userID: "", content: "" };

const AddComments = ({ onSubmit }) => {
    const [usersProfile, setUsersProfile] = useState({});
    const [commentData, setCommentData] = useState(initialData);

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsersProfile(data));
    }, []);
    const handleChange = (target) => {
        setCommentData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const usersArray =
        usersProfile &&
        Object.keys(usersProfile).map((user) => ({
            name: usersProfile[user].name,
            value: usersProfile[user]._id
        }));
    const heandleSubmit = (e) => {
        e.preventDefault();
        onSubmit(commentData);
        setCommentData(initialData);
    };
    return (
        <div>
            <form action="" onSubmit={heandleSubmit}>
                <div>
                    <h2>New Comment</h2>
                </div>
                <SelectField
                    defaultOption={"Выберите пользователя"}
                    options={usersArray}
                    name="userID"
                    value={commentData.userID}
                    onChange={handleChange}
                />
                <TextAreaField
                    label="Сообщение"
                    value={commentData.content}
                    name="content"
                    onChange={handleChange}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">
                        Добавить коментарий
                    </button>
                </div>
            </form>
        </div>
    );
};

AddComments.propTypes = {
    onSubmit: PropTypes.func
};
export default AddComments;
