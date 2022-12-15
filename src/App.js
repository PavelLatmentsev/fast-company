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
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
const App = () => {
    return (
        <div>
            <AuthProvider>
                <Navbar />
                <QulitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={LogOut} />
                            <ProtectedRoute
                                path="/users/:userID?/:edit?"
                                component={UsersList}
                            />
                        </Switch>
                    </ProfessionProvider>
                </QulitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
