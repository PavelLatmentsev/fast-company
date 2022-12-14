import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [open, setOpen] = useState(false);
    const toogleMenu = () => {
        setOpen(prevState => !prevState);
    };
    if (!currentUser) return "Loading";
    return (
        <div className="dropdown" onClick={toogleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img src={currentUser.image} alt="img" className="img-responsive rounded-circle" height="40" />
            </div>
            <div className={"w-100 dropdown-menu" + (open ? " show" : "")}>
                <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
                <Link to={`/logout`} className="dropdown-item">Logout</Link>
            </div>
        </div>
    );
};

export default NavProfile;
