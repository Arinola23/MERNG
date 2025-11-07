import React, {useState, useEffect} from 'react'
import { Link }  from "react-router-dom"
import { useMutation } from '@apollo/client/react'
import gql from 'graphql-tag'
import { Button, Icon, Label} from "semantic-ui-react"

import LikeDisplay from './LikeDisplay'
import MyPopup from '../util/MyPopup'

const LikeButton = ( {user, id, likes, likeCount}) => {
   const [liked, setLiked] = useState(false)
   

    // Use optional chaining or guard before .find() to prevent likes from returning undefined before finding.
    useEffect(() => {
        if(user && likes?.find(like => like.username === user.username)){
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])
    
    const [ likePost ] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId : id},
    } )
            // console.log("Sending postId:", id)


    const likeButtonIcon = user ? (
        liked ? (
            <Button color="teal" >
              <Icon name="heart" />
                Like
           </Button> 
           ) : (
             <Button color="teal" basic>
              <Icon name="heart" />
           </Button>
           )
    ) : (
         <Button as={Link} to='/login' color="teal" basic>
              <Icon name="heart" />
           </Button>
    )

    return (
    <div>
      <Button as="div" labelPosition="right" onClick={likePost} style={{marginBottom: "5px"}}>
         {/* hard coded liked button */}
          {/* <Button color="teal" basic>
            <Icon name="heart" />
            Like
          </Button> */}
          <MyPopup content={liked ? "Unlike": "Like"}>
                {likeButtonIcon}
          </MyPopup>
          <Label as="a" basic color="teal" pointing="left" >
            {likeCount}
          </Label>
        </Button>

          {/* to handle list of users that liked the post */}
            <LikeDisplay likes={likes}/>

        {/* {likes && likes.length > 0 && (
          <p style={{ marginTop: "2px", marginBottom: "8px" }}>
            <strong>Liked by:</strong>{" "}
            {likes
              .slice(0, 3)
              //  .slice(0, 2)
              .map((like) => like.username)
              .join(", ")}
            {likes.length > 3 && " and others"}
          </p>
        )} */}
    </div>
  )
}

const LIKE_POST_MUTATION = gql `
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes {
                id 
                username
            }
            likeCount
        }
    }
`

export default LikeButton
