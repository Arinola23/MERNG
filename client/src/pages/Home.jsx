import React , { useContext } from "react";
import { useQuery,  } from "@apollo/client/react";

// import gql from "graphql-tag";
import { GridRow, GridColumn, Grid, Image, TransitionGroup } from 'semantic-ui-react'

import PostCard from '../components/PostCard'
import PostForm from "../components/PostForm"
import { AuthContext } from "../context/auth";

import { FETCH_POSTS_QUERY } from "../util/graphQL";

//it was moved to another folder for it to be accessible elsewhere
// const FETCH_POSTS_QUERY = gql`
//   {
//     getPosts {
//       id
//       body
//       createdAt
//       username
//       likeCount
//       likes {
//         username
//       }
//       commentCount
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//     }
//   }
// `;

const Home = () => {
    //to display the post
    const {loading, data} = useQuery(FETCH_POSTS_QUERY) //the query
        const {user} = useContext(AuthContext)

    // if(data) {
  //   console.log(data)
  // }
  // optional chaining avoids destructuring from undefined
  const posts = data?.getPosts;

  if (loading) return <h1>Loading posts...</h1>;

    return (
     
      <Grid columns={3}>
      <GridRow className="page-title">
        <h1>Recent Posts</h1>
      </GridRow>
      <GridRow>

        {user && (
          <GridColumn>
            <PostForm/>
          </GridColumn>
        )}

        <TransitionGroup>
          {posts &&
          posts.map((post) => (
            <GridColumn key={post.id} style={{marginBottom: 20}}>
              <PostCard post={post} />
            </GridColumn>
          ))}
        </TransitionGroup>
      </GridRow>
    </Grid>
    //  <Grid columns={3} divided> grid from semantic UI
  // <Grid columns={3}>
  //   <GridRow>
  //       <h1>Recent Posts</h1>
  //   </GridRow>
  //   <GridRow>
  //       {loading ? (<h1>loading posts...</h1>) : (
  //           posts && posts.map((post) => {
  //               <GridColumn key={post.id}>
  //                   <PostCard post = {post}/>
  //               </GridColumn>
  //           })
  //       )}
  //     {/* <GridColumn>
  //       <Image src='/images/wireframe/media-paragraph.png' />
  //     </GridColumn> */}
  //   </GridRow>
  //  </Grid> 
  );
};



export default Home;
