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
  constructor(playerBoard) {
    this.name = 'Computer';
    this.board = new Gameboard();
    this.playerBoard = playerBoard;
    // Create and shuffle random board moves to be attacked
    this.attackMoves = this.shuffleMoves(this.addMoves());
    this.attPerformed = false;
    // Initial successful hit
    this.initHit = null;
    // Indicates that last hit was a successful one
    this.prevHit = false;
    this.prevHitObj = null;
    // Indicates a ship is found and under attack
    this.shipFound = false;
    // Holds adjacent horizontal and vertical attacks
    this.horAttacks = [];
    this.vertAttacks = [];
    // Ship direction information
    this.horShip = false;
    this.vertShip = false;
  }

  get gameboard() {
    return this.board.board;
  }
  // WRITE TESTS FOR IT?
  // Reset computer attack moves (after each round)
  resetAttacks() {
    this.attackMoves = this.shuffleMoves(this.addMoves());
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
  // Check whether a hit was successful or not and update the prev hit
  wasHitSuccessful(x, y) {
    // Find the attacked cell to check if it was part of a ship
    const cell = this.playerBoard.find(x, y);
    // Update prevHit with the cell that was hit
    if (cell.isShip) {
      this.prevHitObj = cell;
      this.prevHit = true;
      return true;
    }
    this.prevHit = false;
    return false;
  }
  // Attack a random board cell position
  attRandom() {
    const attMove = this.attackMoves.shift();
    // Attack the player board
    this.playerBoard.receiveAttack(attMove[0], attMove[1]);
    // Check if attack was a hit and set init hit if true
    if (this.wasHitSuccessful(attMove[0], attMove[1])) {
      this.initHit = this.prevHitObj;
    }
  }
  // Enqueues attack move objects
  addAttack(arr, x, y, dir) {
    if (this.playerBoard.checkValidity(x, y)) {
      arr.push({
        x: x,
        y: y,
        dir: dir,
      });
    }
  }
  // Add all possible hor and vert adjacent attacks
  addAdjAttacks() {
    const x = this.initHit.x;
    const y = this.initHit.y;

    this.addAttack(this.horAttacks, x - 1, y, -1);
    this.addAttack(this.horAttacks, x + 1, y, 1);
    this.addAttack(this.vertAttacks, x, y - 1, -1);
    this.addAttack(this.vertAttacks, x, y + 1, 1);
  }
  // Enqueue the next attack depending on ship's dir
  enqueueAttack(arr, x, y, dir) {
    let newX = x;
    let newY = y;

    if (this.horShip) {
      newX = x + dir * 1;
    } else {
      newY = y + dir * 1;
    }
    this.addAttack(arr, newX, newY, dir);
  }
  // Perform an attack on adjacent cell
  attAdjacent(arr, shipDir) {
    // Attack enqueued moves until there's no more or a ship is destroyed
    if (arr.length) {
      const att = arr.shift();
      // Attack the player board
      this.playerBoard.receiveAttack(att.x, att.y);
      // Delete the performed attack from attackMoves
      this.delPerformedAtt(att.x, att.y);
      // Check if attack was a hit, establish dir and enqueue the next one
      if (this.wasHitSuccessful(att.x, att.y)) {
        shipDir === 'hor' ? (this.horShip = true) : (this.vertShip = true);
        this.enqueueAttack(arr, att.x, att.y, att.dir);
      }
    }
    // If  ship's dir was established and the queue is empty, reset it
    // back to the start so random attacks can continue
    if ((this.horShip || this.vertShip) && !arr.length) {
      this.shipFound = false;
      this.prevHit = false;
      this.horShip = false;
      this.vertShip = false;
      this.horAttacks = [];
      this.vertAttacks = [];
      return;
    }
  }
  // Attack adjacent cells until a ship is downed
  handleAdjAttacks() {
    if (this.horAttacks.length) {
      this.attAdjacent(this.horAttacks, 'hor');
    } else {
      this.attAdjacent(this.vertAttacks, 'vert');
    }
  }
  // Find and delete the performed attack so it's not attacked again later on
  delPerformedAtt(attX, attY) {
    // Find the attack
    const attIndex = this.attackMoves.findIndex(
      ([x, y]) => attX === x && attY === y
    );
    // If found delete the attack move
    if (attIndex !== -1) {
      this.attackMoves.splice(attIndex, 1);
    }
  }
  // Depending on the current state perform an attack on the player board
  attack() {
    this.attPerformed = false;
    // Fallback reset if both horAttacks and vertAttacks are empty
    if (!this.horAttacks.length && !this.vertAttacks.length) {
      this.shipFound = false;
      this.horShip = false;
      this.vertShip = false;
    }
    // If a successful hit occurred retrieve adjacent moves to be attacked
    if (!this.shipFound && this.prevHit) {
      this.addAdjAttacks();
      this.shipFound = true;
    }
    // Find the ship dir by attacking adjacent cells and destroy it
    if (this.horAttacks.length || this.vertAttacks.length) {
      this.handleAdjAttacks();
      this.attPerformed = true;
    }
    // Do the standard random attack move
    if (!this.prevHit && !this.shipFound && !this.attPerformed) {
      this.attRandom();
    }
  }
}
