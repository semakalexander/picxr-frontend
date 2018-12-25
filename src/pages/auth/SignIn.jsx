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

import authService from '../../services/auth';

import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './authStyles';

class SignIn extends Component {
  state = {
    model: {
      emailOrUsername: '',
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
        signIn,
        history
      },
      state: {
        model
      }
    } = this;

    this.setState({ error: {}, isLoading: true });

    signIn(model)
      .then(() => history.push('/'))
      .catch(res => {
        this.setState({ error: res.response.data.error, isLoading: false });
      });
  }

  goToSignUp = () => this.props.history.push('/sign-up');
    
  render() {
    const {
      handleChange,
      handleSubmit,
      goToSignUp,
      props: {
        classes
      },
      state: {
        model: {
          emailOrUsername,
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
            Sign in
          </Typography>
          
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormInput
              name="emailOrUsername"
              type="text"
              label="Email address or username"
              value={emailOrUsername}
              error={error.emailOrUsername}
              handleChange={handleChange}
              autoFocus
            />

            <FormPasswordInput
              value={password}
              error={error.password}
              handleChange={handleChange}
            />
            
            <div className={classes.loaderContainer}>
              {isLoading && (<LinearProgress />)}
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
            >
              Sign in
            </Button>

            <div className={classes.redirectContainer}>
              <Button 
                size="small"
                className={classes.redirectButton}
                onClick={goToSignUp}
              >
                Have no account yet?
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: model => dispatch(authService.signIn(model))
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignIn));
