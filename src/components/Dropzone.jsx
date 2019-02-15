import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ReactDropzone from 'react-dropzone';

const styles = {
  container: {
    height: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    margin: 20,
    opacity: .6,
    border: '2px dashed #111',
    cursor: 'pointer',
    '&:hover': {
      opacity: .9
    }
  }
};

const Dropzone = ({ classes,...props }) => {
  return (
    <ReactDropzone {...props}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div
            {...getRootProps()}
            className={classes.container}
          >
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop files here...</p> :
                <p>Try dropping some files here, or click to select files to upload.</p>
            }
          </div>
        )
      }}
    </ReactDropzone>
  )
};

export default withStyles(styles)(Dropzone);
