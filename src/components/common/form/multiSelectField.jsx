import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    console.log(options);
    const transformArray = options.map((p) => ({ label: p.name || p.label, value: p.value }));
    const optionsArray =
        !Array.isArray(transformArray) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id
            }))
            : transformArray;
    console.log(transformArray);
    const heandleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                options={optionsArray}
                className="basic-multy-select"
                classNamePrefix="select"
                onChange={heandleChange}
                name={name}
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default MultiSelectField;
