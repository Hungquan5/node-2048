const readline = require('readline');
const Game2048 = require('./game2048');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = new Game2048();

function promptMove() {
  game.printBoard();
  if (game.isGameOver()) {
    console.log("Game Over! Final Score:", game.score);
    rl.close();
    return;
  }
  rl.question("Enter move (up/down/left/right or q to quit): ", (ans) => {
    if (ans === 'q') {
      rl.close();
      return;
    }
    if (["up", "down", "left", "right"].includes(ans)) {
      game.move(ans);
    } else {
      console.log("Invalid move!");
    }
    promptMove();
  });
}

promptMove();