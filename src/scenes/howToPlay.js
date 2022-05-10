import Phaser from "phaser";
import { TextButton } from "../gameObjects/textButton";
import { keyboardSheets } from "../util/spritesheets";
import KeyObject from "../gameObjects/keyObject";
import { h1, h2, p } from "../config/textConfig";

export default class HowToPlay extends Phaser.Scene {
  constructor() {
    super('HowToPlay');
  }

  init(data){
    this.data = data
  }

  preload() {
    keyboardSheets.map(sheet => {
      this.load.spritesheet(sheet.key, sheet.filepath, {
        frameWidth: 112,
        frameHeight: 112
      })
    });
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    const howToText = 'Time to live code some NFTs on the blockchain! ' +
    'Key icons will start falling from the top of the screen. When ' +
    'they reach the line at the bottom, press the corresponding key at the right time ' +
    'to earn points and code part of your NFT! The closer to perfect timing you get, ' +
    'the more your final NFT will be worth. Now get coding!'

    this.add.rectangle(width / 7, height / 3.5, width * 5 / 7, height / 2.3, 0x000000, 0.4)
      .setOrigin(0, 0);
    this.add.line(0, 0, 0, height - 150, width, height - 150, 0xffff00, 1)
      .setOrigin(0, 0)
      .setStrokeStyle(20, 0xfff000, 0.4)
      .setDepth(-2);

    this.add.text(width / 2, height / 2 - 125, 'HOW TO PLAY', h1).setOrigin(0.5);
    this.add.text(width / 2, height / 2 + 10, howToText, p(width)).setOrigin(0.5)

    this.newButton = new TextButton(this, width / 2, height / 2 + 150, 'START', h2)
      .setOrigin(0.5)
      .on('pointerdown', () => this.scene.start('1', {
        points: 0,
        tokens: this.data.tokens
      }))

    this.add.existing(this.newButton)
    this.time.addEvent({
      delay: 3000,
      callback: () => this.addKey(width - 112, height),
      loop: true
    })
  };

  addKey(width, height) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let keyValue = Math.floor(Math.random() * 26);

    let sprite = new KeyObject(this, width - (Math.random() * width), 0, 'keyboard', keyValue)
      .setOrigin(0, 0)
      .setDepth(-1);
    this.add.existing(sprite);
    this.add.tween({
      targets: sprite,
      y: height,
      ease: "Linear",
      duration: 3000,
      repeat: 0,
      yoyo: false
    })

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        keyPress.destroy();
        sprite.destroy();
        },
      loop: false
    })

    let keyPress = this.input.keyboard.addKey(alphabet[sprite.frame.name])
    keyPress.on('down', () => {
      this.keyDown(sprite);
      keyPress.destroy();
    })
  }

  keyDown(sprite) {
    if (sprite.y > 500 && sprite.y <= 560) {
      sprite.setTexture('keyboard_y', sprite.frame.name)
    } else if (sprite.y > 560 && sprite.y < 600) {
      sprite.setTexture('keyboard_g', sprite.frame.name)
    } else {
      sprite.setTexture('keyboard_r', sprite.frame.name)
    }
  }
}