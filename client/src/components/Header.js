import React from "react";
import {Link} from "react-router-dom";
import GoogleOAuth from "./GoogleOAuth";

const Header = () => {

    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Home page
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    All Books
                </Link>
                <GoogleOAuth />
            </div>
        </div>
    )
};

export default Header;