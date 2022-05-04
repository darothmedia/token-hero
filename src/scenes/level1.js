import Phaser from "phaser";

export class Level1 extends Phaser.Scene {
  
  initialize(){
    Phaser.Scene.call(this, {"key": "Level1"})
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
        this.startGame();
      },
      loop: false
    })
  };

  startGame(){
    let { width, height } = this.sys.game.canvas;
    this.add.rectangle(0, 0, width * 2, height * 2, 0x0080FF, 1)
  }
}