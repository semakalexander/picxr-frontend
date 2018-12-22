import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

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

const listItems = [
  {
    text: 'Users',
    icon: <FaceIcon />
  },
  {
    text: 'Complaints',
    icon: <InfoIcon />
  },
  {
    text: 'Bugs',
    icon: <BugReportIcon />
  },
  {
    text: 'Feedbacks',
    icon: <FeedbackIcon />
  }
];

const styles = {
  list: {
    width: 250
  }
};

class Sidebar extends Component {    
  render() {
    const {
      props: {
        isDrawerOpen,
        toggleDrawer,
        classes
      }
    } = this;

    return (
      <div>
        <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
          <List className={classes.list}>
            <ListSubheader>Admin</ListSubheader>
            {
              listItems.map(item => (
                <ListItem button key={item.text}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
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
  toggleDrawer: func,
};

const mapStateToProps = ({ common: { isDrawerOpen } }) => ({ isDrawerOpen });

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(commonActions.toggleDrawer())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
