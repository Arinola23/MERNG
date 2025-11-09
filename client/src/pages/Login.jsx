import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});

  // 1️⃣ Define mutation first
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
   //this is a lot better
    // update(_, result) {
    //   console.log(result.data.login)
    //   navigate("/");

     update(_, {data: {login: userData}}) {
      context.login(userData)
  setTimeout(() => navigate("/"), 0); // let React update context first
    },
   onError(err) {
      const errData = err.errors?.[0]?.extensions?.errors;
      if (errData) {
        setErrors(errData);
      } 
    },
  });

   // 2️⃣ Define loginUserCallbk BEFORE useForm uses it
  const loginUserCallbk = () => {
    loginUser({ variables: values });
  };
 
  // 3️⃣ Now call useForm safely from the hook.js
  const { onChange, onSubmit, values } = useForm(loginUserCallbk, {
    username: "",
    password: "",
  });

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>LogIn</h1>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username.."
          name="username"
          value={values.username}
          error={errors.username ? true : false}
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

        
        <Button className="register-btn" type="submit" primary>
          Login
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
const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password      
    ) {
      id
      username
      createdAt
      token
    }
  }
`;

export default Login;
