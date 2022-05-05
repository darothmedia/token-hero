import Phaser from "phaser";

export default class LevelEndScreen extends Phaser.Scene {
  constructor(levelEnd, data){
    super(levelEnd + '_End');
    this.data = data;
    if (levelEnd < 3){
      this.nextLevel = (parseInt(levelEnd) + 1).toString();
    } else this.nextLevel = 'GameOver'
  }

  create() {
    let { width, height } = this.sys.game.canvas;

    this.add.text(width / 2, height / 2 - 65, 'LEVEL ' + this.levelEnd + ' COMPLETE', {
      font: 'bold 72px "VT323"',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 45, this.data.points.toString() + ' BTC', {
      font: 'bold 62px "VT323"',
    }).setOrigin(0.5);

    this.newButton = new TextButton(this, width / 2, height / 2 + 45, 'CONTINUE', {
      font: 'bold 52px "VT323"'
    })
      .setOrigin(0.5)
      .on('pointerdown', () => this.scene.start(this.nextLevel))

    this.add.existing(this.newButton)
  };
}