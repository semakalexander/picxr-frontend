import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  container: {
    position: 'relative',
    zIndex: 999
  },
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: .6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const FullLoader = ({ classes }) => (
  <div className={classes.container}>
    <div className={classes.loader}>
      <CircularProgress size={72} />
    </div>
  </div>
);

export default withStyles(styles)(FullLoader);
