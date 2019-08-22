import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return(
    <div id='root'>
      <div className='bounds'>
      <Link className='button button-secondary' to='/'>Return to List</Link>
        <h1>Forbidden</h1>
          <p>You are not authorized to access this page. Please sign in with the authorized credentials.</p>
      </div>
    </div>
  )
}

export default Forbidden;
