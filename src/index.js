import Phaser from "phaser";
import gameConfig from "./config/gameConfig";
import Level from "./scenes/level";
import StartScreen from "./scenes/startScreen";
import LevelEndScreen from "./scenes/levelEndScreen";
import GameOver from "./scenes/gameOver";

const game = new Phaser.Game(gameConfig)

game.scene.add('StartScreen', StartScreen, true)
game.scene.add('1', new Level(1, 3000), false)
game.scene.add('1_End', new LevelEndScreen(1), false)
game.scene.add('2', new Level(2, 2500), false)
game.scene.add('2_End', new LevelEndScreen(2), false)
game.scene.add('3', new Level(3, 2000), false)
game.scene.add('GameOver', GameOver, false)