const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const {UserInputError} = require('apollo-server')

const {validateRegisterInput, validateLoginInput} = require('../../util/validators')
const User = require('../../models/User');

const generateToken = (user) => {
    return jwt.sign({  //allows users to have access to a page for a certain period of time instead having to loggin every time. 
                                        // A JWT is like a digital ID card for a user after they log in.
                id: user._id,
                email: user.email,
                username: user.username
            },
            process.env.SECRET_KEY, 
            {expiresIn: '5hr'}
        )
}

module.exports = {
    Mutation: {

        async login(_, {username, password}) {
            const {valid, errors} = validateLoginInput(username, password)

            if(!valid) {
                    throw new UserInputError('Errors', { errors })
                }
            const user = await User.findOne({username})

            if(!user) {
                errors.general = "User not found"
                throw new UserInputError('User not found', {errors})
            }
            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                errors.general = "Incorrect password"
                throw new UserInputError("Incorrect password", {errors})
            }

            const token = generateToken(user)

             return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        // register(_, args, con\text, info) {
           async register(
            _, //the parent will remain here so it can be used to access the args which are the username, password etc
            {
                registerInput: {username, email, password, confirmPassword}
            }, 
        ) {
            //validate user data
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
                if(!valid) {
                    throw new UserInputError('Errors', { errors })
                }

            //make sure user doesn't already exist
            const user = await User.findOne({username});
            if(user) {
                throw new UserInputError("username is Taken", {
                    errors: {
                        usename: 'This username is taken' //will be used to display errors on the form on the frontend
                    }
                })
            }
            
            //hash password and create an auth token
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            //Create user instance
            const newUser = new User({
                email,
                username,
                password: hashedPassword,
                createdAt: new Date().toISOString()
            })

            //Save to database
            const res = await newUser.save();

            //Generate token (add your secret key)

            const token = generateToken(res)

            //token stored in a function to be accessible anywhere
            // const token = jwt.sign({  //allows users to have access to a page for a certain period of time instead having to loggin every time. 
            //                             // A JWT is like a digital ID card for a user after they log in.
            //     id: res.id,
            //     email: res.email,
            //     username: res.username
            // },process.env.SECRET_KEY, {expiresIn: '1hr'})


            //Return data (optional structure)
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}

