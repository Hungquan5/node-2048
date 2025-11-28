const Game2048 = require('../src/game2048');

function testInitialization() {
  const game = new Game2048();
  let sum = 0;
  for (let r = 0; r < game.size; r++)
    for (let c = 0; c < game.size; c++)
      sum += (game.board[r][c] !== 0) ? 1 : 0;
  console.assert(sum === 2, "Should initialize with 2 tiles");
  console.log("testInitialization passed.");
}

function testMoveLeft() {
  const game = new Game2048();
  game.board = [
    [2, 2, 4, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  game.move('left');
  console.assert(game.board[0][0] === 4 && game.board[0][1] === 4, "Move left should combine tiles");
  console.log("testMoveLeft passed.");
}

testInitialization();
testMoveLeft();
console.log("All tests passed.");