import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegistrForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false
    });
    const history = useHistory();
    const { qualities } = useQuality();
    const { signUp } = useAuth();
    const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));
    const { professions } = useProfessions();
    const professionsList = professions.map((p) => ({ label: p.name, value: p._id }));
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен не корректно" }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
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

    const heandleChange = (target) => {
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

    const heandleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data, qualities: data.qualities.map((q) => ({ q: q.value })) };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
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
                type="text"
                label="Имя"
                onChange={heandleChange}
                name="name"
                value={data.name}
                error={errors.name}
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
                options={professionsList}
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
                options={qualitiesList}
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
