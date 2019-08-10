//import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {

  state = {
    courses: []
};

Courses = () => {
  axios.get('http://localhost:5000/api/courses/')
      .then(res => { this.setState(res.data) })
      .catch(error => {
          console.log('There was an error getting the data', error);
      })
      
}



componentDidMount() {
  this.Courses();
}

render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
          <div>
          {this.state.courses.map((course) => (
                    <div>
                       <ul>
                            <li>{course.title}</li>
                      </ul>
                   </div>
                  
                ))}
          </div>
      </div>
    );
  }
}

export default App;
