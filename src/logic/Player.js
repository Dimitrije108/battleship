import Gameboard from './Gameboard';

export class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }

  get gameboard() {
    return this.board.board;
  }
}

export class Computer {
  constructor() {
    this.name = 'Computer';
    this.board = new Gameboard();
    this.attackMoves = this.shuffleMoves(this.addMoves());
  }

  get gameboard() {
    return this.board.board;
  }
  // Create an array of all possible attack moves
  addMoves() {
    const arr = [];
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        arr.push([j, i]);
      }
    }
    return arr;
  }
  // Shuffle all computer attack moves (Fisher-Yates Shuffle)
  shuffleMoves(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  attack() {
    return this.attackMoves.shift();
  }
}
