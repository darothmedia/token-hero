import Phaser from "phaser";
import { TextButton } from "../gameObjects/textButton";
import { tokenSheets } from "../util/spritesheets";

export default class StartScreen extends Phaser.Scene {
  constructor(){
    super('StartScreen');
  }

  init(){
    this.tokenArr = []
  }

  preload(){
    this.load.spritesheet('coin', '../../img/anim_coin.png', {
      frameWidth: 208,
      frameHeight: 400
    })
  }

  create(){
    let { width, height } = this.sys.game.canvas;
    this.anims.create({
      key: 'flip',
      frames: this.anims.generateFrameNumbers('coin'),
      frameRate: 16
    })
    const coin1 = this.add.sprite(width / 4 - 100, height / 2, 'coin').setOrigin(0.5)
    const coin2 = this.add.sprite(3 * width / 4 + 100, height / 2, 'coin').setOrigin(0.5)
    coin1.play({key: 'flip', repeat: Infinity})
    coin2.play({ key: 'flip', repeat: Infinity })

    while (this.tokenArr.length < 3) {
      let randNum = Math.floor(Math.random() * tokenSheets.length)
      if (!this.tokenArr.includes(randNum)) this.tokenArr.push(randNum)
    }

    this.add.text(width / 2, height / 2 - 45, 'TOKEN HERO', {
      fontFamily: 'VT323, Arial, Helvetica, sans-serif',
      fontSize: '72px',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.newButton = new TextButton(this, width / 2, height / 2 + 45, 'START', {
      fontFamily: 'VT323, Arial, Helvetica, sans-serif',
      fontSize: '52px',
      fontStyle: 'bold'
    })
      .setOrigin(0.5)
      .on('pointerdown', () => this.scene.start('1', {
        points: 0,
        tokens: this.tokenArr
      }))

    this.add.existing(this.newButton)
  };
}