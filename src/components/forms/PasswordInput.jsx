import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import FormInput from './Input';

class FormPasswordInput extends Component {
  state = {
    showPassword: false
  };

  toggleShowPassword = () => this.setState(prev => ({ showPassword: !prev.showPassword }));
    
  render() {
    const {
      toggleShowPassword,
      props,
      state: { showPassword }
    } = this;

    return (
      <FormInput
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={toggleShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )}
        {...props}
      />
    );
  }
}

export default FormPasswordInput;
