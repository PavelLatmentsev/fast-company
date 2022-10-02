import React, { useState, useEffect } from "react";
import Users from "./components/users";
import API from "./api/index";

const App = () => {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(users.length);
    useEffect(() => {
        API.users.fetchAll().then(resolve => setUsers(resolve));
    });

    const getDeleteRow = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
        setCount(count - 1);
    };

    const heandleToggleBookmark = (id) => {
        const newBox = users.map((item) => {
            if (item._id === id) {
                item.bookmark = !item.bookmark;
            }
            return item;
        });

        setUsers(newBox);
    };

    return (
        <div>
            <Users
                onGetDeleteRow={getDeleteRow}
                users={users}
                onHeandleToggleBookmark={heandleToggleBookmark}
                count={count}
            />
        </div>
    );
};

export default App;
