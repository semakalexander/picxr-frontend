import React, { Component, createRef } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

import Dropzone from '../../components/Dropzone';
import Canvas from '../../components/Canvas';
import FullLoader from '../../components/FullLoader';


class Combiner extends Component {
  constructor(props) {
    super(props);

    this.state ={
      images: [],
      uploadProggress: {},
      isCanvasShowing: false,
      isUploading: false
    };

    this.canvas = createRef();
  }

  onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      this.setState({
        uploadProggress: acceptedFiles.reduce((o, f) => ({ ...o, [f.name]: 0 }), {}),
        isUploading: true,
        isCanvasShowing: false
      });

      Promise
        .all(acceptedFiles.map((file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onprogress = ({ lengthComputable, loaded, total }) => {
              if (lengthComputable) {
                this.setState(prev => ({
                  uploadProggress: {
                    ...prev.uploadProggress,
                    [file.name]: Math.round(loaded/total * 100)
                  }
                }));
              }
            };

            reader.onload = () => {
              resolve(reader.result);
            };

            reader.onerror = reject;

            reader.readAsDataURL(file);
          })
        ))
        .then(images => this.setState({
          images,
          isUploading: false,
          isCanvasShowing: true
        }))
        .catch(console.error);
    }
  }

  render() {
    const {
      onDrop,
      state: {
        images,
        uploadProggress,
        isCanvasShowing,
        isUploading
      }
    } = this;

    return (
      <div>
        <div>
          {
            isUploading && (<FullLoader />)
          }
          {
            isUploading ? (
                Object.keys(uploadProggress).filter(key => uploadProggress[key] < 100).map(key => (
                  <div key={key} style={{ backgroundColor: '#eee', padding: 20 }}>
                    <p>{key}</p>
                    <LinearProgress
                      key={key}
                      variant="determinate"
                      value={uploadProggress[key]}
                    />
                  </div>
                ))
            ) : (
              <Dropzone
                accept={['image/*']}
                onDrop={onDrop}
              />
            )
          }

        </div>
        {
          isCanvasShowing && (
            <Canvas imageSrcs={images} />
          )
        }
      </div>
    );
  }
}

export default Combiner;
