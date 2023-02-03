import React from "react";
import './ImageLinkForm.css';

// Collects the passed down functions 
const ImageLinkForm = ({ onInputchange, onButtonSubmit }) => {
    return (
       <div className="imageLinkFormContainer">
        <p className="f3 white">
            {'This app will detect faces in an image, try inputting a URL in the textfield and hit Detect!'}
        </p>
        <div className="center">
            <div className="form center pa4 br3 shadow-5">
                <input className="f4 pa2 w-70 center" type="text" onChange={onInputchange}/>
                <button 
                className="w-30 grow f4 link ph3 pv2 dib white subBtn"
                onClick={onButtonSubmit}
                >
                Detect</button>
            </div>
        </div>
       </div> 
    )
}

export default ImageLinkForm;