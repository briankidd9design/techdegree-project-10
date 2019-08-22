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

  //make sure the compoent is mounted before executing the handleCourse method
    componentDidMount() {
        this.handleCourse();
    }

    //gets course details from the api
    handleCourse = () => {
     //when the data is received
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
            //get the requested course data
            .then(res => {
              //set the class state to the current course
                const courseInfo = res.data;
                console.log(courseInfo);
                 //set the class state to the current course
                this.setState({
                    courseInfo,
                    courseId: courseInfo.course.id,
                    createdBy: courseInfo.course.userId,
                    isLoading: false
                });
            }).catch(error => {
                //if the course does cannot be found, return a http 404 error
                  if (error.response.status === 404) {
                    this.props.history.push("/notfound");
                  } 
            })
    }

    //this mehtod deletes a course
    handleDeleteCourse = (e) => {
       
        e.preventDefault();

        //executes deletion request
        axios.delete('http://localhost:5000/api/courses/' + this.props.match.params.id, {
            method: 'DELETE',
          //user must be authorized to delete the course he or she created
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


     //cancel 
    handleCancel = e => {
       
        e.preventDefault();
       //goes back to courses route
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
                             {/* render update and delete buttons only if user is logged in */}
                                {(localStorage.getItem('IsLoggedIn')) && parseInt(localStorage.getItem('UserId')) === createdBy ? (
                                    <span>
                                    {/* update course */}
                                        <Link className='button' to={'/courses/' + id + '/update'}>Update Course</Link>
                                       {/* delete course */}
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

              {/* diplays title of the course */}
                    <div className='bounds course--detail'>
                        <div className='grid-66'>
                            <div className='course--header'>
                                <h4 className='course-label'>Course</h4>
                                <h3 className='course--title'>{title}</h3>
                                <p>By {User.firstName} {User.lastName}</p>
                                </div>
                          {/* displays course description */}
                                <div className='course--description'>
                            {/* ReactMarkdown is used to display the course description property */}
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