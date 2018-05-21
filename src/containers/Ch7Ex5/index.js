import React from 'react';

import shootWav from './shoot.wav';
import explodeWav from './explode.wav';
import alienPNG from './alien.png';
import playerPNG from './player.png';
import misslePNG from './missile.png';

/** constants */
const STATE_INIT = 'STATE_INIT';
const STATE_LOADING = 'STATE_LOADING';
const STATE_RESET = 'STATE_RESET';
const STATE_PLAYING = 'STATE_PLAYING';

/** align config */
const ALIEN_START_X = 25;
const ALIEN_START_Y = 25;
const ALIEN_ROWS = 5;
const ALIEN_COLS = 8;
const ALIEN_SPACING = 40;

class Ch7Ex5 extends React.Component {
  canvas = null;
  ctx = null;

  /** game config */
  appState = STATE_INIT; // loading status:  INIT > RST > PLAYING
  loadCount = 0;
  itemsToLoad = 0; // load 5 items and enter STATE_RST

  // image assets
  alienImage = new Image();
  missileImage = new Image();
  playerImage = new Image();

  // audio elements
  explodeSound = null;
  shootSound = null;

  mouseX = null;
  mouseY = null;
  player = { x: 250, y: 475 };
  aliens = new Array();
  missiles = new Array();

