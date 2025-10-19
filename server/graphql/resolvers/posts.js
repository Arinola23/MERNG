  const { subscribe } = require('graphql');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth')  
const { AuthenticationError, UserInputError} = require('apollo-server')

  module.exports = {
    Query: {
             // SayHi: () => "hii girlll"
            async getPosts() {
                try {
                    const posts = await Post.find().sort({createdAt: -1});
                    return posts
                } catch(err){
                    throw new Error(err);
                }
            },

            async getPost(_, {postId}){
                try {
                    const post = await Post.findById(postId)
                    if(post) {
                        return post;
                    } else {
                         throw new Error("post not found");
                    }
                    
                } catch(err) {
                    throw new Error(err);
                }
            }
        },

        Mutation: {
            async createPost(_, {body}, context){
                //this will run once the user passes the auth requirements from checkAuth before a post can be created by the user
                const user  = checkAuth(context)
                //  console.log(user)
                if(args.body.trim() === "") {
                    throw new Error("Post body must not be empty")
                }
                const newPost = await new Post({
                    body,
                    user: user._id,
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                const post = await newPost.save();

                //after having access to the context created, 
                context.pubsub.publish('NEW_POST', {
                    newPost: post
                })

                return post
            },

            async deletePost(_, {postId}, context) {
                const user = checkAuth(context);

                try {
                    const post = await Post.findById(postId)
                    if(user.username === post.username){
                        await post.deleteOne();
                        return 'Post deleted successfully'
                    } else {
                        throw new AuthenticationError('action not allowed')
                    }
                } catch(err) {
                    throw new Error(err);
                }
            },

            async likePost(_, {postId}, context) {
                const {username} = checkAuth(context)

                const post  = await Post.findById(postId)

                if(Post) {
                    if(post.likes.find(like => like.username === username)) {
                        // removing likes
                        post.likes = post.likes.filter(like => like.username !== username)
                        await post.save()
                    } else {
                        //adding likes
                        post.likes.push({
                            username,
                            createdAt: new Date().toISOString()
                        })
                    }

                   await post.save()
                  return post 
                } else throw new UserInputError('post not found ')  
            }
        },
        
        Subscription: {
            newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
            }
        }

       
  }