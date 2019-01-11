import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';

import { bindActionCreators } from '../redux/utils';

import authService from '../services/auth';

import commonActions from '../redux/actions/common';

const styles = {
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  iconText: {
    marginLeft: 8
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  settingsContainer: {
    marginLeft: 4
  }
};

class AccountMenu extends Component { 
  render() {
    const {
      props: {
        classes,
        auth,
        openRightSidebar
      },
    } = this;

    return (
      <div className={classes.infoContainer}>
        <div className={classes.nameContainer}>
          <FaceIcon />
          <span className={classes.iconText}>{auth.user.username}</span>
        </div>
        
        <div
          className={classes.settingsContainer}
          onClick={openRightSidebar}
        >
          <Button><SettingsIcon /></Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = bindActionCreators({
  signOut: authService.signOut,
  openRightSidebar: commonActions.openRightSidebar
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountMenu);
