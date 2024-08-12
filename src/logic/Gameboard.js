import Ship from './Ship';
import Cell from './Cell';

export default class Gameboard {
  constructor() {
    this.board = this.makeBoard();
    this.misses = [];
    this.hits = [];
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
  inBounds(value) {
    return value > 10 || value < 1 ? false : true;
  }
  // Check for already occupied cell
  overlap(ship, x, y, dir) {
    for (let i = 0; i < ship.length; i++) {
      const cell = dir === x ? this.find(x + i, y) : this.find(x, y + i);
      if (cell.isShip === true) {
        return true;
      }
    }
    return false;
  }
  // Check if a ship can be placed
  canPlaceShip(ship, x, y, direction) {
    // dir equals direction's starting value(x or y) so it can be checked more easily
    const dir = direction === 'hor' ? x : y;
    if (!this.inBounds(dir + ship.length - 1)) return false;
    if (this.overlap(ship, x, y, dir)) return false;
    return true;
  }
  // Mark every cell the ship occupies
  markShip(ship, x, y, dir) {
    for (let i = 0; i < ship.length; i++) {
      const cell = dir === 'hor' ? this.find(x + i, y) : this.find(x, y + i);
      cell.isShip = true;
      cell.ship = ship;
    }
  }
  // Place a ship on the board
  placeShip(ship, x, y, dir) {
    // Check if a ship can be placed on the board
    if (!this.canPlaceShip(ship, x, y, dir)) return false;
    // Place the ship on the board
    this.markShip(ship, x, y, dir);
    return true;
  }
  // Checks if all ships have been sunk
  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
  // Takes a pair of coordinates and determines whether or not
  // the attack hit a ship
  receiveAttack(x, y) {
    // Check if coordinates are in bounds
    if (!this.inBounds(x) || !this.inBounds(y)) return false;

    const cell = this.find(x, y);
    // Check if cell was already attacked previously
    if (this.misses.includes(cell) || this.hits.includes(cell)) {
      return false;
    }
    // Register hit on the ship
    if (cell.isShip) {
      cell.ship.hit();
      this.hits.push(cell);
      return true;
    }
    // Register miss on the board
    if (!cell.isShip) {
      this.misses.push(cell);
      return false;
    }
  }
}
