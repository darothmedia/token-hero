import Phaser from "phaser";
import KeyObject from "../gameObjects/keyObject";

export default class Level1 extends Phaser.Scene {
  constructor(){
    super('Level1');
  }

  preload(){
    this.load.spritesheet('keyboard', '../../img/keyboard_sheet.png', {
      frameWidth: 112,
      frameHeight: 112,
    })
  }

  create(){
    let { width, height } = this.sys.game.canvas;
    let title = this.add.text(width / 2, height / 2, 'LEVEL 1', {
      font: 'bold 72px "VT323"',
    }).setOrigin(0.5);

    this.time.addEvent({
      delay: 1500,
      callback: () => {
        title.destroy();
        this.add.rectangle(0, 0, width * 2, height * 2, 0x0080FF, 1)
        this.startGame();
      },
      loop: false
    })
    
  };

  startGame(){
    let { width, height } = this.sys.game.canvas;
    this.time.addEvent({
      delay: 1500,
      callback: () => this.addKey(),
      loop: true
    })
    this.add.line(0, 0, 0, height - 150, width, height - 150, 0xffff00, 1)
      .setOrigin(0, 0)
      .setStrokeStyle(20, 0xfff000, 0.4)
      .setDepth(0)
  }

  addKey(){
    let { width, height } = this.sys.game.canvas;
    let sprite = new KeyObject(this, Math.random() * ((width - 112) / 2), 0, 'keyboard', Math.floor(Math.random() * 48))
      .setOrigin(0, 0)
      .setDepth(1)
    this.add.existing(sprite);
    this.add.tween({
      targets: sprite,
      y: height,
      ease: "Linear",
      duration: 4000,
      repeat: 0,
      yoyo: false
    })
  }
}