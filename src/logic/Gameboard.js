import Ship from './Ship';

class Cell {
  constructor(x, y) {
    this.xCoord = x;
    this.yCoord = y;
    this.shipPart = false;
  }

  get x() {
    return this.xCoord;
  }

  get y() {
    return this.yCoord;
  }

  get isShip() {
    return this.shipPart;
  }

  set isShip(bool) {
    this.shipPart = bool;
  }
}

export default class Gameboard {
  constructor() {
    this.board = this.makeBoard();
    this.missed = [];
    this.hit = [];
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
        arr.push(new Cell(i, j));
      }
    }
    return arr;
  }
  // Find board cell
  find(x, y) {
    return this.board.find((node) => node.x === x && node.y === y);
  }
  // Check for out of bounds ship placement
  checkBounds(value) {
    return value > 10 || value < 1 ? false : true;
  }
  // Check for already occupied cell
  checkOverlap(ship, x, y, dir) {
    for (let i = 0; i < ship.length; i++) {
      const cell = dir === x ? this.find(x + i, y) : this.find(x, y + i);
      if (cell.isShip === true) {
        return false;
      }
    }
    return true;
  }
  // Check if a ship can be placed
  canPlaceShip(ship, x, y, direction) {
    // dir equals direction's starting value(x or y) so it can be checked more easily
    const dir = direction === 'hor' ? x : y;
    if (!this.checkBounds(dir + ship.length - 1)) return false;
    if (!this.checkOverlap(ship, x, y, dir)) return false;
    return true;
  }
  // Mark every cell the ship occupies
  markShip(ship, x, y, direction) {
    for (let i = 0; i < ship.length; i++) {
      const cell =
        direction === 'hor' ? this.find(x + i, y) : this.find(x, y + i);
      cell.isShip = true;
    }
  }
  // Place a ship on the board
  placeShip(ship, x, y, direction) {
    // Check if a ship can be placed on the board
    if (!this.canPlaceShip(ship, x, y, direction)) return false;
    // Place the ship on the board
    this.markShip(ship, x, y, direction);
    return true;
  }

  // receiveAttack(x, y) {
  //   const cell = find(x, y);
  //   // Check if cell is among missed cells
  //   for (const miss of missed) {
  //     if (cell === miss) return false;
  //   }
  //   // try to find missed node this way
  //   this.missed.find((node) => node.x === x && node.y === y);

  // check if cell is among visited first
  // if cell isn't part of a ship then record it as visited
  // check if it's a ship and if it's hit
  // }
}
