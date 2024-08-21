import Ship from './Ship';
import Cell from './Cell';

export default class Gameboard {
  constructor() {
    this.board = this.makeBoard();
    this.misses = [];
    this.hits = [];
    this.dir = 'hor';
    this.ships = [
      new Ship(5, 'carrier'),
      new Ship(4, 'battleship'),
      new Ship(3, 'destroyer'),
      new Ship(3, 'submarine'),
      new Ship(2, 'patrol'),
    ];
  }
  // Construct the 10x10 battleship gameboard
  makeBoard() {
    const arr = [];
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        arr.push(new Cell(j, i));
      }
    }
    return arr;
  }
  // Resets the board
  resetBoard() {
    this.board = this.makeBoard();
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
  canPlaceShip(ship, x, y) {
    // dir equals direction's starting value(x or y) so it can be checked more easily
    const dir = this.dir === 'hor' ? x : y;
    if (!this.inBounds(dir + ship.length - 1)) return false;
    if (this.overlap(ship, x, y, dir)) return false;
    return true;
  }
  // Mark every cell the ship occupies
  markShip(ship, x, y) {
    for (let i = 0; i < ship.length; i++) {
      const cell =
        this.dir === 'hor' ? this.find(x + i, y) : this.find(x, y + i);
      cell.isShip = true;
      cell.ship = ship;
    }
  }
  // Place a ship on the board
  placeShip(ship, x, y) {
    // Check param validity
    if (typeof ship !== 'object') return;
    if (!x && !y) return;
    if (this.dir !== 'hor' && this.dir !== 'vert') return;
    // Check if a ship can be placed on the board
    if (!this.canPlaceShip(ship, x, y)) return false;
    // Place the ship on the board
    this.markShip(ship, x, y);
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
      cell.isHit = true;
      this.hits.push(cell);
      return true;
    }
    // Register miss on the board
    if (!cell.isShip) {
      cell.isHit = true;
      this.misses.push(cell);
      return false;
    }
  }
  // Pick a random board coord from 1 to 10
  randomizeCoord() {
    return Math.floor(Math.random() * 10) + 1;
  }
  // Randomly places all ships on the board
  randomizeShips() {
    this.ships.forEach((ship) => {
      const randomDir = Math.floor(Math.random() * 2);
      this.dir = randomDir === 0 ? 'hor' : 'vert';

      let x = this.randomizeCoord();
      let y = this.randomizeCoord();

      while (!this.canPlaceShip(ship, x, y)) {
        x = this.randomizeCoord();
        y = this.randomizeCoord();
      }

      this.placeShip(ship, x, y);
    });
  }
  // Return an array of potential ship landing board cells
  // (When dragging a ship over the board it shows how a ship would be placed
  // by highlighting the cells)
  // dropTargetCells(ship, x, y) {
  //   const arr = [];
  //   for (let i = 0; i < ship.length; i++) {
  //     const cell =
  //       this.dir === 'hor' ? this.find(x + i, y) : this.find(x, y + i);
  //     arr.push(cell);
  //   }
  //   return arr;
  // }
}
