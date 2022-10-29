import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен не корректно" }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },

            isCapitalSymbol: {
                message: "Пароль должен содержать заглавную букву"
            },

            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    const [data, setData] = useState({ email: "", password: "" });
    const heandleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
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
    const heandlechangeButton = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(e);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={heandlechangeButton}>
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
                        <button type="submit" disabled={!isValidData} className="btn btn-primary w-100 mx-auto">
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;