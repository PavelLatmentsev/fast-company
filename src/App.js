import React from "react";
// import Users from "./components/users";
import UsersList from "./layouts/usersList";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Navbar from "./components/ui/navbar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QulitiesProvider } from "./hooks/useQuality";
const App = () => {
    return (
        <div>
            <Navbar/>
            <ProfessionProvider>
            <Switch>
                <Route exact path="/" component={Main}/>
                 <Route path="/login/:type?" component={Login}/>
                <QulitiesProvider>
                <Route path="/users/:userID?/:edit?" render={(props) => <UsersList {...props}/>}/>
                </QulitiesProvider>
            </Switch>
            </ProfessionProvider>
           <ToastContainer/>
        </div>

    );
};

export default App;
