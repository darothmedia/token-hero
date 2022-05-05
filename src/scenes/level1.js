import Phaser from "phaser";
import KeyObject from "../gameObjects/keyObject";

export default class Level1 extends Phaser.Scene {
  constructor(){
    super('Level1');
    this.points = 0;
    this.usedKeys = {}
    this.scoreText = null;
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
        this.scoreText = this.add.text(20, 20, this.points.toString() + ' BTC', {
          font: 'bold 42px "VT323"',
          align: 'right'
        }).setOrigin(0, 0)
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
    this.add.grid(75, 150, 300, 375, 75, 75, 0xffffff, 0.5, 0xffffff, 1).setOrigin(0, 0)
  }

  startGame(width, height){
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.time.addEvent({
      delay: 1500,
      callback: () => this.addKey(width - 112, height, alphabet),
      loop: true
    })
  }

  update(){
    this.scoreText && this.scoreText.setText(this.points.toString() + ' BTC', { align: 'right' })
  }

  addKey(width, height, alphabet){
    let keyValue = Math.floor(Math.random() * 26)

    if (!this.usedKeys[keyValue]) this.usedKeys[keyValue] = 0
    while (this.usedKeys[keyValue] > 0){ keyValue = Math.floor(Math.random() * 26) }
    this.usedKeys[keyValue]++;

    let sprite = new KeyObject(this, width - Math.random() * width / 2, 0, 'keyboard', keyValue)
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
        if (sprite.texture.key === 'keyboard') {
          this.points -= 50
          let minus = this.add.text(sprite.x, sprite.y - 50, '-50', {
            font: 'bold 42px "VT323"',
            fill: '#FF0000'
          })

          this.time.addEvent({
            delay: 1000,
            callback: () => minus.destroy(),
            loop: false
          })
        };
        keyPress.destroy();
        sprite.destroy();
        this.usedKeys[keyValue] --;
      },
      loop: false
    })
    
    let keyPress = this.input.keyboard.addKey(alphabet[sprite.frame.name])
    keyPress.on('down', () => this.keyDown(sprite))
  }

  keyDown(sprite){
    if (sprite.y > 500 && sprite.y <= 560){
      sprite.setTexture('keyboard_y', sprite.frame.name)
      this.points += 50
      let fifty = this.add.text(sprite.x, sprite.y - 50, '+50', {
        font: 'bold 42px "VT323"',
        fill: '#FFFF00'
      })

      this.time.addEvent({
        delay: 1000,
        callback: () => fifty.destroy(),
        loop: false
      })
    } else if (sprite.y > 560 && sprite.y < 600){
      sprite.setTexture('keyboard_g', sprite.frame.name)
      this.points += 100
      let hundred = this.add.text(sprite.x, sprite.y - 50, '+100', {
        font: 'bold 42px "VT323"',
        fill: '#00FF00'
      })

      this.time.addEvent({
        delay: 1000,
        callback: () => hundred.destroy(),
        loop: false
      })
    } else {
      sprite.setTexture('keyboard_r', sprite.frame.name)
      this.points -= 20
      let twenty = this.add.text(sprite.x, sprite.y - 50, '-20', {
        font: 'bold 42px "VT323"',
        fill: '#FF0000'
      })

      this.time.addEvent({
        delay: 1000,
        callback: () => twenty.destroy(),
        loop: false
      })
    }
  }
}