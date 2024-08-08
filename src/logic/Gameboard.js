import Ship from './Ship';

class Node {
  constructor(x, y) {
    this.xCoord = x;
    this.yCoord = y;
    this.shipSpot = false;
  }
}

export default class Gameboard {
  constructor() {
    this.board = this.makeBoard();
    this.ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
  }
  // Construct the 10x10 battleship gameboard
  makeBoard() {
    const arr = [];
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        arr.push(new Node(i, j));
      }
    }
  }
  // Check for out of bounds ship placement
  // checkBounds(value) {
  //   return value > 10 || value < 1 ? false : true;
  // }
  // // Place a ship on the board
  // placeShip(ship, xCoord, yCoord, dir) {
  //   if (
  //     checkBounds(xCoord + ship.length - 1) &&
  //     checkBounds(yCoord + ship.length - 1)
  //   ) {

  //   }
  // }
}
