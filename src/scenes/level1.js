import Phaser from "phaser";

export class Level1 extends Phaser.Scene {
  create(){
    let { width, height } = this.sys.game.canvas;
    this.add.text(width / 2, height / 2 - 45, 'LEVEL 1', {
      font: 'bold 72px "VT323"',
    }).setOrigin(0.5);
  };
}