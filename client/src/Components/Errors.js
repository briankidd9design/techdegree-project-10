import React from 'react';
import { Link } from 'react-router-dom';

const Error = (error) => {
  return(
    <div id='root'>
      <div className='bounds'>
      <Link className='button button-secondary' to='/'>Return to List</Link>
        <h1>Error</h1>
          <p>Sorry! You have encountered an Internal Server Eroor. Please make sure you are connected to your server</p>
      </div>
    </div>
  )
}

export default Error;

