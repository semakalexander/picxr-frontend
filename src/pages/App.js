import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import Cookies from 'js-cookie';

import { Switch, Route } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Users from './admin/Users';
import Combiner from './admin/Combiner';

import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

import authService from '../services/auth';


import authActions from '../redux/actions/auth';

import BackgroundImage from '../images/back.png';

import { bindActionCreators } from '../redux/utils';

import 'react-toastify/dist/ReactToastify.min.css';
import './App.scss';

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
    background: `url(${BackgroundImage})`,
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
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 8
  }
});

class App extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    const {
      props: {
        history,
        setUser
      }
    } = this;

    if (!Cookies.get('token')) {
      return this.setState({ isLoading: false }, () => history.push('/sign-in'));
    }

    authService
      .getCurrentUser()
      .then(user => {
        setUser(user);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 401) {
          Cookies.remove('token');
          history.push('/sign-in');
        }
        
        this.setState({ isLoading: false });
      })
  }

  render() {
    const {
      props: {
        classes
      },
      state: {
        isLoading
      }
    } = this;
    
    return isLoading ? (
      <div className={classes.loaderContainer}>
        <CircularProgress />
      </div>
    ) : (
      <div>
        <Header />

        <LeftSidebar />
        <RightSidebar />

        <Switch>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/admin/users" component={Users} />
          <Route path="/admin/combiner" component={Combiner} />
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

const mapDispatchToProps = dispatch => bindActionCreators({
  setUser: authActions.setUser
});


export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(App);
