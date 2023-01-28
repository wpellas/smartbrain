import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
       <div className="ma4 mt0 tiltContainer">
        <Tilt>
            <div className="br2 shadow-2 Tilt">
                <img className="brainImg" src={brain} alt="Logotype" />
            </div>
        </Tilt>
       </div> 
    )
}

export default Logo;