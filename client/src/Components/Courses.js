import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Courses extends Component {

    //This sets the initial state of the courses component which is an empty array
    //courses from the api will be added to this array
    state = {
        courses: []
    };

    // the coursess will be returned from the api only when the component is mounted
    /*It is only called on the client, performed after the intiail render when the when the client has received
    data from server and right before this data renders the browser
    resource: https://medium.com/coffee-and-codes/componentdidmount-v-s-componnetwillmount-react-47f4f631276c*/
    
    componentDidMount() {
        this.Courses();
    }

    // get list of course from axios get request
    //axios, unlike the Fetch API, makes it so you do not have to call a separate JSON request 
    Courses = () => {
        axios.get('http://localhost:5000/api/courses/')
            .then(res => { this.setState(res.data) })
            .catch(error => {
                // catch any errors and write message in console
                console.log('Oops! We have ran into an error', error);
            })
            /*//Log errors
                .catch(error => {
                if (error.response.status === 500) {
                this.props.history.push('/error');
          } */
    }

    render() {
        return (
            
            <div className="bounds">
                {/* The map() method creates a new array with the results of calling a 
                function for every array element. In this case it creates and array of the courses
                and the indexes associated with those courses*/}

                {/* key={course.id} Keys help React identify which items have changed, are added, or
                 are removed. Keys should be given to the elements inside the array to give the 
                 elements a stable identity: More info:
                 https://reactjs.org/docs/lists-and-keys.html#keys */}

                {this.state.courses.map((course) => (
                    <div className="grid-33" key={course.id}>
                        {/* links should send you to the correct course detail information when clicked */}
                        <Link className="course--module course--link" to={'/courses/' + course.id}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    </div>
                ))}
                <div className="grid-33">
                    {/* show link to create course*/}
                    <Link className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>
                            New Course
                        </h3>
                    </Link>
                </div>
            </div>
       )}

}
 
export default Courses;