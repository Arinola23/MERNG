import React from "react";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import { GridRow, GridColumn, Grid, Image } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

const Home = () => {
    //to display the post
    const {loading, data:{getPosts: posts}} = useQuery(FETCH_POSTS_QUERY) //the query
  if(data) {
    console.log(data)
  }
  
    return (
    //  <Grid columns={3} divided> grid from semantic UI
  <Grid columns={3}>
    <GridRow>
        <h1>Recent Posts</h1>
    </GridRow>
    <GridRow>
        {loading ? (<h1>loading posts...</h1>) : (
            posts && posts.map((post) => {
                <GridColumn key={post.id}>
                    <PostCard post = {post}/>
                </GridColumn>
            })
        )}
      {/* <GridColumn>
        <Image src='/images/wireframe/media-paragraph.png' />
      </GridColumn> */}
    </GridRow>
   </Grid> 
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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

export default Home;
