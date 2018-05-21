import React from 'react';
import {findDOMNode} from 'react-dom';
import mp3 from './song1.wav';

class Ch7Ex3 extends React.Component {
  audio = null;
  canvas = null;
  ctx = null;

  componentDidMount() {
    this.canvas = document.getElementById('the-canvas');
    this.audio = document.getElementById('the-audio');
    this.ctx = this.canvas.getContext('2d');

    // load audio
    this.audio.addEventListener('canplaythrough', this.renderCanvas, false);
    this.audio.load();
  }

  componentWillUnmount() {
    this.audio.removeEventListener('canplaythrough', this.renderCanvas, false);
  }

  renderCanvas = () => {
    const { width, height } = this.canvas;
    /* background */
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.strokeStyle = "#eee";
    this.ctx.strokeRect(5,  5, width-10, height-10);
    // render text
    this.renderCanvasText();

    // loop
    requestAnimationFrame(this.renderCanvas);
  }

  renderCanvasText = () => {
    const audioElement = this.audio;
    this.ctx.fillStyle = '#eee';
    this.ctx.font = '24px serif';
    this.ctx.fillText("Current time:" + audioElement.currentTime,  20 ,50);
    this.ctx.fillText("Loop: " + audioElement.loop,  20 ,80);
    this.ctx.fillText("Autoplay: " +audioElement.autoplay,  20 ,110);
    this.ctx.fillText("Muted: " + audioElement.muted,  20 ,140);
    this.ctx.fillText("Controls: " + audioElement.controls,  20 ,170);
    this.ctx.fillText("Volume: " + audioElement.volume,  20 ,200);
    this.ctx.fillText("Paused: " + audioElement.paused,  20 ,230);
    this.ctx.fillText("Ended: " + audioElement.ended,  20 ,260);
    this.ctx.fillText("Source: " + audioElement.currentSrc,  20 ,290);
    this.ctx.fillText("Can Play OGG: " + audioElement.canPlayType("audio/ogg"),  20 ,320);
    this.ctx.fillText("Can Play WAV: " + audioElement.canPlayType("audio/wav"),  20 ,350);
    this.ctx.fillText("Can Play MP3: " + audioElement.canPlayType("audio/mp3"),  20 ,380);
    this.ctx.fillText("Duration:" + audioElement.duration,  20 ,410);
  }

  render() {
    return (
      <div>
        <h2>CH7EX3 : Audio Properties And The Canvas</h2>
        <audio
          id="the-audio"
          src={mp3}
          controls
        />
        <canvas
          id="the-canvas"
          width="700"
          height="500"
        />
      </div>
    );
  }
}

export default Ch7Ex3;
