
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class UpdateCourse extends Component {

    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        createdBy: '',
        errorMessage: '',
        firstName: '',
        lastName: '',
    }
    componentDidMount() {
        this.handleCourses();
      }

    // handle changes to user input
    handleCourses = e => {
        // request info
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
        
            // when info come backs
            .then(res => {

                // course info
                const courseInfo = res.data.course;

                // set state to the current course
                if (courseInfo.userId !== parseInt(localStorage.getItem("UserId"))) {
                    this.props.history.push("/forbidden");
                }else{
                this.setState({
                    userid: courseInfo.userId,
                    id: courseInfo.id,
                    title: courseInfo.title,
                    description: courseInfo.description,
                    estimatedTime: courseInfo.estimatedTime,
                    materialsNeeded: courseInfo.materialsNeeded,
                    errorMessage: '',
                    firstName: courseInfo.firstName,
                    lastName: courseInfo.lastName
                })
            }
            }).catch(error => {
                if (error.response.status === 404) {
                    this.props.history.push("/notfound");
                }else if (error.response.status === 500) {
                    this.props.history.push("/error");
                }
            })  
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        // prevent default
        e.preventDefault();
            // request information to update
            axios({
                method: 'put',
                url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
                auth: {
                    username: localStorage.getItem("Email"),
                    password: localStorage.getItem('Password')
                },
                data: {
                    userId: localStorage.getItem("UserId"),
                    id: this.props.match.params.id,
                    title: this.state.title,
                    description: this.state.description,
                    estimatedTime: this.state.estimatedTime,
                    materialsNeeded: this.state.materialsNeeded,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName

                }
            // send user to the right course
            }).then(res => {
                this.props.history.push('/courses/' + this.props.match.params.id);
            // if there are any errors delivered from the api desplay them to the REACT app
            }).catch(error => {
                console.log('All credentials are required');
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
    

    render() {
        const { title, description, estimatedTime, materialsNeeded, errorMessage} = this.state;
        return (
            <div className='bounds course--detail'>
                <h1>Update Course</h1>
                <div>
                    {errorMessage ? (
                        <div>
                            <h2 className='validation--errors--label'>Error</h2>
                            <div className='validation-errors'>
                                <ul>
                                    <li>{errorMessage}</li>
                                </ul>
                            </div>
                        </div>
                    ) : ''}
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <div className='grid-66'>
                            <div className='course--header'>
                                <h4 className='course--label'>Course</h4>
                                <div>
                                    <input
                                        id='title'
                                        name='title'
                                        type='text'
                                        className='input-title course--title--input'
                                        placeholder='Course title'
                                        value={title}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <p>By {`${localStorage.getItem("FirstName")} ${localStorage.getItem("LastName")}`}</p>
                            </div>
                            <div className='course--description'>
                                <div>
                                    <textarea
                                        id='description'
                                        name='description'
                                        className=''
                                        placeholder='Course description'
                                        value={description}
                                        onChange={this.handleInputChange}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className='grid-25 grid-right'>
                            <div className='course--stats'>
                                <ul className='course--stats--list'>
                                    <li className='course--stats--list--item'>
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input
                                                id='estimatedTime'
                                                name='estimatedTime'
                                                type='text'
                                                className='course--time--input'
                                                placeholder='Hours'
                                                value={estimatedTime}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </li>
                                    <li className='course--stats--list--item'>
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                                id='materialsNeeded'
                                                name='materialsNeeded'
                                                className=''
                                                placeholder='Materials needed'
                                                value={materialsNeeded}
                                                onChange={this.handleInputChange} >
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='grid-100 pad-bottom'>

                            {/* renders an 'Update Course' button that when clicked sends a PUT request to the REST API's /api/courses/:id route.  */}
                            <button className='button' type='submit'> Update Course </button>
                            {/* renders a 'Cancel' button that returns the user to the 'Course Detail' screen. */}
                            <Link className='button button-secondary' to={'/courses/' + this.props.match.params.id}> Cancel </Link>
                        </div>
                    </form>
                </div>
            </div>            
        );
    }
}




export default UpdateCourse;