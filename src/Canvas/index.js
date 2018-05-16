import React from 'react';
import { findDOMNode } from 'react-dom';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.start = false;
    this.node = React.createRef();
    this.canvas = null;
    this.ctx = null;
    this.cube = {
      x: 0,
      y: 0,
      r: 20,
      vx: 1,
      vy: 1,
    };

  }

  componentDidMount() {
    this.canvas = findDOMNode(this.node.current);
    this.ctx = this.canvas.getContext('2d');
    this.renderCanvas();
  }

  renderCube = () => {
    let { x, y, r, vx, vy } = this.cube;

    /** render */
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(x, y, r, r);

    /** update position (x, y) */
    const dx = 5;
    const dy = 5;

    let xNext = x + vx * dx;
    let yNext = y + vy * dy;

    if (xNext >= this.canvas.width - r || xNext <= 0) {
      this.cube.vx = vx * (-1);
      xNext = x + this.cube.vx * dx;
    }
    if (yNext >= this.canvas.height - r || yNext <= 0) {
      this.cube.vy = vy * (-1);
      yNext = y + this.cube.vy * dy;
    }

    this.cube.x = xNext;
    this.cube.y = yNext;

    if (this.start) {
      requestAnimationFrame(this.renderCanvas);
    }
  }

  renderCanvas = () => {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'red';
    const recLength = 100;
    this.ctx.fillRect(
      (this.canvas.width - recLength) / 2,
      (this.canvas.height - recLength) / 2,
      recLength,
      recLength
    )

    this.renderCube();
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => {
            this.start = true;
            this.renderCanvas();
          }}>Start</button>
        </div>
        <canvas
          ref={this.node}
          width="800"
          height="600"
        />
      </div>
    );
  }
}

export default Canvas;
