class Game2048 {
  constructor(size = 4) {
    this.size = size;
    this.board = this.createBoard();
    this.score = 0;
    this.spawn();
    this.spawn();
  }

  createBoard() {
    return Array.from({ length: this.size }, () =>
      Array(this.size).fill(0)
    );
  }

  spawn() {
    let empty = [];
    for (let r = 0; r < this.size; r++)
      for (let c = 0; c < this.size; c++)
        if (this.board[r][c] === 0) empty.push([r, c]);
    if (empty.length === 0) return false;
    let [r, c] = empty[Math.floor(Math.random() * empty.length)];
    this.board[r][c] = Math.random() > 0.9 ? 4 : 2;
    return true;
  }

  slide(row) {
    let arr = row.filter(v => v);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        this.score += arr[i];
        arr[i + 1] = 0;
      }
    }
    return arr.filter(v => v).concat(Array(this.size - arr.filter(v => v).length).fill(0));
  }

  move(dir) {
    let moved = false;
    switch (dir) {
      case 'left':
        for (let r = 0; r < this.size; r++) {
          let old = [...this.board[r]];
          this.board[r] = this.slide(this.board[r]);
          if (old.join() !== this.board[r].join()) moved = true;
        }
        break;
      case 'right':
        for (let r = 0; r < this.size; r++) {
          let old = [...this.board[r]];
          this.board[r] = this.slide(this.board[r].slice().reverse()).reverse();
          if (old.join() !== this.board[r].join()) moved = true;
        }
        break;
      case 'up':
        for (let c = 0; c < this.size; c++) {
          let col = [];
          for (let r = 0; r < this.size; r++) col.push(this.board[r][c]);
          let old = [...col];
          let newCol = this.slide(col);
          for (let r = 0; r < this.size; r++) this.board[r][c] = newCol[r];
          if (old.join() !== newCol.join()) moved = true;
        }
        break;
      case 'down':
        for (let c = 0; c < this.size; c++) {
          let col = [];
          for (let r = 0; r < this.size; r++) col.push(this.board[r][c]);
          let old = [...col];
          let newCol = this.slide(col.reverse()).reverse();
          for (let r = 0; r < this.size; r++) this.board[r][c] = newCol[r];
          if (old.join() !== newCol.join()) moved = true;
        }
        break;
    }
    if (moved) this.spawn();
    return moved;
  }

  isGameOver() {
    for (let r = 0; r < this.size; r++)
      for (let c = 0; c < this.size; c++)
        if (this.board[r][c] === 0) return false;
    for (const dir of ["left", "right", "up", "down"])
      if (this.canMove(dir)) return false;
    return true;
  }

  canMove(dir) {
    let test = new Game2048(this.size);
    test.board = this.board.map(r => [...r]);
    return test.move(dir);
  }

  printBoard() {
    console.log(`Score: ${this.score}`);
    for (let r = 0; r < this.size; r++)
      console.log(this.board[r].map(v => v ? v.toString().padStart(4) : '   .').join(' '));
    console.log('');
  }
}

module.exports = Game2048;
