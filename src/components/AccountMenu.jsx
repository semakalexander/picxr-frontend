import React from 'react';
import { connect } from 'react-redux';

const AccountMenu = ({ auth }) => (
  <div>
    <p>{auth.user.username}</p>
  </div>
);

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(AccountMenu);
