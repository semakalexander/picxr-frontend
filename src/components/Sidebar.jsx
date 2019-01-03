import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import FaceIcon from '@material-ui/icons/Face';
import InfoIcon from '@material-ui/icons/Info';
import BugReportIcon from '@material-ui/icons/BugReport';
import FeedbackIcon from '@material-ui/icons/Feedback';

import commonActions from '../redux/actions/common';

import { bindActionCreators } from '../redux/utils';

const listItems = {
  admin: [
    {
      text: 'Users',
      link: '/admin/users',
      icon: <FaceIcon />
    },
    {
      text: 'Complaints',
      link: '/admin/complaints',
      icon: <InfoIcon />
    },
    {
      text: 'Bugs',
      link: '/admin/bugs',
      icon: <BugReportIcon />
    },
    {
      text: 'Feedbacks',
      link: '/admin/feedbacks',
      icon: <FeedbackIcon />
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

class Sidebar extends Component {    
  render() {
    const {
      props: {
        isDrawerOpen,
        closeDrawer,
        classes
      }
    } = this;

    return (
      <div>
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <List className={classes.list}>
            <ListSubheader>Admin</ListSubheader>
            {
              listItems.admin.map(item => (
                <div key={item.text} onClick={closeDrawer}>
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
          </List>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  isDrawerOpen: bool,
  closeDrawer: func,
};

const mapStateToProps = ({ common: { isDrawerOpen } }) => ({ isDrawerOpen });

const mapDispatchToProps = bindActionCreators({
  closeDrawer: commonActions.closeDrawer
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
