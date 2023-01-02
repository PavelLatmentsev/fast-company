import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, login } from "../../store/users";
const LoginForm = () => {
    const loginError = useSelector(getAuthError());
    const history = useHistory();
    const dispatch = useDispatch();

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const heandleChange = (target) => {
        if (target) {
            setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        }
    };

    const [errors, setErrors] = useState({});
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValidData = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const heandleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";

        dispatch(login({ payload: data, redirect }));
    };

    return (
        <form onSubmit={heandleSubmit}>
            <TextField
                type="text"
                label="Электронная Почта"
                onChange={heandleChange}
                name="email"
                value={data.email}
                error={errors.email}
            />
            <TextField
                type="password"
                label="Пароль"
                onChange={heandleChange}
                name="password"
                value={data.password}
                error={errors.password}
            />
            <CheckBoxField value={data.stayOn} onChange={heandleChange} name="stayOn"><>Оставаться в системе</></CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                disabled={!isValidData}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};
export default LoginForm;
