import Phaser from "phaser";
import { TextButton } from "../gameObjects/textButton";
import { tokenSheets, failToken } from "../util/spritesheets";

export default class GameOver extends Phaser.Scene {
  constructor(){
    super('GameOver')
  }

  init(data){
    this.points = data.points;
    this.level1 = data.level1;
    this.level2 = data.level2;
    this.level3 = data.sprites;
    this.tokens = data.tokens;
  }

  preload() {
    this.tokens.map(tokenID => {
      let token = tokenSheets[tokenID];
      this.load.spritesheet(token.key, token.filepath, {
        frameWidth: 73,
        frameHeight: 73
      })
    });
    this.load.spritesheet(failToken.key, failToken.filepath, {
      frameWidth: 73,
      frameHeight: 73
    });
  }

  create() {
    let { width, height } = this.sys.game.canvas;

    this.add.rectangle(this.level1[0].x + 155, this.level1[0].y - 110, 170, 207.5, 0x0000FF, 1).setOrigin(0, 0)
    this.add.rectangle(this.level1[0].x + 355, this.level1[0].y - 110, 170, 207.5, 0x0000FF, 1).setOrigin(0, 0)
    this.add.rectangle(this.level1[0].x + 555, this.level1[0].y - 110, 170, 207.5, 0x0000FF, 1).setOrigin(0, 0)

    this.level1.map((sprite, i) => {
      this.add.sprite(sprite.x + 165 - ((i % 4) * (75 / 2)), sprite.y - 100 - Math.floor(i / 4) * (75 / 2), sprite.texture.key, sprite.frame.name)
        .setScale(0.5, 0.5)
        .setOrigin(0, 0)
    })

    this.level2.map((sprite, i) => {
      this.add.sprite(sprite.x + 365 - ((i % 4) * (75 / 2)), sprite.y - 100 - Math.floor(i / 4) * (75 / 2), sprite.texture.key, sprite.frame.name)
        .setScale(0.5, 0.5)
        .setOrigin(0, 0)
    })

    this.level3.map((sprite, i) => {
      this.add.sprite(sprite.x + 565 - ((i % 4) * (75 / 2)), sprite.y - 100 - Math.floor(i / 4) * (75 / 2), sprite.texture.key, sprite.frame.name)
        .setScale(0.5, 0.5)
        .setOrigin(0, 0)
    })

    this.add.text(width / 2, height / 2 - 65, 'GAME OVER', {
      font: 'bold 72px "VT323"',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 5, this.points.toString() + ' BTC', {
      font: 'bold 62px "VT323"',
    }).setOrigin(0.5);

    this.newButton = new TextButton(this, width / 2, height / 2 + 85, 'EXIT', {
      font: 'bold 52px "VT323"'
    })
      .setOrigin(0.5)
      .on('pointerdown', () => this.scene.start('StartScreen', {score: 0}))

    this.add.existing(this.newButton)
  };
}