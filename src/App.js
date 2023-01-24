import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  // Functions that are later passed on to other components.
  calculateFaceLocation = (data) => {
    const clarifaiFace = data;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('calculateFaceLocation func', width, height, clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box })
  }

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
        // console.log(bounding_box);
        this.displayFaceBox(this.calculateFaceLocation(bounding_box));
      })
      // .then(response => this.calculateFaceLocation(response))
      // .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  // Displayed Website (HTML)
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <div className='particlesBackGround'>...</div>
        <ParticlesBg color={"#00c7c7"} num={100} type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputchange={this.onInputchange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
  
}

export default App;