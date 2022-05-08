import Phaser from "phaser";
import KeyObject from "../gameObjects/keyObject";
import TokenPiece from "../gameObjects/tokenPiece";
import {tokenSheets, keyboardSheets, failToken} from "../util/spritesheets";

export default class Level extends Phaser.Scene {
  constructor(level, speed, cap=20){
    super(level.toString());
    this.points = 0;
    this.usedKeys = {}
    this.scoreText = null;
    this.speed = speed;
    this.level = level;
    this.pressCount = 0;
    this.keyCount = 0;
    this.cap = cap;
  }

  init(data) {
    this.points = data.points || 0;
    this.level1 = data.level1;
    this.level2 = data.level2;
    this.tokens = data.tokens;
    this.curToken = tokenSheets[this.tokens[this.level - 1]];
    this.tokenTimer;
  }

  preload(){
    keyboardSheets.map(sheet => {
      this.load.spritesheet(sheet.key, sheet.filepath, {
        frameWidth: 112,
        frameHeight: 112
      })
    });
    this.load.spritesheet(this.curToken.key, this.curToken.filepath, {
      frameWidth: 73,
      frameHeight: 73
    });
    this.load.spritesheet(failToken.key, failToken.filepath, {
      frameWidth: 73,
      frameHeight: 73
    });
  };

  create(){
    let { width, height } = this.sys.game.canvas;
    let title = this.add.text(width / 2, height / 2, 'LEVEL ' + this.level.toString(), {
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
    this.tokenTimer = this.time.addEvent({
      delay: this.speed,
      callback: () => this.keyCount < this.cap && this.addKey(width - 112, height, alphabet),
      loop: true
    })
  }

  update(){
    this.scoreText && this.scoreText.setText(this.points.toString() + ' BTC', { align: 'right' })
    if (this.tokenTimer) this.tokenTimer.delay = (this.speed - (this.keyCount * 70)) 
    if (this.pressCount >= this.cap) {
      let points = this.points;
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.points = this.pressCount = this.keyCount = 0;
          this.scene.start(this.level !== 3 ? this.level.toString() + '_End' : 'GameOver', { 
            points: points,
            sprites: this.children.list.filter(x => x instanceof TokenPiece),
            level1: this.level1,
            level2: this.level2,
            tokens: this.tokens
          })
        },
        loop: false
      });
    }
  }

  addKey(width, height, alphabet){
    let keyValue = Math.floor(Math.random() * 26);
    this.keyCount++;

    if (!this.usedKeys[keyValue]) this.usedKeys[keyValue] = 0;
    while (this.usedKeys[keyValue] > 0){ keyValue = Math.floor(Math.random() * 26) };
    this.usedKeys[keyValue]++;

    let sprite = new KeyObject(this, width - Math.random() * width / 2, 0, 'keyboard', keyValue)
      .setOrigin(0, 0)
      .setDepth(1);
    this.add.existing(sprite);
    this.add.tween({
      targets: sprite,
      y: height,
      ease: "Linear",
      duration: this.speed,
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
          let piece = new TokenPiece(
            this,
            75 + (75 * (this.pressCount % 4)),
            150 + (75 * Math.floor(this.pressCount / 4)),
            'static',
            this.pressCount)
            .setOrigin(0, 0);
          this.add.existing(piece);
          this.pressCount++;

          this.time.addEvent({
            delay: 1000,
            callback: () => minus.destroy(),
            loop: false
          })
        };
        keyPress.destroy();
        sprite.destroy();
        this.usedKeys[keyValue]--;
      },
      loop: false
    })
    
    let keyPress = this.input.keyboard.addKey(alphabet[sprite.frame.name])
    keyPress.on('down', () => {
      this.keyDown(sprite);
      keyPress.destroy();
    })
  }

  keyDown(sprite){
    let piece = new TokenPiece(
      this, 
      75 + (75 * (this.pressCount % 4)), 
      150 + (75 * Math.floor(this.pressCount / 4)),
      this.curToken.key, 
      this.pressCount)
    .setOrigin(0,0);
    if (sprite.y > 500 && sprite.y <= 560){
      sprite.setTexture('keyboard_y', sprite.frame.name)
      this.points += 50;
      this.pressCount++;
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
      this.points += 100;
      this.pressCount++;
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
      this.points -= 20;
      this.pressCount++;
      piece.setTexture('static')
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
    this.add.existing(piece)
  }
}