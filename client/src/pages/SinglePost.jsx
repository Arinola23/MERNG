import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GridRow,
  GridColumn,
  Grid,
  Image,
  Card,
  CardContent,
  CardMeta,
  CardHeader,
  CardDescription,
  Button,
  Icon,
  Label,
  Form
} from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/likeButton";
import DeleteButton from "../components/deleteButton";
import { useParams } from "react-router-dom";
 
const SinglePost = () => {
  // const postId = props.match.params.postId;
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  // console.log(postId);
const commentInputRef = useRef(null)
const [comment, setComment] = useState('')

  //this a dom v5 method
  // const { data: { getPost },} = useQuery(FETCH_POST_QUERY, {  variables: { postId },});

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });


const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    variables: {postId, body: comment},
  update(){
    setComment("")
    // this makes the input inactive after a comment is added instead of the pointer to keep blinking
    commentInputRef.current.blur()
  },
})

const getPost = data?.getPost;

  if (loading) return <p>Loading post...</p>;
  if (!getPost) return <p>Post not found</p>;


  let postMarkUp;

  if (!getPost) {
    postMarkUp = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkUp = (
      <Grid style={{marginTop: "20px", marginLeft: '50px'}}>
        <GridRow>
          <GridColumn width={2}>
            <Image
              style={{ width: "200px" }}
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </GridColumn>

          <GridColumn width={10}>
            <Card fluid>
              <CardContent>
                <CardHeader>{username}</CardHeader>
                <CardMeta>{moment(createdAt).fromNow()}</CardMeta>
                <CardDescription>{body}</CardDescription>
              </CardContent>
              <hr />

              <CardContent extra>
                <div className="ui.two.buttons">
                  <LikeButton
                    user={user}
                    id={id}
                    likeCount={likeCount}
                    likes={likes}
                  />
                  {/* <Button as="div" labelPosition="right" onClick={() => console.log('Comment on Post')}> */}
                  <Button
                    as="div"
                    labelPosition="right"
                    style={{ marginLeft: "10px", marginBottom: "5px" }}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>

                  {/* {user && user.username === username && ( 
                        <DeleteButton postId={id}  />
                        )} */}
                </div>
                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </CardContent>
            </Card>
                        {/* handling comment display, delete and adding */}
            {/* if loggedIn, to be able to post/ add comments to the post */}
            {user && (
              <Card fluid>
                <CardContent>
                  <p>Add Comment</p>
                  <Form>
                      <div className="ui action input fluid">
                        <input type="text"
                        placeholder="Add comment..."
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        ref={commentInputRef}
                        />
                        <button type="submit" 
                        className="ui button teal"
                         disabled={comment.trim() === ''}
                         onClick={submitComment}
                         >
                          Submit
                        </button>
                      </div>
                  </Form>
                </CardContent>
              </Card>
            )}
            
            {/* {} is called an expression */}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <CardContent>
                  {/* to delete comment */}
                  {user && user.username === comment.username && (<DeleteButton postId={id} commentId={comment.id}/>) }
                  <CardHeader>{comment.username}</CardHeader>
                  <CardMeta>{moment(comment.createdAt).fromNow()}</CardMeta>
                  <CardDescription>{comment.body}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }

  return postMarkUp;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body){
      id
      comments{
        id body createdAt username
      }
      commentCount
    }
  }
`

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
