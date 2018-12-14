import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import SignUp from './pages/auth/SignUp';

import TinyBack from './images/back-tiny.jpg'

import './App.css';

const styles = theme => ({
  backgroundContainer: {
    overflow: 'hidden',
    position: 'absolute',
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
        <SignUp />
        <div className={classes.backgroundContainer}>
          <div className={classes.background}></div>
        </div>
      </div> 
    );
  }
}

export default withStyles(styles)(App);
