import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import  AuthRoute  from './util/AuthRoute'

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from  './pages/SinglePost'

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
            <MenuBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthRoute element={<Login />} />} />
              <Route path="/register" element={<AuthRoute element={<Register />} />} />
              <Route path="/post/:postId" element={<SinglePost/>}/>
            </Routes>

            {/* <Routes>
              <Route path="/" element={<Home />} />
              <AuthRoute path="/login" element={<Login />} />
              <AuthRoute path="/register" element={<Register />} />
            </Routes> */}
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
