import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegistrForm = () => {
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    });

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
        },
        profession: {
            isRequired: { message: "Профессия обязательна для заполнения" }
        },
        licence: {
            isRequired: {
                message: "Лицензионное соглашение обязательня для заполнения"
            }
        }
    };
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    console.log(data.profession);
    const heandleChange = (target) => {
        console.log(target);
        if (target) {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };
    const [errors, setErrors] = useState({});
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
        // const errors = {};
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
        //     }
        // }
    };
    const isValidData = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);
    const heandlechangeButton = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log("dd");
    };
    return (
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
            <SelectField
                onChange={heandleChange}
                options={professions}
                defaultOption={"Choose..."}
                error={errors.profession}
                value={data.profession}
                label={"Выбери свою профессию"}
                name="profession"
            />
            <RadioField
                name={"sex"}
                onChange={heandleChange}
                value={data.sex}
                options={[
                    { name: "Male", value: "Male" },
                    { name: "Female", value: "Female" },
                    { name: "Other", value: "Other" }
                ]}
                label="Выберете ваш пол"
            />
            <MultiSelectField
                options={qualities}
                onChange={heandleChange}
                name="qualities"
                label="Выберете ваши качества"
                defaultValue={data.qualities}
            />

            <CheckBoxField
                value={data.licence}
                onChange={heandleChange}
                name="licence"
                error={errors.licence}
            >
                <>
                    Подтвердить <a>лицензионное соглашение</a>
                </>
            </CheckBoxField>

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

export default RegistrForm;
