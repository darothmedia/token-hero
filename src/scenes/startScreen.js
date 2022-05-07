import Phaser from "phaser";
import { TextButton } from "../gameObjects/textButton";
import { tokenSheets } from "../util/spritesheets";

export default class StartScreen extends Phaser.Scene {
  constructor(){
    super('StartScreen');
  }

  init(data){
    this.tokenArr = []
  }

  create(){
    let { width, height } = this.sys.game.canvas;

    while (this.tokenArr.length < 3) {
      let randNum = Math.floor(Math.random() * tokenSheets.length)
      if (!this.tokenArr.includes(randNum)) this.tokenArr.push(randNum)
    }

    console.log(this.tokenArr)

    this.add.text(width / 2, height / 2 - 45, 'Token Hero', {
      font: 'bold 72px "VT323"',
    }).setOrigin(0.5);

    this.newButton = new TextButton(this, width / 2, height / 2 + 45, 'START', {
      font: 'bold 52px "VT323"'
    })
      .setOrigin(0.5)
      .on('pointerdown', () => this.scene.start('1', {
        points: 0,
        tokens: this.tokenArr
      }))

    this.add.existing(this.newButton)
  };
}