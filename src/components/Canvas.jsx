import React, { Component, createRef } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Slider from 'rc-slider';

import notifications from '../utilities/notifications';

import combinerService from '../services/combiner';

const styles = {
  container: {
    overflow: 'hidden'
  },
  canvas: {
    display: 'none'
  },
  img: {
    cursor: 'pointer'
  },
  sliderContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: '40px 20px'
  },
};

const isExist = v => typeof v !== 'undefined';

const toChunks = dimension => arr => [...new Array(Math.ceil(arr.length / dimension))].reduce(({ chunks, i }) => ({
  chunks: [...chunks, arr.slice(i, i + dimension).filter(isExist)],
  i: i + dimension
}), { chunks: [], i: 0 }).chunks;


class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasSize: this.reComputeCanvasSize(),
      resultUri: null,
      resultBlob: null,
      dimension: 2
    };

    this.canvas = createRef();
  }

  componentDidMount() {
    this.draw(this.props.imageSrcs);
  }

  reComputeCanvasSize = () => ({
    width: window.innerWidth - 6,
    height: window.innerHeight - 70
  });

  computeImgSize = (img, { type = 'half' } = {}) => {
    if (!img) return null;

    const {
      state: {
        canvasSize,
        dimension
      }
    } = this;

    switch(type) {
      case 'half':
        return {
          width: canvasSize.width / dimension,
          height: ((canvasSize.width / dimension) * img.height) / img.width
        };
      case 'full':
        return {
          width: canvasSize.width,
          height: (canvasSize.width * img.height) / img.width
        };
      default:
        break;
    }
  }

  draw = async (srcs) => {
    const {
      computeImgSize,
      canvas: {
        current: canvas
      },
      props: {
        imageSrcs
      },
      state: {
        dimension
      }
    } = this;

    if (!srcs) srcs = imageSrcs;

    if (canvas) {
      const loadImage = src => new Promise((res) => {
        const img = new Image();
        img.src = src;
        img.onload = res(img);
      });
    
      const images = await Promise.all(srcs.map(src => loadImage(src)));


      const ctx = canvas.getContext('2d');

      const chunks = toChunks(dimension)(images);
      const newCanvasSizeHeight = chunks
        .reduce((height, chunk) => height + Math.min(...chunk.map(computeImgSize).map(v => v.height)), 0);


      this.setState(prev => ({
        canvasSize: {
          ...prev.canvasSize,
          height: newCanvasSizeHeight
        }
      }), () => {
        let currentHeight = 0;
        chunks.forEach(chunk => {
          let newHeight = 0;
          if (chunk.length > 1) {
            const computedImgSizes = chunk.map(computeImgSize);
  
            newHeight = Math.min(...computedImgSizes.map(v => v.height));
            let widthOffset = 0;

            computedImgSizes.forEach((size, i) => {
              ctx.drawImage(chunk[i], widthOffset, currentHeight, size.width, size.height);
              widthOffset += size.width;
            });
          } else {
            const computedSize1 = computeImgSize(chunk[0], { type: 'full' });

            newHeight = computedSize1.height;

            ctx.drawImage(chunk[0], 0, currentHeight, computedSize1.width, computedSize1.height);
          }

          currentHeight += newHeight;
        });


        canvas.toBlob(blob => this.setState({ resultUri: URL.createObjectURL(blob), resultBlob: blob }));
      });
    }
  }

  save = () => {
    const {
      state: {
        resultBlob
      }
    } = this;

    combinerService
      .setBackgroundImage(resultBlob)
      .then(() => notifications.success('Backround image was successfully saved'));
  }

  onDimensionChange = (value) => this.setState({ dimension: value,resultUri: null }, this.draw);

  render() {
    const {
      canvas,
      save,
      onDimensionChange,
      props: {
        classes
      },
      state: {
        canvasSize,
        resultUri,
        dimension
      }
    } = this;

    return (
      <div className={classes.container}>
        <div className={classes.sliderContainer}>
          <Slider
            min={1}
            max={10}
            step={1}
            marks={[...new Array(10)].reduce((marks, _, i) => ({ ...marks, [i]: i }), {})}
            defaultValue={dimension}
            onAfterChange={onDimensionChange}
            dots
          />
        </div>
        {
         resultUri && (
          <img
            alt="result"
            src={resultUri}
            className={classes.img}
            onClick={save}
          /> 
         )
        }
        <canvas
          ref={canvas}
          width={canvasSize.width}
          height={canvasSize.height}
          className={classes.canvas}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Canvas);
