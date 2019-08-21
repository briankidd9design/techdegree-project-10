import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component {

    state = {
        course: {},
        courseId: '',
        createdBy: '',
        errorMessage: '',
        isLoading: true
    };

  
    componentDidMount() {
        this.handleCourse();
    }

    
    handleCourse = () => {
     
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
            
            .then(res => {
              
                const courseInfo = res.data;
                console.log(courseInfo);
              
                this.setState({
                    courseInfo,
                    courseId: courseInfo.course.id,
                    createdBy: courseInfo.course.userId,
                    isLoading: false
                });
            }).catch(error => {

                  //If there is an error
                  if (error.response.status === 400) {
                    this.props.history.push("/notfound");
                  } 
            })
    }


    handleDeleteCourse = (e) => {
       
        e.preventDefault();

        
        axios.delete('http://localhost:5000/api/courses/' + this.props.match.params.id, {
            method: 'DELETE',
          
            auth: {
                username: localStorage.getItem('Email'),
                password: localStorage.getItem('Password')
            },
            data: {
                id: this.state.courseId
            }
        }).then(res => {
            this.props.history.push('/courses');
            console.log("This course has been successfully deleted");
        }).catch(error => {
       
            console.log('Oops! We have ran into an error', error);
        })
    }


     
    handleCancel = e => {
       
        e.preventDefault();
       
        this.props.history.push('/courses');
    }


    render() {
            if (this.state.isLoading) {
                return <h1> Loading </h1>
        }
        console.log(this.state.courseInfo);
            const { createdBy } = this.state;
            const { id, title, materialsNeeded, estimatedTime, description, User } = this.state.courseInfo.course;
        return (
                <div>
                    <div className='actions--bar'>
                        <div className='bounds'>
                            <div className='grid-100'>
                             
                                {(localStorage.getItem('IsLoggedIn')) && parseInt(localStorage.getItem('UserId')) === createdBy ? (
                                    <span>
                                     
                                        <Link className='button' to={'/courses/' + id + '/update'}>Update Course</Link>
                                     
                                        <button className='button' onClick={e => this.handleDeleteCourse(e)}>Delete Course</button>
                                    </span>
                                ) : ("")}
                                <Link className='button button-secondary' to='/'>Return to List</Link>
                            </div>
                        </div>
                    </div>

               
                    <div className='bounds course--detail'>
                        <div className='grid-66'>
                            <div className='course--header'>
                                {/* <h4 className='course-label'>Course</h4> */}
                              
                    </div>

              
                    <div className='bounds course--detail'>
                        <div className='grid-66'>
                            <div className='course--header'>
                                <h4 className='course-label'>Course</h4>
                                <h3 className='course--title'>{title}</h3>
                                <p>By {User.firstName} {User.lastName}</p>
                                </div>
                          
                                <div className='course--description'>
                            
                                <ReactMarkdown source={description} />
                                </div>
                        </div>
                    </div>


                 
                    <div className='grid-25 grid-right'>
                        <div className='course--stats'>
                            <ul className='course--stats--list'>

                            
                                <li className='course--stats--list--item'>
                                    <h4>Estimated Time</h4>
                                    <h3>{estimatedTime}</h3>
                                </li>

                               
                                <li className='course--stats--list--item'>
                                    <h4>Materials Needed</h4>
                                    <ul>
                                     
                                        <ReactMarkdown source={materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            )};
}

export default CourseDetail;