import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserSignUp extends Component {

    // set local state (empty strings)
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errorMessage: ''
    }

    
    handleInputChange = e => {
        e.preventDefault();
       //set the state to the name entered into the target
        this.setState({ [e.target.name]: e.target.value });
    }

    //sign up method
    handleSignUp = (e) => {
        e.preventDefault();

        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

        // password is required
        if(password === '') {
            this.setState({
                errorMessage: 'A password is required'
            })
         // if password inputs dont match, show error
        } else if (password !== confirmPassword) {
            this.setState({
                errorMessage: 'Sorry, the passwords do not match'
            })
        } else {
            // if everything is entered correctly, make request
            axios.post('http://localhost:5000/api/users', { firstName, lastName, emailAddress, password })
                .then(res => {
                    // if response is successful
                    if (res.status === 201) {
                        this.setState({
                            errorMessage: ''
                        })
                        this.props.signIn({ emailAddress, password });
                    }
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
    }

    render() {
//The data stored in these constant variables can now be placed in the DOM
        const { firstName, lastName, emailAddress, password, errorMessage } = this.state;

        return (
            <div className='bounds'>
                <div className='grid-33 centered signin'>
                    <h1>Sign Up</h1>
                    <div>
                        {errorMessage ? (
                            <div>
                                <h2 className='validation--errors--label'>Sign Up Error!</h2>
                                <div className='validation-errors'>
                                    <ul>
                                        <li>{errorMessage}</li>
                                    </ul>
                                </div>
                            </div>
                        ) : ''}
                    {/*the event handler for when a user enters in signup info */}
                        <form onSubmit={(e) => this.handleSignUp(e, firstName, lastName, emailAddress, password)}>
                            <div>
                                <input
                                    id='firstName'
                                    name='firstName'
                                    type='text'
                                    className=''
                                    placeholder='First Name'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='lastName'
                                    name='lastName'
                                    type='text'
                                    className=''
                                    placeholder='Last Name'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='emailAddress'
                                    name='emailAddress'
                                    type='text'
                                    className=''
                                    placeholder='Email Address'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    className=''
                                    placeholder='Password'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type='password'
                                    className=''
                                    placeholder='Confirm Password'
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className='grid-100 pad-bottom'>
                                <button className='button' type='submit'>Sign Up</button>     
                                
                                <Link className="button button-secondary" to="/courses">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to='/signin'>Click here</Link> to sign in!</p>
                </div>
            </div>

        )
    }
}

export default UserSignUp;