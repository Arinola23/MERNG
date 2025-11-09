import React, { useContext } from "react";
import {
  CardMeta,
  CardHeader,
  CardGroup,
  CardDescription,
  CardContent,
  Button,
  Card,
  Icon,
  Label,
  Image,
  // Popup
} from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./likeButton";
import DeleteButton from "./deleteButton";
import MyPopup from "../util/MyPopup";

const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    comments,
    likes,
  },
}) => {
  const { user } = useContext(AuthContext);

  // const likePost = () => console.log("liked post");
  // const commentOnPost = () => console.log("comment on post")

  return (
    <Card fliud>
      <CardContent>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        {/* <Link to={`/post/${id}`}>
                <CardHeader>{username}</CardHeader>
        </Link> */}
        <CardHeader>{username}</CardHeader>

        {/* like an hour ago/ 5 hours ago and the likes */}
        {/*  add true to the fromNow to remove the ago   <CardMeta>{moment(createdAt).fromNow()}</CardMeta>   */}
        {/* time since post */}
        <CardMeta as={Link} to={`/${id}`}>
          {moment(createdAt).fromNow(true)}
        </CardMeta>
        <CardDescription>{body}</CardDescription>
      </CardContent>

      <CardContent extra>
        {/* <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div> */}

        <div className="ui.two.buttons">
          {/* <div className="ui two buttons"> */}
          {/* like button */}
          <LikeButton user={user} id={id} likeCount={likeCount} likes={likes} />
          {/* link users to the id of the post */}
          {/* <Button  labelPosition="right" as={Link} to={`/post/${id}`} onClick={commentOnPost}> */}
          <MyPopup content="Comment on post">   
          <Link to={`/post/${id}`}>
            <Button as="div" labelPosition="right" style={{marginLeft: '10px', marginBottom: '5px'}}>
              <Button color="teal" basic>
                <Icon name="comments" />
              </Button>
              <Label as="a" basic color="teal" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </Link>
          </MyPopup>   
        </div>
         {/* To delete, if the user is the same as the user that posted it, allow delete */}
          {user && user.username === username && <DeleteButton postId={id} />}
      </CardContent>
    </Card>
  );
};

export default PostCard;
