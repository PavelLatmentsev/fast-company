import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textareaField";
import API from "../../../api";
import { validator } from "../../../utils/validator";
const initialData = { userID: "", content: "" };

const AddComments = ({ onSubmit }) => {
    const [usersProfile, setUsersProfile] = useState({});
    const [commentData, setCommentData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        userID: {
            isRequired: {
                message: "Выберете пользователя"
            }
        },
        content: {
            isRequired: { message: "Поле не должно быть пустым" }
        }
    };
    const validate = () => {
        const errors = validator(commentData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
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
        const isValid = validate();
        if (!isValid) return;
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
                    error={errors.userID}
                />
                <TextAreaField
                    label="Сообщение"
                    value={commentData.content}
                    name="content"
                    onChange={handleChange}
                    error={errors.content}
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
