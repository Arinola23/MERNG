const { ApolloServer} = require("apollo-server");
const {PubSub } = require('graphql-subscriptions')
// const gql = require( 'graphql-tag');  //graphql-tag is one of the depencecies of apollo-server.
require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
// const Post = require("./models/Post")
const resolvers = require('./graphql/resolvers');
const connectDB = require("./config/db")
connectDB()

// const typeDefs = gql`
//     type Post {
//         id: ID!
//         body: String!
//         createdAt: String!
//         username: String!
//     }
//      type Query{
//         getPosts: [Post]
//     }
//     # type Query{
//     #     SayHi: String! 
//     # }
// `
    //const resolvers = {
        // Query: {
        //      // SayHi: () => "hii girlll"
        //     async getPosts() {
        //         try {
        //             const posts = await Post.find();
        //             return posts
        //         } catch(err){
        //             throw new Error(err);
        //         }
        //     }
        // }
   // }

   const pubsub = new PubSub()

    const server = new ApolloServer({
        typeDefs,
        resolvers, 
        context: ({req}) => ({req, pubsub })
    })

    server.listen({port: 5000})
    .then(res => {
        console.log(`server running at ${res.url}`)
    })

