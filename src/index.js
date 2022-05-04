import Phaser from "phaser";
import gameConfig from "./config/gameConfig";
import { Level1 } from "./scenes/level1";
import { StartScreen } from "./scenes/startScreen";

const game = new Phaser.Game(gameConfig)

game.scene.add('StartScreen', StartScreen, true)
game.scene.add('Level1', Level1, false)