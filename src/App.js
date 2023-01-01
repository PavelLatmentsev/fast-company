import React from "react";
// import Users from "./components/users";
import UsersList from "./layouts/usersList";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Navbar from "./components/ui/navbar";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <div>
            <AppLoader>
                <AuthProvider>
                    <Navbar />

                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <ProtectedRoute
                            path="/users/:userID?/:edit?"
                            component={UsersList}
                        />
                    </Switch>
                </AuthProvider>
            </AppLoader>
            <ToastContainer />

        </div>
    );
};

export default App;
