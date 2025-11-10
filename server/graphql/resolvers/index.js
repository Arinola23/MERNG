//combine post and users resolvers here
const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');

// Post: Defines field resolvers for the Post type — these automatically calculate extra properties (likeCount, commentCount) whenever a post is fetched.
// Query: Merges all the query resolvers from the posts.js file.
// Mutation: Combines all the mutations (user registration, create post, delete post, comment, etc.).
// Subscription: Adds real-time resolvers (like “new post added”).

// So, when Apollo executes your schema, it looks here index.js to find the resolver for any query/mutation.

module.exports = {
    //post modifier
    Post: {
        // likeCount(parent) {
        //     console.log(parent)
        //     return parent.likes.length
        // },
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },

    Query: {
        ...postResolvers.Query 
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    },

    Subscription: {
        ...postResolvers.Subscription
    }
}