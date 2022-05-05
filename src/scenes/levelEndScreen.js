import Phaser from "phaser";
import { TextButton } from "../gameObjects/textButton";

export default class LevelEndScreen extends Phaser.Scene {
  constructor(levelEnd){
    super(levelEnd.toString() + '_End');
    this.levelEnd = levelEnd;
    if (levelEnd < 3){
      this.nextLevel = (parseInt(levelEnd) + 1).toString();
    } else this.nextLevel = 'GameOver'
  }

  init(data){
    this.points = data.points;
  }

  create() {
    let { width, height } = this.sys.game.canvas;

    this.add.text(width / 2, height / 2 - 105, 'LEVEL ' + this.levelEnd + ' COMPLETE', {
      font: 'bold 72px "VT323"',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 45, this.points.toString() + ' BTC', {
      font: 'bold 62px "VT323"',
    }).setOrigin(0.5);

    this.newButton = new TextButton(this, width / 2, height / 2 + 45, 'CONTINUE', {
      font: 'bold 52px "VT323"'
    })
      .setOrigin(0.5)
      .on('pointerdown', () => this.scene.start(this.nextLevel, {points: this.points}))

    this.add.existing(this.newButton)
  };
}