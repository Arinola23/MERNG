import React, { createContext, useReducer } from 'react'
import   { jwtDecode } from "jwt-decode" ;

const initialState = {user: null}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"))
       // check if token has expired
    if( decodedToken.exp * 1000 < Date.now()){
            localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

//reducer takes the state and manage it.
function authReducer(state, action){
    //the cases are supposed to be in a variable but since it is just two it isn't.
    //when we login, we spread through the existing state, and want to add the user because we are login and getting some data and set our user in this state to this data. i.e user = action payload
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }    
            //after loging out, the user is set to null.
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }    
        default:
            return state;
    }
}
//this reducer will be used in the auth provider. The useReducer takes state and dispatch and calls the authReducer.

function AuthProvider(props){
    // const [state, dispatch] = useReducer(authReducer, {user: null})
       const [state, dispatch] = useReducer(authReducer, initialState)
    //the login takes data and dispatch action
    const login = (userData) => {
        localStorage.setItem("jwtToken", userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem('jwtToken')
        dispatch({type: 'LOGOUT' })  //It doesn't have any payload because thats how logiut works.
    }
        //return the provider so it can be used somewhere else
    return (
        < AuthContext.Provider
            value = {{ user: state.user, login, logout }}
            {...props} //spreading through the props because we might get some props from the top down component.
        />
    ) 
}
        //when we login i.e login function, the authContext is updated notifying our app that a user is loggedIn.
        //import the authProvider to the app.jsx, wrap it around our app. So  that other components in the app can have access to the auth provider.
export { AuthContext, AuthProvider }
