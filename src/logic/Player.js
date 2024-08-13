import Gameboard from './Gameboard';

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }

  get gameboard() {
    return this.board.board;
  }
}
