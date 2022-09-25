import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [count, setCount] = useState(users.length);
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
            <SearchStatus users={users} count={count} />
            <Users
                onGetDeleteRow={getDeleteRow}
                users={users}
                onHeandleToggleBookmark={heandleToggleBookmark}
            />
        </div>
    );
};
export default App;
