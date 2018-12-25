import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = {
  buttonLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
  button: {
    textTransform: 'none'
  }
}

const ButtonLink = ({ classes, to, label, children, linkProps = {}, buttonProps = {} }) => (
  <Link to={to} className={classes.buttonLink} {...linkProps}>
    <Button color="inherit" className={classes.button} {...buttonProps}>{label || children}</Button>
  </Link>
);

export default withStyles(styles)(ButtonLink);
