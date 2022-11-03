import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegistrForm from "../components/ui/registrForm";
const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const tooggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Registration</h3>
                            <RegistrForm />
                            <p>
                                Already in account?{" "}
                                <a role="button" onClick={tooggleFormType}>
                                    Sign in
                                </a>{" "}
                            </p>
                        </>
                    ) : (
                        <>   <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>
                                Dont have account?{" "}
                                <a role="button" onClick={tooggleFormType}>
                                    Sign up
                                </a>{" "}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
