import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const clarifai = {
  USER_ID: 'wpellas',
  PAT: '0fcde0454b5442ff8779ee309bedf2b2',
  APP_ID: 'my-first-application',
  MODEL_ID: 'face-detection',
  MODEL_VERSION_ID: '45fb9a671625463fa646c3523a3087d5'
}

class App extends Component{
  // JavaScript
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  // Functions that are later passed on to other components.
  onInputchange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    const { USER_ID, APP_ID, PAT, MODEL_ID, MODEL_VERSION_ID } = clarifai;
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT
      },
      body: raw
    };

    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const { outputs } = JSON.parse(result);
        const { regions } = outputs[0].data;
        const { bounding_box } = regions[0].region_info;
        console.log(bounding_box);
      });
  }

  // Displayed Website (HTML)
  render() {
    return (
      <div className="App">
        <div className='particlesBackGround'>...</div>
        <ParticlesBg color={"#00c7c7"} num={100} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputchange={this.onInputchange} 
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
  
}

export default App;