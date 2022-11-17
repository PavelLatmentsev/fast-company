import React from "react";
import { useHistory } from "react-router-dom";
const BackButton = () => {
    const history = useHistory();
    return (<div>
        <button className="btn btn-primary" onClick={() => history.goBack()}>Назад</button>
    </div>);
};
export default BackButton;
