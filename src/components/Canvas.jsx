import React, { Component, createRef } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    backgroundColor: '#fff'
  },
  canvas: {
    display: 'none'
  }
};

const isExist = v => typeof v !== 'undefined';

const max = (v1, v2) => {
  if (!v2) return v1;

  return v1 > v2 ? v1 : v2;
};

const min = (v1, v2) => {
  if (!v2) return v1;

  return v1 < v2 ? v1 : v2;
};

const tuple = arr => [...new Array(Math.ceil(arr.length / 2))].reduce(({ objs, i }) => ({
  objs: [...objs, isExist(arr[i+1]) ? [arr[i], arr[i+1]] : [arr[i]]],
  i: i + 2
}), {objs: [], i: 0}).objs;

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasSize: this.reComputeCanvasSize(),
      result: null,
      resultHref: null
    }
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
        canvasSize
      }
    } = this;

    switch(type) {
      case 'half':
        return {
          width: canvasSize.width / 2,
          height: ((canvasSize.width / 2) * img.height) / img.width
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
      }
    } = this;

    if (canvas) {
      const loadImage = src => new Promise((res) => {
        const img = new Image();
        img.src = src;
        img.onload = res(img);
      });
    
      const images = await Promise.all(srcs.map(src => loadImage(src)));


      const ctx = canvas.getContext('2d');

      const tuples = tuple(images);
      const newCanvasSizeHeight = tuples.reduce((height, tuple) => height + min(...tuple.map(computeImgSize).map(v => v.height)), 0);


      this.setState(prev => ({
        canvasSize: {
          ...prev.canvasSize,
          height: newCanvasSizeHeight
        }
      }), () => {
        let currentHeight = 0;
        tuples.forEach(tuple => {
          let newHeight = 0;
          if (tuple[1]) {
            const [computedImgSize1 = {}, computedImgSize2 = {}] = tuple.map(computeImgSize);
  
            newHeight = min(computedImgSize1.height, computedImgSize2.height);

            ctx.drawImage(tuple[0], 0, currentHeight, computedImgSize1.width, computedImgSize1.height);
            ctx.drawImage(tuple[1], computedImgSize1.width, currentHeight, computedImgSize2.width, computedImgSize2.height);
          } else {
            const computedSize1 = computeImgSize(tuple[0], { type: 'full' });

            newHeight = computedSize1.height;

            ctx.drawImage(tuple[0], 0, currentHeight, computedSize1.width, computedSize1.height);
          }

          currentHeight += newHeight;
        });


        canvas.toBlob(blob => this.setState({ resultHref: URL.createObjectURL(blob) }));
      });
    }
  }

  render() {
    const {
      canvas,
      props: {
        classes
      },
      state: {
        canvasSize,
        resultHref
      }
    } = this;

    return (
      <div className={classes.container}>
        {
         resultHref && (
          <img alt="result" src={resultHref} /> 
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
