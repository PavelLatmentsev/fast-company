import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/users";
const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [enterError, setEnterError] = useState(null);

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
    // const heandleChange = ({ target }) => {
    //     setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // };
    const heandleChange = (target) => {
        if (target) {
            setData((prevState) => ({ ...prevState, [target.name]: target.value }));
            setEnterError(null);
        }
    };

    const [errors, setErrors] = useState({});
    const validate = () => {
        const errors = validator(data, validatorConfig);
        // const errors = {};
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
        //     }
        // }
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
        const redirect = history.location.state ? history.location.state.from.pathname : "/";
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
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                type="submit"
                disabled={!isValidData || enterError}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};
export default LoginForm;
