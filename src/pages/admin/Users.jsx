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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteIcon from '@material-ui/icons/Delete';

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
  },
  noRecordsContainer: {
    marginTop: theme.spacing.unit * 6
  }
});

class Users extends Component {
  state = {
    isUsersLoading: true,
    users: [],
    page: 0,
    perPage: 5,
    count: 0,
    isDeleteDialogOpen: false,
    preparedItem: null
  };
    
  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    const {
      handleError,
      state: {
        page,
        perPage
      }
    } = this;

    this.setState({ isUsersLoading: true });

    userService
      .getAllUsers({ page, perPage })
      .then(({ count, users }) => this.setState({ count, users, isUsersLoading: false }))
      .catch(error => handleError(error, () => this.setState({ isUsersLoading: false })));
  }

  handlePageChange = (e, page) => this.setState({ page }, this.loadUsers);

  handlePerPageChange = e => this.setState({ page: 0, perPage: e.target.value }, this.loadUsers);

  prepareForDelete = preparedItem => () =>
    this.setState({
      isDeleteDialogOpen: true,
      preparedItem
    });
  
  closeDeleteDialog = () => this.setState({ isDeleteDialogOpen: false });

  deletePreparedItem = () => {
    const {
      handleError,
      state: {
        preparedItem
      }
    } = this;

    userService
      .remove(preparedItem._id)
      .then(() => this.setState({
        isDeleteDialogOpen: false,
        preparedItem: null
      }))
      .catch(handleError);
  }

  handleError = (error, cb) => {
    console.log({...error});
    notifications.error(<pre>{JSON.stringify(error.response.data, null, 2)}</pre>);

    if (cb && typeof cb === 'function') cb();
  }

  render() {
    const {
      handlePageChange,
      handlePerPageChange,
      prepareForDelete,
      closeDeleteDialog,
      deletePreparedItem,
      props: {
        classes
      },
      state: {
        isUsersLoading,
        users,
        page,
        perPage,
        count,
        isDeleteDialogOpen
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
              !isUsersLoading && (!!users.length ? (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Email address</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        users.map(u => (
                          <TableRow key={u._id}>
                            <TableCell>{u.username}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>
                              <DeleteIcon className="icon" onClick={prepareForDelete(u)}/>
                            </TableCell>
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
              ) : (
                <div className={classes.noRecordsContainer}>No records yet.</div>
              ))
            }
          </Paper>

          <Dialog
            open={isDeleteDialogOpen}
            onClose={closeDeleteDialog}
          >
            <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This action can not be undone. Be sure that you want to do it.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog} autoFocus>Cancel</Button>
              <Button onClick={deletePreparedItem} color="primary">Yes, I am sure. Delete it.</Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}

export default withStyles(styles)(Users);
