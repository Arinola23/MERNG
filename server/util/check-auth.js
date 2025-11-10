const jwt = require('jsonwebtoken')
//process.env.secret_key
const { AuthenticationError} = require('apollo-server')

// The client sends a GraphQL request with a header :Apollo adds this header to context.req.headers.
// Your resolver gets context → passes it into checkAuth(context).
// checkAuth reads the token → verifies it → returns the user.
// Now your resolver knows who is making the request.
// That’s how this line works: const user = checkAuth(context); from ln: 64, posts.js, resolvers

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
            //Bearer
        const token = authHeader.split('Bearer ')[1];
            if(token){
                try{
                    const user = jwt.verify(token, process.env.SECRET_KEY)
                    return user
                } catch (err) {
                    throw new AuthenticationError('Invalid/Xpired Token')
                }
            }
                throw new Error('Authentication token must be \'Bearer [token]')
    } 
    throw new Error('Authorization header must be provided')
}
