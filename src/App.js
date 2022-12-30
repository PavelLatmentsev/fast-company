import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/quilities";
import { loadProfessionList } from "./store/professions";
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProfessionList());
        dispatch(loadQualitiesList());
    }, []);
    return (
        <div>
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
            <ToastContainer />
        </div>
    );
};

export default App;
