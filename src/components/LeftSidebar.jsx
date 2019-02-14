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
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';

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
      text: 'Images',
      link: '/admin/combiner',
      icon: <PhotoAlbumIcon />
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
        isLeftSidebarOpen,
        closeLeftSidebar,
        classes
      }
    } = this;

    return (
      <Drawer open={isLeftSidebarOpen} onClose={closeLeftSidebar}>
        <List className={classes.list}>
          <ListSubheader>Admin</ListSubheader>
            {
              listItems.admin.map(item => (
                <div key={item.text} onClick={closeLeftSidebar}>
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
    );
  }
}

Sidebar.propTypes = {
  isLeftSidebarOpen: bool,
  closeDrawer: func,
};

const mapStateToProps = ({ common: { isLeftSidebarOpen } }) => ({ isLeftSidebarOpen });

const mapDispatchToProps = bindActionCreators({
  closeLeftSidebar: commonActions.closeLeftSidebar
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
