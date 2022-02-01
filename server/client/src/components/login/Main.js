import React from 'react';
import Signin from './Signin'
import Signup from './Signup'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import CreatePost from '../createPost/CreatePost';
import EditPost from '../createPost/EditPost';
import AccountMyPosts from '../account/AccountMyPosts';
function Main() {
  const history=useHistory();
  //console.log(history.location.pathname.substring(0,14));
  if(history.location.pathname.substring(0,14)==="/resetPassword"){
    //history.push("/resetPassword");
  }
  else if(localStorage.getItem("token")==null){
    history.push('/login');
  }
  else{
    //console.log(localStorage.getItem("token"));
    history.push('/home');
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/register" exact><Signup></Signup></Route>
          <Route path="/" exact><Signin></Signin></Route>
          <Route path="/login" exact><Signin></Signin></Route>
          <Route path="/home" exact ><Home></Home></Route>
          <Route path="/forgotPassword" exact><ForgotPassword></ForgotPassword></Route>
          <Route path="/resetPassword"><ResetPassword></ResetPassword></Route>
          <Route path="/users/user/createPost"><CreatePost></CreatePost></Route>
          <Route path="/posts/:id/edit"><EditPost></EditPost></Route>
          <Route path="/users/user/posts"><AccountMyPosts></AccountMyPosts></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Main;
