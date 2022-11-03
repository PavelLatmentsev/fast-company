import React from "react";
// import Users from "./components/users";
import UsersList from "./layouts/usersList";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Navbar from "./components/ui/navbar";

const App = () => {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/users/:userID?" render={(props) => <UsersList {...props}/>}/>
            </Switch>
        </div>

    );
};

export default App;
