import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import LogoIcon from '../images/logo.svg';

import ButtonLink from './ButtonLink';

import commonActions from '../redux/actions/common'
import AccountMenu from './AccountMenu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logoText: {
    marginLeft: 6,
    fontFamily: `'Acme', sans-serif`,
    fontSize: 26,
    textTransform: 'none'
  }
};

class Header extends Component {
  state = {};
    
  render() {
    const {
      props: {
        classes,
        auth,
        toggleLeftSidebar
      }
    } = this;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {
              !!auth.user && (
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleLeftSidebar}>
                  <MenuIcon />
                </IconButton>
              ) 
            }
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <ButtonLink to="/">
                <img alt="logo" src={LogoIcon} width="28" />
                <span className={classes.logoText}>picxr</span>
              </ButtonLink>
            </Typography>
            {
              !auth.user ? (
                <>
                  <ButtonLink to="/sign-in">Sign In</ButtonLink>
                  <ButtonLink to="/sign-up">Sign Up</ButtonLink>
                </>
              ) : (
                <AccountMenu />
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  toggleLeftSidebar: () => dispatch(commonActions.toggleLeftSidebar())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));
