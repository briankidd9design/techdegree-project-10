import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {

    //this reset the empty state to being empty
    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    }

    //
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // handle created course
    handleCreateCourse = e => {
        // prevent default
        e.preventDefault();
            // send information
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/courses',
                auth: {
                    username: localStorage.getItem('Email'),
                    password: localStorage.getItem('Password')
                },
                data: {
                    title: this.state.title,
                    description: this.state.description,
                    estimatedTime: this.state.estimatedTime,
                    materialsNeeded: this.state.materialsNeeded,
                    userId: localStorage.getItem("UserId"),
                }
            }).then(() => {
                // redirect user when course is created
                this.props.history.push('/');
                // validation errors from API
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
    render() {
        const { title, description, estimatedTime, materialsNeeded, errorMessage } = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {errorMessage ? (
                        <div>
                            <h2 className="validation--errors--label">Errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    <li>{errorMessage}</li>
                                </ul>
                            </div>
                        </div>
                    ) : ''}
                    <form onSubmit={e => this.handleCreateCourse(e, localStorage.getItem('username'), localStorage.getItem('password'), title, description, materialsNeeded, estimatedTime)}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                        className="input-title course--title--input"
                                        placeholder="Course title..."
                                        id="title"
                                        name="title"
                                        type="text"
                                    />
                                </div>
                                <p>{localStorage.user}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Course description..."
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input
                                                id="estimatedTime"
                                                name="estimatedTime"
                                                type="text"
                                                className="course--time--input"
                                                placeholder="Hours"
                                                value={this.state.estimatedTime}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                placeholder="List materials..."
                                                value={this.state.materialsNeeded}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <Link to="/" className="button button-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    
    }
}

export default CreateCourse;