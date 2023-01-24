import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl }) => {
    return (
       <div className="center ma">
            <div className="absolute mt2">
                <img className="faceRecognitionImg" src={imageUrl} alt=""/>
            </div>  
       </div> 
    )
}

export default FaceRecognition;