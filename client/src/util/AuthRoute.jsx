// import React, {useContext} from 'react'
// import { Navigate } from 'react-router-dom'

// import { AuthContext } from '../context/auth'


// const AuthRoute = ({component: Component, ...rest}) => {
//     const { user } = useContext(AuthContext)

//     if (user){
//       return <Navigate to = "/" replace/>
//     }
    
//     const Element = Component
//     return <Element {...rest} />
// }

// export default AuthRoute ;

  // React Router v6+ (what Vite apps use) no longer supports Redirect or render props
  // Instead, we use <Navigate /> and element={<Component />}
// import React, {useContext} from 'react'
// import { Route, Redirect } from 'react-router-dom'

// import { AuthContext } from '../context/auth'


// const AuthRoute = ({component: Component, ...rest}) => {
//     const { user } = useContext(AuthContext)
//   return (
//     <Route
//         {...rest}
//         render = {(props) => 
//             user ? <Redirect to ="/" /> : <Component { ...props} />
//         }
//     />
//   )
// }

// export default AuthRoute

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

// This component prevents logged-in users from accessing certain routes (e.g., login/register)
const AuthRoute = ({ element: Component }) => {
  const { user } = useContext(AuthContext);

  // If user is logged in, redirect to home page, otherwise render the component
  return  user ? <Navigate to="/" replace/> : Component;
};

export default AuthRoute;
