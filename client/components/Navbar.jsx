import React, { useState } from "react";
import "../styles/Navbar.css";
import Webpack from './Webpack.jsx';
import Frontend from './Frontend.jsx';
import Backend from './Backend.jsx';

function Navbar () {
    return(
        <div className='container'>
            <Webpack />
            <Frontend />
            <Backend />
        </div>

    )
}
export default Navbar;