import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if(isSignedIn === true) {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')}className="f3 link dim black underline pa3 pointer white">Sign Out</p>
            </nav>
            )
        } else {
            return (
            <div>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')}className="f3 link dim black underline pa3 pointer white">Sign In</p>
                    <p onClick={() => onRouteChange('register')}className="f3 link dim black underline pa3 pointer white">Register</p>
                </nav>
            </div>    
            )
        }
}

export default Navigation;