//import React from 'react';
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import './styles/global.css';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// import components
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import Header from './Components/Header';
import UserSignOut from './Components/UserSignOut';
import PrivateRoute from './Components/PrivateRoute';
import Errors from './Components/Errors';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
class App extends Component {

constructor() {
  super();
  this.state = {};
  this.handleSignIn = this.handleSignIn.bind(this);
}

 state = {
   errorMessage: " "
 };

// handle sign in
handleSignIn(userInfo, props) {
  // request user info
  axios.get('http://localhost:5000/api/users', {
    // set authorization header
    auth: {
      username: userInfo.emailAddress,
      password: userInfo.password
    }
  }).then(res => {
      // if request succeeds
      if (res.status === 200) {
        // save user preferences locally
        window.localStorage.setItem('FirstName', res.data.firstName)
        window.localStorage.setItem('LastName', res.data.lastName)
        window.localStorage.setItem('Email', userInfo.emailAddress)
        window.localStorage.setItem('Password', userInfo.password)
        window.localStorage.setItem('UserId', JSON.stringify(res.data.id))
        window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
        window.location.assign('/')
      }

      }).catch(error => {
        if (error.response.status === 400) {
            this.setState({
                errorMessage: error.response.data.message
            })
        } else if (error.response.status === 401) {
            this.setState({
                errorMessage: error.response.data.message   
            })
        }
    })
}

handleSignOut = () => {
  // clear user preferences
  localStorage.clear();
  window.location.assign('/courses')
}

  render() {
    return (
        <BrowserRouter>
          <div>
            <Header />
          <Switch>
              {/* routes */}
              <Redirect exact from='/' to='/courses' />
              <Route exact path='/courses' render={() => <Courses />} />
              <PrivateRoute exact path='/courses/create' component={CreateCourse} />
              <Route exact path='/courses/:id' component={CourseDetail} />
              <Route exact path='/signin' render={() => <UserSignIn signIn={this.handleSignIn} />} />
              <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse} />
              <Route exact path='/signup' render={() => <UserSignUp signIn={this.handleSignIn} />} />
              <Route exact path='/signout' component={UserSignOut} />
              

                  {/*Route for errors*/}
                  <Route exact path="/error" component = {Errors} />
                <Route exact path='/notfound' component = {NotFound} />
                <Route exact path='/forbidden' component = {Forbidden} />
            </Switch>
          </div>
        </BrowserRouter>
      
    );
  }
}

export default App;

