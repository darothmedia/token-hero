const gameConfig = {
  type: Phaser.CANVAS,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  backgroundColor: '#000000',
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

export default gameConfig