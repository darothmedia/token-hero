import Phaser from "phaser";
import { TextButton } from "../gameObjects/textButton";

export class StartScreen extends Phaser.Scene {
  initialize() {
    Phaser.Scene.call(this, { "key": "StartScreen" })
  }
  create(){
    let { width, height } = this.sys.game.canvas;

    this.add.text(width / 2, height / 2 - 45, 'Token Hero', {
      font: 'bold 72px "VT323"',
    }).setOrigin(0.5);

    this.newButton = new TextButton(this, width / 2, height / 2 + 45, 'START', {
      font: 'bold 52px "VT323"'
    })
      .setOrigin(0.5)
      .on('pointerdown', () => this.scene.start('Level1'))

    this.add.existing(this.newButton)
  };
}