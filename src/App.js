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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component{
  // JavaScript
  constructor() {
    super();
    this.state = initialState;
  }

  // Loads user data
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // PASSED DOWN FUNCTIONS
  calculateFaceLocation = (data) => {
    const clarifaiFace = data;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputchange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://smartbrain-api-pi.vercel.app/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.text())
      .then(response => {
        if (response) {
          fetch('https://smartbrain-api-pi.vercel.app/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log)
        }
        const { outputs } = JSON.parse(response);
        const { regions } = outputs[0].data;
        const { bounding_box } = regions[0].region_info;
        this.displayFaceBox(this.calculateFaceLocation(bounding_box));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
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
              <div className="appContainer">
                <Rank 
                  name={this.state.user.name} 
                  entries={this.state.user.entries}
                />
                <ImageLinkForm 
                  onInputchange={this.onInputchange} 
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={box} imageUrl={imageUrl} />
              </div>
            </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
        <div className="footer">
          <p className='footerText'>Made by <a href='https://williampellas.com/'>William Pellas</a>, using <a href='https://reactjs.org/'>React</a> for the 'The Complete Web Developer in 2023: Zero to Mastery' course from Zero to Mastery. Check out this projects GitHub repo <a href="https://github.com/wpellas/smartbrain">here</a>.</p>
        </div>
      </div>
    );
  }
  
}

export default App;