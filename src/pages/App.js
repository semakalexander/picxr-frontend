import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import { withStyles } from '@material-ui/core/styles';

import { ToastContainer } from 'react-toastify';

import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Users from './admin/Users';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import TinyBack from '../images/back-tiny.jpg'

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

const styles = theme => ({
  backgroundContainer: {
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -999
  },
  background: {
    background: `url(${TinyBack})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(15px)',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -999,
    margin: -10,
    overflow: 'hidden',
    position: 'absolute',
    transform: 'scale(1.1)'
  }
});

class App extends Component {
  render() {
    const {
      props: {
        classes
      }
    } = this;
    
    return (
      <div>
        <Header />

        <Sidebar />

        <Switch>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/admin/users" component={Users} />
        </Switch>

        <ToastContainer
          position="top-right"
          autoClose={3000}
        />
        
        <div className={classes.backgroundContainer}>
          <div className={classes.background}></div>
        </div>
      </div> 
    );
  }
}

export default withStyles(styles)(App);
