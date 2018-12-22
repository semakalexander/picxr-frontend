import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const FormInput = ({ name, label, value, error, handleChange, ...options }) => (
  <FormControl margin="normal" error={!!error} required fullWidth>
    {label && (<InputLabel htmlFor={name}>{label}</InputLabel>)}
    <Input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={e => handleChange(name, e.target.value)}
      {...options}
    />
    {!!error && (<FormHelperText id={`${name}-error-text`}>{error}</FormHelperText>)}
  </FormControl>
);

export default FormInput;