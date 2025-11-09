import React, {useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Register = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});

  // 1️⃣ Define mutation first
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // update(_, result) {
    //   // console.log(result)
    //   navigate("/");
    update(_, {data: {register: userData}}) {
      context.login(userData)  //we don't need to create another register funtion to use the data.
  setTimeout(() => navigate("/"), 0); // let React update context first
    },
   onError(err) {
      const errData = err.errors?.[0]?.extensions?.errors;
      if (errData) {
        setErrors(errData);
      } 
    },
  });

   // 2️⃣ Define registerUser BEFORE useForm uses it
  const registerUser = () => {
    addUser({ variables: values });
  };
 
  // 3️⃣ Now call useForm safely
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username.."
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Email.."
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password.."
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button className="register-btn" type="submit" primary>
          Register
        </Button>
      </Form>
      {/* showing the errors on the markup i.e web browser */}
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
//write the graphql invitation. Send invitation to the server and process the users if the data is valid
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;


// import React, { useState } from "react";
// import { Form, Button } from "semantic-ui-react";
// import gql from "graphql-tag";
// import { useMutation } from "@apollo/client/react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "../util/hooks";

// const Register = () => {
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

  
//       //to extract the onchange, onsubmit from theuseForm
//   const { onChange, onSubmit, values} = useForm(registerUser, {
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   //  where the addUser is called and updated.
//   const [addUser, { loading }] = useMutation(REGISTER_USER, {
//     update(_, result) {
//       navigate("/");
//     },
//     onError(err) {
//       const errData = err.errors?.[0]?.extensions?.errors;
//       if (errData) {
//         setErrors(errData);
//       } 
//     },
//     variables: values,
//   });

//     //storing the addUser as a function for javascript to access it anywhere
//   const registerUser = () =>  addUser()
     

//   return (
//     <div className="form-container">
//       <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
//         <h1>Register</h1>
//         <label>Username</label>
//         <input
//           type="text"
//           placeholder="Username.."
//           name="username"
//           value={values.username}
//           error={errors.username ? true : false}
//           onChange={onChange}
//         />

//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="Email.."
//           name="email"
//           value={values.email}
//           error={errors.email ? true : false}
//           onChange={onChange}
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Password.."
//           name="password"
//           value={values.password}
//           error={errors.password ? true : false}
//           onChange={onChange}
//         />

//         <label>Confirm Password</label>
//         <input
//           type="password"
//           placeholder="Confirm Password.."
//           name="confirmPassword"
//           value={values.confirmPassword}
//           error={errors.confirmPassword ? true : false}
//           onChange={onChange}
//         />
//         <Button className="register-btn" type="submit" primary>
//           Register
//         </Button>
//       </Form>
//       {/* showing the errors on the markup i.e web browser */}
//       {Object.keys(errors).length > 0 && (
//         <div className="ui error message">
//           <ul className="list">
//             {Object.values(errors).map((value, index) => (
//               <li key={index}>{value}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
// //write the graphql invitation. Send invitation to the server and process the users if the data is valid
// const REGISTER_USER = gql`
//   mutation register(
//     $username: String!
//     $email: String!
//     $password: String!
//     $confirmPassword: String!
//   ) {
//     register(
//       registerInput: {
//         username: $username
//         email: $email
//         password: $password
//         confirmPassword: $confirmPassword
//       }
//     ) {
//       id
//       email
//       username
//       createdAt
//       token
//     }
//   }
// `;

// export default Register;
