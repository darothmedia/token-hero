import Phaser from "phaser";
import { TextButton } from "../gameObjects/textButton";
import { tokenSheets } from "../util/spritesheets";
import {h1, h2, h3, p} from "../config/textConfig";

export default class StartScreen extends Phaser.Scene {
  constructor(){
    super('StartScreen');
  }

  init(data){
    this.data = data
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

    this.add.text(width / 2, height / 2 - 45, 'TOKEN HERO', h1).setOrigin(0.5);

    this.newButton = new TextButton(this, width / 2, height / 2 + 45, 'START', h2)
      .setOrigin(0.5)
      .on('pointerdown', () => {
        this.data.repeat ?
        this.scene.start('1', {
          tokens: this.tokenArr
        }) : this.scene.start('HowToPlay', {
          tokens: this.tokenArr
        })
      })

    this.add.existing(this.newButton)
  };
}