import React from 'react'
// import { Card, Icon, Label } from semantic-ui-react
import { CardMeta, CardHeader, CardGroup, CardDescription, CardContent, Button, Card, Image } from 'semantic-ui-react'
import moment from 'moment'

const PostCard = ({post: { body, createdAt, id, username, likeCount, commentCount, comments, likes}}) => {
    
  return (
    <Card>
        <CardContent>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <CardHeader>{username}</CardHeader>
                {/* like an hour ago/ 5 hours ago and the likes */}
        <CardMeta>{moment(createdAt).fromNow()}</CardMeta>  
        <CardDescription>
                {body}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard
