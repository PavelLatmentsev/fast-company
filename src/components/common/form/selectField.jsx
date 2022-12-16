import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error,
    name
}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const transformArray = options.map((p) => ({ label: p.name || p.label, value: p.value }));
    const optionsArray =
        !Array.isArray(transformArray) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                name: options[optionName].name,
                value: options[optionName]._id
            }))
            : transformArray;
    const heandleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
                <select
                    className={getInputClasses()}
                    id={name}
                    value={value}
                    name={name}
                    onChange={heandleChange}
                >
                    <option disabled value="">
                        {defaultOption}
                    </option>
                    {optionsArray &&
                        optionsArray.map((option) => (
                            <option
                                value={option.value}
                                key={option.value + " " + option.label}
                            >
                                {option.label}
                            </option>
                        ))}
                </select>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
