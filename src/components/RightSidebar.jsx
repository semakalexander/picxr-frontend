import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import FaceIcon from '@material-ui/icons/Face';
import InfoIcon from '@material-ui/icons/Info';
import ExitIcon from '@material-ui/icons/ExitToApp';

import commonActions from '../redux/actions/common';

import authService from '../services/auth';

import { bindActionCreators } from '../redux/utils';

const listItems = {
  admin: [
    {
      text: 'Account Info',
      link: '/account',
      icon: <FaceIcon />
    },
    {
      text: 'Settings',
      link: '/account/settings',
      icon: <InfoIcon />
    }
  ]
}

const styles = {
  list: {
    width: 250
  },
  listItemLink: {
    color: 'inherit',
    textDecoration: 'none'
  }
};

class RightSidebar extends Component {    
  signOut = () => {
    const {
      props: {
        closeRightSidebar,
        signOut
      }
    } = this;

    closeRightSidebar();
    signOut();
  }

  render() {
    const {
      signOut,
      props: {
        isRightSidebarOpen,
        closeRightSidebar,
        classes
      }
    } = this;

    return (
      <Drawer anchor="right" open={isRightSidebarOpen} onClose={closeRightSidebar}>
        <List className={classes.list}>
          <ListSubheader>Admin</ListSubheader>
            {
              listItems.admin.map(item => (
                <div key={item.text} onClick={closeRightSidebar}>
                  <Link
                    to={item.link}
                    className={classes.listItemLink}
                  >
                    <ListItem button>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </Link>
                </div>
              ))
            }

            <Divider />

            <div onClick={signOut}>
              <Link
                to="/sign-in"
                className={classes.listItemLink}
              >
                <ListItem button>
                  <ListItemIcon><ExitIcon /></ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItem>
              </Link>
            </div>
          </List>
        </Drawer>
    );
  }
}

RightSidebar.propTypes = {
  isRightSidebarOpen: bool,
  closeRightSidebar: func,
  signOut: func
};

const mapStateToProps = ({ common: { isRightSidebarOpen } }) => ({ isRightSidebarOpen });

const mapDispatchToProps = bindActionCreators({
  closeRightSidebar: commonActions.closeRightSidebar,
  signOut: authService.signOut
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(RightSidebar);
