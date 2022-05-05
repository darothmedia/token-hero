import Phaser, { RIGHT } from "phaser";
import KeyObject from "../gameObjects/keyObject";

export default class Level1 extends Phaser.Scene {
  constructor(){
    super('Level1');
    this.points = 0
  }

  preload(){
    this.load.spritesheet('keyboard', '../../img/keyboard_sheet_white.png', {
      frameWidth: 112,
      frameHeight: 112,
    })
    this.load.spritesheet('keyboard_y', '../../img/keyboard_sheet_yellow.png', {
      frameWidth: 112,
      frameHeight: 112,
    })
    this.load.spritesheet('keyboard_g', '../../img/keyboard_sheet_green.png', {
      frameWidth: 112,
      frameHeight: 112,
    })
    this.load.spritesheet('keyboard_r', '../../img/keyboard_sheet_red.png', {
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
        this.setupGame(width, height);
        this.startGame(width, height);
      },
      loop: false
    })

    
  };

  setupGame(width, height){
    this.add.rectangle(0, 0, width * 2, height * 2, 0x0080FF, 1);
    this.add.line(0, 0, 0, height - 150, width, height - 150, 0xffff00, 1)
      .setOrigin(0, 0)
      .setStrokeStyle(20, 0xfff000, 0.4)
      .setDepth(0);
  }

  startGame(width, height){
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.time.addEvent({
      delay: 1500,
      callback: () => this.addKey(width, height, alphabet, scoreText),
      loop: true
    })
    let scoreText = this.add.text(20, 20, this.points.toString() + ' BTC', {
      font: 'bold 42px "VT323"',
      align: 'right'
    }).setOrigin(0, 0)
  }

  update(){
  }

  addKey(width, height, alphabet, scoreText){
    let sprite = new KeyObject(this, width - 112 - Math.random() * ((width - 112) / 2), 0, 'keyboard', Math.floor(Math.random() * 16))
      .setOrigin(0, 0)
      .setDepth(1);
    this.add.existing(sprite);
    this.add.tween({
      targets: sprite,
      y: height,
      ease: "Linear",
      duration: 4000,
      repeat: 0,
      yoyo: false
    })

    this.time.addEvent({
      delay: 4000,
      callback: () => {
        keyPress.destroy();
        sprite.destroy();
      },
      loop: false
    })
    let keyPress = this.input.keyboard.addKey(alphabet[sprite.frame.name])
    keyPress.on('down', () => this.keyDown(sprite, scoreText))
  }

  keyDown(sprite, scoreText){
    if (sprite.y > 500 && sprite.y <= 560){
      sprite.setTexture('keyboard_y', sprite.frame.name)
      this.points += 50
    } else if (sprite.y > 560 && sprite.y < 600){
      sprite.setTexture('keyboard_g', sprite.frame.name)
      this.points += 100
    } else {
      sprite.setTexture('keyboard_r', sprite.frame.name)
      this.points -= 20
    }
    scoreText.setText(this.points.toString() + ' BTC', {align: 'right'})
  }
}