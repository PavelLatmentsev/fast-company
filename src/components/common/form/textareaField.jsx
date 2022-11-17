import React from "react";
import PropTypes from "prop-types";
const TextAreaField = ({ onChange, label, name, value }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            <div className="input-group">
                <textarea
                    className="form-control"
                    id={name}
                    rows="3"
                    onChange={handleChange}
                    value={value}
                    name={name}
                />
            </div>
        </div>
    );
};
TextAreaField.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string
};
export default TextAreaField;
