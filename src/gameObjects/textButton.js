import Phaser from "phaser";

export class TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, style);

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', this.enterButtonHoverState, this)
      .on('pointerout', this.enterButtonRestState, this)
      .on('pointerdown', this.enterButtonActiveState, this)
      .on('pointerup', this.enterButtonHoverState, this);
  }

  enterButtonHoverState() {
    this.setStyle({ fill: '#f9f' });
  }

  enterButtonRestState() {
    this.setStyle({ fill: '#fff' });
  }

  enterButtonActiveState() {
    this.setStyle({ fill: '#0ff' });
  }
}