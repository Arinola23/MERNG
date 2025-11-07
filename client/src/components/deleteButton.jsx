import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client/react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import { FETCH_POSTS_QUERY } from "../util/graphQL";
import MyPopup from "../util/MyPopup";


const DeleteButton = ({ postId, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
  // const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    const [deletePostOrMutation] = useMutation(mutation, { 
   variables: { postId, commentId },   
           //  TODO remove post from cache
    refetchQueries: !commentId ? [{ query: FETCH_POSTS_QUERY }] : [],
    awaitRefetchQueries: true,
    update() {
          setConfirmOpen(false);
      //update(proxy) In Apollo Client, the proxy (also called the cache proxy) is an object that represents Apollo’s local cache — it gives you direct access to the GraphQL data stored in memory on the client side.
     if(!commentId) {
              navigate("/");
     }
    },
       
  });

  return (
    <div>
      <MyPopup content={commentId ? "Delete Comment" : 'Delete Post'}>
           <Button
        as="div"
        color="red"
        floated="right"
        // onClick={() => console.log("Delete Post")}
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash " style={{ margin: 0 }} />
      </Button>
      </MyPopup>
      
       
      
    
      {/* to confirm delete, instead of auto delete */}
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        // confirming yes
        onConfirm={deletePostOrMutation}
      />
    </div>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId:$postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default DeleteButton;
