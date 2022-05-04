import Phaser from "phaser";
import { Level1 } from "./scenes/level1";
import { TextButton } from "./gameObjects/textButton";

const config = {
  type: Phaser.CANVAS,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: true
    }
  },
  backgroundColor: '#000000',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    mode: Phaser.Scale.FIT,
    max: {
      width: 1000,
      height: 700
    },
    min: {
      width: 750,
      height: 500
    }
  }
}

const game = new Phaser.Game(config)

function preload(){};
function create(){
  let { width, height } = this.sys.game.canvas;

  this.add.text(width / 2, height / 2 - 45, 'Token Hero', {
    font: 'bold 72px "VT323"',
  }).setOrigin(0.5);

  this.newButton = new TextButton(this, width / 2, height / 2 + 45, 'START', {
    font: 'bold 52px "VT323"'
  })
    .setOrigin(0.5)
    .on('pointerdown', () => this.scene.start('Level1'))
  
  this.add.existing(this.newButton)
};
function update(){};

game.scene.add('Level1', Level1, false)