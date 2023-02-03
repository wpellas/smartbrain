import React from "react";
import Tilt from 'react-parallax-tilt';
import logo from './logo.png';
import './Logo.css';

const Logo = () => {
    return (
       <div className="mt0 tiltContainer">
        <Tilt>
            <div className="br3 shadow-5 Tilt">
                <img className="brainImg" src={logo} alt="Logotype" />
            </div>
        </Tilt>
       </div> 
    )
}

export default Logo;