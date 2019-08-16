// import React from "react";
// import { Link } from "react-router-dom";

// const Errors = () => {
//   return (
//     <div>
//       <hr />
//       <div className="bounds">
//         <h1>Unexpected Error</h1>
//         <p>
//           Sorry! An unexpected error has occurred Click{" "}
//           <Link to="/courses">here</Link> to go back to the Courses page.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Errors;
import React from 'react';

const Error = (error) => {
  return(
    <div id='root'>
      <div className='bounds'>
        <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </div>
  )
}

export default Error;
