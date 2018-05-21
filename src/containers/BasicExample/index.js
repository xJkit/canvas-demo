import React from 'react';
import { findDOMNode } from 'react-dom';
import Slider, { Range } from 'rc-slider';

import './index.css';
import 'rc-slider/assets/index.css';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.start = false;
    this.canvas = null;
    this.ctx = null;
    this.speed = 10;
    this.vx = this.speed;
    this.vy = this.speed;
    this.ball = {
      r: 10,
      x: 100,
      y: 100,
    };
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.node.current);
    this.ctx = this.canvas.getContext('2d');
    this.renderCanvasMain();
  }

  handleStart = () => {
    this.start = true;
    this.renderCanvasMain();
  }

  handlePause = () => {
    this.start = false;
  }

  handleReset = () => {
    this.state = false;
    this.ball.x = 100;
    this.ball.y = 100;
    this.vx = this.speed;
    this.vy = this.speed;
    this.renderCanvasMain();
  }

  drawCircle = (x, y, r) => {
    const ctx = this.ctx;
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(x, y, r, 0 , Math.PI * 2, true);
    ctx.fill();
  }

  renderBall = () => {
    let { x, y, r } = this.ball;

    /** render */
    this.drawCircle(x, y, r);

    /** update position (x, y) */
    let xNext = x + this.vx;
    let yNext = y + this.vy;

    if (xNext >= this.canvas.width - r || xNext <= r) {
      this.vx = -this.vx;
      xNext = x + this.vx;
    }
    if (yNext >= this.canvas.height - r || yNext <= r) {
      this.vy = -this.vy;
      yNext = y + this.vy;
    }

    this.ball.x = xNext;
    this.ball.y = yNext;

    if (this.start) {
      requestAnimationFrame(this.renderCanvasMain);
    }
  }

  renderPaddle = (w, h) => {
    const ctx = this.ctx;
    const paddleStartHeight = this.canvas.height / 2 - h / 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, paddleStartHeight, w, h);
  }

  renderBackground = () => {
    const ctx = this.ctx;
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderCanvasMain = () => {
    this.renderBackground();
    this.renderPaddle(10, 100);
    this.renderBall();
  }

  render() {
    return (
      <div>
        <div className="canvas-title">
          <button
            className="canvas-button"
            onClick={this.handleStart}
          >
            Start
          </button>
          <button
            className="canvas-button"
            onClick={this.handlePause}
          >
            Pause
          </button>
          <button
            className="canvas-button"
            onClick={this.handleReset}
          >
            Reset
          </button>
          <span>Click buttons to kick off canvas animation</span>
        </div>
        <canvas
          ref={this.node}
          width="700"
          height="500"
        />
      </div>
    );
  }
}

export default Canvas;
