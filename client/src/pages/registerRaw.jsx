import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../util/hooks";

const Register = (props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  
      //to extract the onchange, onsubmit from theuseForm
  const { onChange, onSubmit, values} = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

          //it has been stored in a custom hook for multiple access, coding repetition prevention.
          // const [values, setValues] = useState({
          //   username: "",
          //   email: "",
          //   password: "",
          //   confirmPassword: "",
          // });
          //it has been stored in a custom hook for multiple access, coding repetition prevention.
          // const onChange = (e) => {
          //   setValues({ ...values, [e.target.name]: e.target.value });
          // };
  //  where the add addUser is called and updated.
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // update(proxy, result) {
    update(_, result) {
      console.log(result); //update gets triggered if the mutation is successfully executed.
      // props.history.push('/') outdated
      navigate("/");
    },
    onError(err) {
      //this shows the structure and tracks where the extension errors is stored.
      // console.log("Full Apollo error:", JSON.stringify(err, null, 2));
      console.log("GraphQL error caught:", err);
      const errData = err.errors?.[0]?.extensions?.errors;
      if (errData) {
        console.log("Validation error:", errData);
        setErrors(errData);
      } else {
        console.error("Unexpected error format:", err);
      }
    },
    variables: values,
  });

    //storing the addUser as a function for javascript to access it anywhere
  const registerUser = () =>  addUser()
          //it has been stored in a custom hook for multiple access, coding repetition prevention.
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   addUser();
  // };

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

import React, { useContext, useState } from "react";
import { Card, Button, Icon, Modal, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const PostCard = ({ post }) => {
  const { id, likes, likeCount, username } = post;
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const liked = user && likes.find((like) => like.username === user.username);

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        {likeButton}

        <Button
          basic
          color="blue"
          size="tiny"
          onClick={() => setOpen(true)}
          style={{ marginLeft: "10px" }}
        >
          {likeCount} {likeCount === 1 ? "Like" : "Likes"}
        </Button>

        <Modal open={open} onClose={() => setOpen(false)} size="mini">
          <Modal.Header>Liked by</Modal.Header>
          <Modal.Content>
            {likes.length > 0 ? (
              <List divided relaxed>
                {likes.map((like) => (
                  <List.Item key={like.id}>
                    <Icon name="user" color="teal" />
                    <List.Content>
                      <List.Header>{like.username}</List.Header>
                      <List.Description>
                        {new Date(like.createdAt).toLocaleString()}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            ) : (
              <p>No likes yet</p>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)} color="teal">
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Card.Content>
    </Card>
  );
};

export default PostCard;

import React, { useContext } from "react";
import { Card, Button, Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const PostCard = ({ post }) => {
  const { id, likes, likeCount, username } = post;
  const { user } = useContext(AuthContext);

  const liked = user && likes.find((like) => like.username === user.username);

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        {likeButton}
        <Popup
          content={
            likes.length > 0
              ? likes.map((like) => like.username).join(", ")
              : "No likes yet"
          }
          trigger={
            <span style={{ marginLeft: "10px", cursor: "pointer" }}>
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </span>
          }
        />
      </Card.Content>
    </Card>
  );
};

export default PostCard;
