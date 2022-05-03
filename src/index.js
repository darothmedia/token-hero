import Phaser from "phaser";

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
function create(){};
function update(){};