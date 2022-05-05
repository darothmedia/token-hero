import Phaser from "phaser";

export default class KeyObject extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    this.scaleX = 0.5;
    this.scaleY = 0.5;
  }

  create(){
  }
}