  componentDidMount() {
    this.canvas = document.getElementById('the-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.addEventListener('mouseup', this.eventMouseUp, false);
    this.canvas.addEventListener('mousemove', this.eventMouseMove, false);

    this.renderCanvas();
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mouseup', this.eventMouseUp, false);
    this.canvas.removeEventListener('mousemove', this.eventMouseMove, false);
  }

  eventMouseUp = () => {
    this.missiles.push({
      speed: 5,
      x: this.player.x + 0.5 * this.playerImage.width,
      y: this.player.y - this.missileImage.height,
      width: this.missileImage.width,
      height: this.missileImage.height
    });
    this.shootSound.play();
  };

  eventMouseMove = evt => {
    // save mouse position
    let x;
    let y;

    if (evt.pageX || evt.pageY) {
      x = evt.pageX;
      y = evt.pageY;
    } else {
      x =
        evt.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        evt.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;

    this.mouseX = x;
    this.mouseY = y;
    this.player.x = this.mouseX;
    this.player.y = this.mouseY;
  };

  renderCanvas = () => {
    const { width, height } = this.canvas;

    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, width, height);

    // loop
    this.run();
    requestAnimationFrame(this.renderCanvas);
  };

  run = () => {
    switch (this.appState) {
      case STATE_INIT:
        this.initApp();
        break;
      case STATE_LOADING:
        //wait for call backs
        break;
      case STATE_RESET:
        this.resetApp();
        break;
      case STATE_PLAYING:
        this.drawScreen();
        break;
    }
  };

  initApp = () => {
    this.loadCount = 0;
    this.itemsToLoad = 5;
    this.makeExplodeSound();
    this.makeShootSound();
    this.makeImages();
    this.appState = STATE_LOADING;
  };

  drawScreen = () => {
    const { missiles, aliens, ctx } = this;

    //Move missiles
    for (let i = missiles.length - 1; i >= 0; i--) {
      missiles[i].y -= missiles[i].speed;
      if (missiles[i].y < 0 - missiles[i].height) {
        missiles.splice(i, 1);
      }
    }

    //Move Aliens
    for (let i = aliens.length - 1; i >= 0; i--) {
      aliens[i].x += aliens[i].speed;
      if (
        aliens[i].x > this.canvas.width - aliens[i].width ||
        aliens[i].x < 0
      ) {
        aliens[i].speed *= -1;
        aliens[i].y += 20;
      }
      if (aliens[i].y > this.canvas.height) {
        aliens.splice(i, 1);
      }
    }

    //Detect Collisions
    missile: for (let i = missiles.length - 1; i >= 0; i--) {
      let tempMissile = missiles[i];
      for (let j = aliens.length - 1; j >= 0; j--) {
        let tempAlien = aliens[j];
        if (this.hitTest(tempMissile, tempAlien)) {
          this.explodeSound.play();
          missiles.splice(i, 1);
          aliens.splice(j, 1);
          break missile;
        }
      }

      if (aliens.length <= 0) {
        this.appState = STATE_RESET;
      }
    }

    //Background

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //Box
    ctx.strokeStyle = '#EEEEEE';
    ctx.strokeRect(5, 5, this.canvas.width - 10, this.canvas.height - 10);

    //Draw Player
    ctx.drawImage(this.playerImage, this.player.x, this.player.y);

    //Draw Missiles
    for (let i = missiles.length - 1; i >= 0; i--) {
      ctx.drawImage(this.missileImage, missiles[i].x, missiles[i].y);
    }

    //draw aliens
    for (let i = aliens.length - 1; i >= 0; i--) {
      ctx.drawImage(this.alienImage, aliens[i].x, aliens[i].y);
    }

    //Draw Text
    ctx.fillStyle = '#FFFFFF';
  };

  resetApp = () => {
    this.startLevel();
    this.shootSound.volume = 0.5;
    this.explodeSound.volume = 0.5; // 課本 typo
    this.appState = STATE_PLAYING;
  };

  startLevel = () => {
    for (let r = 0; r < ALIEN_ROWS; r++) {
      for (let c = 0; c < ALIEN_COLS; c++) {
        this.aliens.push({
          speed: 2,
          x: ALIEN_START_X + c * ALIEN_SPACING,
          y: ALIEN_START_Y + r * ALIEN_SPACING,
          width: this.alienImage.width,
          height: this.alienImage.height
        });
      }
    }
  };

  makeExplodeSound = () => {
    this.explodeSound = document.createElement('audio');
    document.body.appendChild(this.explodeSound);
    this.explodeSound.addEventListener(
      'canplaythrough',
      this.handleItemLoaded,
      false
    );
    this.explodeSound.setAttribute('src', explodeWav);
  };

  makeShootSound = () => {
    this.shootSound = document.createElement('audio');
    document.body.appendChild(this.shootSound);
    this.shootSound.addEventListener(
      'canplaythrough',
      this.handleItemLoaded,
      false
    );
    this.shootSound.setAttribute('src', shootWav);
  };

  makeImages = () => {
    this.alienImage = new Image();
    this.alienImage.onload = this.handleItemLoaded;
    this.alienImage.src = alienPNG;

    this.playerImage = new Image();
    this.playerImage.onload = this.handleItemLoaded;
    this.playerImage.src = playerPNG;

    this.missileImage = new Image();
    this.missileImage.onload = this.handleItemLoaded;
    this.missileImage.src = misslePNG;
  };

  handleItemLoaded = () => {
    console.log('loadCount:' + this.loadCount);
    this.loadCount++;

    if (this.loadCount >= this.itemsToLoad) {
      this.shootSound.removeEventListener(
        'canplaythrough',
        this.handleItemLoaded,
        false
      );
      this.explodeSound.removeEventListener(
        'canplaythrough',
        this.handleItemLoaded,
        false
      );

      this.appState = STATE_RESET;
    }
  };

  hitTest = (image1, image2) => {
    const r1left = image1.x;
    const r1top = image1.y;
    const r1right = image1.x + image1.width;
    const r1bottom = image1.y + image1.height;
    const r2left = image2.x;
    const r2top = image2.y;
    const r2right = image2.x + image2.width;
    const r2bottom = image2.y + image2.height;

    let retval = false;

    if (
      r1left > r2right ||
      r1right < r2left ||
      r1bottom < r2top ||
      r1top > r2bottom
    ) {
      retval = false;
    } else {
      retval = true;
    }

    return retval;
  };

  render() {
    return (
      <div>
        <h2>
          <span style={{ verticalAlign: 'sub', paddingLeft: 8 }}>
            Space Raiders With Unoptimized Sound
          </span>
        </h2>
        <canvas width="700" height="500" id="the-canvas" />
      </div>
    );
  }
}

export default Ch7Ex5;
