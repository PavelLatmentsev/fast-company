import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onHeandleGroupList, selectedItem }) => {
    return (

        <ul className="list-group">
            {Object.keys(items).map(item => <li role= "button" onClick={() => onHeandleGroupList(items[item])} className={"list-group-item" + (items[item] === selectedItem ? " active" : "")} key={items[item][valueProperty]} > { items[item][contentProperty] }</li>)}
        </ul >

    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onHeandleGroupList: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
