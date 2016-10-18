import * as PIXI from "pixi.js";
import { globalState, stage } from './globals';

export default class Hud {
  constructor () {
    this.hudTextStyle = {
      fontFamily: 'Helvetica',
      fontSize: '24px',
      fill: '#FFFFFF',
      align: 'left',
      textBaseline: 'top'
    };

    this.text = new PIXI.Text('', this.hudTextStyle);
    this.text.x = 580;
    this.text.y = 0;

    this.frameCounter = 0;
    this.fps = 0;
    this.lastTime = Date.now();

    stage.addChild(this.text);
  }

  update () {
    this.frameCounter++;

    if (this.frameCounter === 100) {
      this.frameCounter = 0;
      const now = Date.now();
      const delta = (now - this.lastTime) / 1000;
      this.fps = (100 / delta).toFixed(1);
      this.lastTime = now;
    }

    this.text.text = this._updateHudText();
  }

  _updateHudText () {
    const playerShip = globalState.spaceshipMap.get(globalState.clientId);

    let text = "FPS: " + this.fps + "\n";
    text += "Ships: " + globalState.spaceshipMap.size + "\n";

    if (__DEBUG__) {
      let x = playerShip ? Math.floor(playerShip.position.x / 100) : '?';
      let y = playerShip ? Math.floor(playerShip.position.y / 100) : '?';

      text += "X: " + x + "\n";
      text += "Y: " + y + "\n";
    }

    return text;
  }
}