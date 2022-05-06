import Phaser from "phaser";
import { TextButton } from "../gameObjects/textButton";

export default class GameOver extends Phaser.Scene {
  constructor(){
    super('GameOver')
  }

  init(data){
    this.points = data.points
  }

  create() {
    let { width, height } = this.sys.game.canvas;

    this.add.text(width / 2, height / 2 - 105, 'GAME OVER', {
      font: 'bold 72px "VT323"',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 45, this.points.toString() + ' BTC', {
      font: 'bold 62px "VT323"',
    }).setOrigin(0.5);

    this.newButton = new TextButton(this, width / 2, height / 2 + 95, 'EXIT', {
      font: 'bold 52px "VT323"'
    })
      .setOrigin(0.5)
      .on('pointerdown', () => this.scene.start('StartScreen'))

    this.add.existing(this.newButton)
  };
}