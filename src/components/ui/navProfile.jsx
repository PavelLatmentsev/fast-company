import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const NavProfile = () => {
    const { currentUser } = useAuth();
    const [open, setOpen] = useState(false);
    const toogleMenu = () => {
        setOpen(prevState => !prevState);
    };
    return (
        <div className="dropdown" onClick={toogleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`} alt="img" className="img-responsive rounded-circle" height="40" />
            </div>
            <div className={"w-100 dropdown-menu" + (open ? " show" : "")}>
                <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
                <Link to={`/logout`} className="dropdown-item">Logout</Link>
            </div>
        </div>
    );
};

export default NavProfile;
