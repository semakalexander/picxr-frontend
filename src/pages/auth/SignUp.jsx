import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/LockOutlined';

import FormInput from '../../components/forms/Input';
import FormPasswordInput from '../../components/forms/PasswordInput';

import LinearProgress from '@material-ui/core/LinearProgress';


import authService from '../../services/auth';

import styles from './authStyles';

class SignUp extends Component {
  state = {
    model: {
      email: '',
      username: '',
      password: ''
    },
    error: {},
    isLoading: false
  };

  handleChange = (key, value) => 
    this.setState(prev => ({
      model: {
        ...prev.model,
        [key]: value
      }
    }));

  handleSubmit = e => {
    e.preventDefault();

    const {
      props: {
        signUp,
        history
      },
      state: {
        model
      }
    } = this;

    this.setState({ error: {}, isLoading: true });

    signUp(model)
      .then(() => history.push('/'))
      .catch(res => {
        this.setState({ error: res.response.data.error, isLoading: false });
      });
  }

  goToSignIn = () => this.props.history.push('/sign-in');
    
  render() {
    const {
      handleChange,
      handleSubmit,
      goToSignIn,
      props: {
        classes
      },
      state: {
        model: {
          email,
          username,
          password
        },
        error,
        isLoading
      }
    } = this;

    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormInput
              name="email"
              type="email"
              label="Email Address"
              value={email}
              error={error.email}
              handleChange={handleChange}
              autoComplete="email"
              autoFocus
            />

            <FormInput
              name="username"
              label="Username"
              value={username}
              error={error.username}
              handleChange={handleChange}
            />

            <FormPasswordInput
              value={password}
              error={error.password}
              handleChange={handleChange}
            />

            {
              isLoading && (<LinearProgress />)
            }
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
            >
              Sign up
            </Button>

            <div className={classes.redirectContainer}>
              <Button 
                size="small" 
                onClick={goToSignIn} 
                className={classes.redirectButton}
              >
                Already have an accout?
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: model => dispatch(authService.signUp(model))
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignUp));
