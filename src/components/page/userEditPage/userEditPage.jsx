import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
// import API from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import BackButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = ({ userID }) => {
    const history = useHistory();
    const { getQuality } = useQuality();
    const { currentUser, updateUserData } = useAuth();
    const { professions } = useProfessions();
    const { qualities } = useQuality();
    // const [qualities, setQualities] = useState({});
    // const [professions, setProfessions] = useState();
    const [userData, setUserData] = useState();
    const [errors, setErrors] = useState({});
    const newQ = currentUser.qualities.map((q) => getQuality(q.q));
    const NewArray = newQ.map((p) => ({ label: p.name || p.label, value: p._id || p.value }));
    useEffect(() => {
        setUserData({
            ...currentUser,
            qualities: NewArray
        });
    }, []);
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязателено для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен не корректно" }
        },
        profession: {
            isRequired: { message: "Профессия обязательна для заполнения" }
        },
        sex: {
            isRequired: { message: "Укажите ваш пол" }
        }
    };

    const heandleChange = (target) => {
        if (target) {
            setUserData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };
    console.log(userData);
    const validate = (userData) => {
        // const errors = {};
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
        //     }
        // }
        if (userData) {
            const errors = validator(userData, validatorConfig);
            setErrors(errors);
        }
        return Object.keys(errors).length === 0;
    };
    const isValidData = Object.keys(errors).length === 0;
    useEffect(() => {
        validate(userData);
    }, [userData]);
    const heandlechangeButton = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log("userData.profession", userData.profession);
        const professionName = professions.find((p) => userData.profession === p.name);
        console.log("professionName", professionName);
        const qualitiesList = userData.qualities.map((q) => ({ q: q.value }));
        const data = {
            ...userData,
            profession: professionName._id,
            qualities: qualitiesList
        };
        updateUserData(data);
        setUserData(data);
        // API.users.update(userID, data);
        history.push("/users/" + userID);
    };

    if (userData) {
        return (
            userData && (
                <div className="container mt-5">
                    <BackButton />
                    <div className="row">
                        <div className="col-md-6 offset-md-3 p-4">
                            <form onSubmit={heandlechangeButton}>
                                <TextField
                                    type="text"
                                    label="Имя"
                                    onChange={heandleChange}
                                    name="name"
                                    value={userData.name}
                                    error={errors.name}
                                />
                                <TextField
                                    type="text"
                                    label="Электронная Почта"
                                    onChange={heandleChange}
                                    name="email"
                                    value={userData.email}
                                    error={errors.email}
                                />
                                <SelectField
                                    onChange={heandleChange}
                                    options={professions}
                                    defaultOption={"Choose..."}
                                    error={errors.profession}
                                    value={userData.profession}
                                    label={"Выбери свою профессию"}
                                    name="profession"
                                />
                                <RadioField
                                    name={"sex"}
                                    onChange={heandleChange}
                                    value={userData.sex}
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
                                    defaultValue={userData.qualities}
                                    error={errors.sex}
                                />

                                <button
                                    type="submit"
                                    disabled={!isValidData}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        );
    }
    return "Loading...";
};

UserEditPage.propTypes = {
    userID: PropTypes.string
};

export default UserEditPage;
    // useEffect(() => {
    //     API.professions.fetchAll().then((data) => setProfessions(data));
    //     API.qualities.fetchAll().then((data) => setQualities(data));
    // }, []);

    // const [data, setData] = useState({
    //     email: "",
    //     nameUser: "",
    //     profession: "",
    //     sex: "male",
    //     qualities: [],
    //     licence: false
    // });

        // useEffect(() => {
    //     API.users.getById(userID).then((data) => {
    //         data = {
    //             ...data,
    //             profession: data.profession._id,
    //             qualities: data.qualities.map((qualitie) => {
    //                 return { label: qualitie.name, value: qualitie._id };
    //             })
    //         };
    //         setUserData(data);
    //     });
    // }, []);

    // const heandlechangeButton = (e) => {
    //     e.preventDefault();
    //     const isValid = validate();
    //     if (!isValid) return;
    //     const professionName = Object.keys(professions).find(
    //         (key) => professions[key]._id === userData.profession
    //     );
    //     const qualitiesList = userData.qualities.map((q) =>
    //         Object.values(qualities).find(
    //             (qualitie) => q.value === qualitie._id
    //         )
    //     );
    //     const data = {
    //         ...userData,
    //         profession: professions[professionName],
    //         qualities: qualitiesList
    //     };
    //     console.log("data", data);
    //     API.users.update(userID, data);
    //     history.push("/users/" + userID);
    // };
