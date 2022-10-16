import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className ="navbar navbar-expand-lg bg-light">
            <div className ="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">Main</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/users"} className="nav-link">Users</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
