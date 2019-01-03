import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import userService from '../../services/users';

import notifications from '../../utilities/notifications';  

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 6,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 6
  }
});

class Users extends Component {
  state = {
    isUsersLoading: true,
    users: [],
    page: 0,
    perPage: 10,
    count: 0
  };
    
  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    const {
      state: {
        page,
        perPage
      }
    } = this;

    this.setState({ isUsersLoading: true });

    setTimeout(() => {
      userService
      .getAllUsers({ page, perPage })
      .then(({ count, users }) => this.setState({ count, users, isUsersLoading: false }))
      .catch(error => {
        console.log({...error});
        notifications.error(<pre>{JSON.stringify(error.response.data, null, 2)}</pre>)
      });
    }, 2000);
  }

  handlePageChange = (e, page) => this.setState({ page }, this.loadUsers);

  handlePerPageChange = e => this.setState({ page: 0, perPage: e.target.value }, this.loadUsers);

  render() {
    const {
      handlePageChange,
      handlePerPageChange,
      props: {
        classes
      },
      state: {
        isUsersLoading,
        users,
        page,
        perPage,
        count
      }
    } = this;

    return (
         <div className={classes.main}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">Users</Typography>
            
            {
              isUsersLoading && (
                <div className={classes.loaderContainer}>
                  <CircularProgress />
                </div>
              )
            }
            
            {
              !!users.length && (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Email address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        users.map(u => (
                          <TableRow key={u._id}>
                            <TableCell>{u.username}</TableCell>
                            <TableCell>{u.email}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={count}
                    page={page}
                    rowsPerPage={perPage}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerPageChange}
                  />
                </>
              )
            }
          </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(Users);
