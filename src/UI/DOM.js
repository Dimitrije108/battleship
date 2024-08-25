import { Player, Computer } from '../logic/Player';
import {
  dispName,
  dispBoard,
  dispCompBoard,
  delBoard,
  dispShips,
  delShips,
  createSetupBtn,
} from './displayBoard';
// PlayGame class takes in a player name and initiates a new game
export default class PlayGame {
  constructor(player = 'Ackbar') {
    this.player = new Player(player);
    this.comp = new Computer();
    this.initSetup();
    this.dragged = null;
    this.gameActive = false;
  }
  // TODO: place event listeners in a single init method
  // TODO: create handlers outside the init
  initSetup() {
    dispName(this.player.name);
    dispBoard(this.player.gameboard);
    dispShips(this.player.board.ships);
    dispCompBoard(this.comp.gameboard);
    this.initDragStart();
    this.initDragEnd();
    this.initStartBtn();
    this.initRandomizeShips();
    this.initShipDir();
    this.initShipReset();
    this.updateGameStatus();
    this.initBoardAttack();
  }
  // Add dragstart listeners to unplaced ships so they can be dragged
  initDragStart() {
    const unplacedShips = document.querySelectorAll('.unplaced-ship');

    unplacedShips.forEach((ship) => {
      ship.addEventListener('dragstart', (e) => {
        this.handleDragStart(ship, e);
      });

      ship.addEventListener('dragend', () => {
        this.dragged = null;
        ship.classList.remove('dragging');
      });
    });
  }

  handleDragStart(ship, e) {
    const shipName = ship.dataset.name;
    // Find the dragged ship object
    this.dragged = this.player.board.ships.find(
      (ship) => ship.name === shipName
    );
    e.dataTransfer.effectAllowed = 'move';
    // Add class so it can be recognized easier
    e.target.classList.add('dragging');
  }
  // Add all other drag listeners so a ship can be placed on the board
  initDragEnd() {
    const board = document.querySelector('.board');
    board.addEventListener('dragover', (e) => this.handleDragOver(e));
    board.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    board.addEventListener('drop', (e) => this.handleDrop(e));
  }

  handleDragOver(e) {
    e.preventDefault();
    const draggable = document.querySelector('.unplaced-ship.dragging');
    // Prevent placed item being draggable again issue
    if (!draggable) {
      e.dataTransfer.dropEffect = 'none';
      return;
    }
    e.dataTransfer.dropEffect = 'move';
    // Highlight cell the ship will potentially be placed on
    e.target.classList.add('highlight');
  }

  handleDragLeave(e) {
    e.preventDefault();
    // Remove the highlight cell effect when a cell is no longer hovered over
    e.target.classList.remove('highlight');
  }

  handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('highlight');
    // Prevent placed item being draggable again issue
    const draggable = document.querySelector('.unplaced-ship.dragging');
    if (!draggable) return;

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);
    // Pass the required info for a ship to be placed on the board
    this.handleShipPlacement(x, y);
  }
  // If a ship is able to be placed on the board, place it
  handleShipPlacement(x, y) {
    if (this.player.board.placeShip(this.dragged, x, y)) {
      this.player.board.placeShip(this.dragged, x, y);
      delBoard('.board');
      dispBoard(this.player.gameboard);
      this.initDragEnd();
      // Delete the placed ship el so it's no longer available
      document.querySelector('.dragging').remove();
      // Check if all ships are placed on the board
      this.updateGameStatus();
    }
  }
  // Setup all btn listeners: start, randomize ships, change ship dir and reset ships
  initStartBtn() {
    const btn = createSetupBtn('start-btn', 'Start!');
    btn.addEventListener('click', () => this.handleStartGame());
  }

  initRandomizeShips() {
    const btn = createSetupBtn('randomize-ships-btn', 'Randomize ships');
    btn.addEventListener('click', () => this.handleRandomizeShips());
  }

  initShipDir() {
    const btn = createSetupBtn('change-dir-btn', 'Change direction');
    btn.addEventListener('click', () => this.handleShipDir());
  }

  initShipReset() {
    const btn = createSetupBtn('reset-ships-btn', 'Reset ships');
    btn.addEventListener('click', () => this.handleShipReset());
  }
  // Initiates the start of the game
  handleStartGame() {
    const statusBoard = document.querySelector('.status-board');
    const btnCont = document.querySelector('.btn-cont');
    // Randomize ship placement for the computer player
    this.comp.board.randomizeShips();
    // Remove setup buttons
    btnCont.textContent = '';
    statusBoard.textContent = `Good luck Admiral ${this.player.name}!`;
    // Initiate active game state
    this.gameActive = true;
  }
  // Randomize ship placement on the board and display it
  handleRandomizeShips() {
    this.player.board.resetBoard();
    this.player.board.randomizeShips();
    delBoard('.board');
    dispBoard(this.player.gameboard);
    delShips();
    this.updateGameStatus();
  }
  // Change the ship direction and display it as such
  handleShipDir() {
    // Update gameboard ship dir
    this.player.board.dir = this.player.board.dir === 'hor' ? 'vert' : 'hor';
    const unplacedShips = document.querySelectorAll('.unplaced-ship');
    // Change flex position on every ship to represent ship placement direction
    unplacedShips.forEach((ship) => {
      const dir = ship.style.flexDirection || 'row';
      ship.style.flexDirection = dir === 'row' ? 'column' : 'row';
    });
  }
  // Resets ships to their initial unplaced position so they can be placed again
  handleShipReset() {
    this.player.board.resetBoard();
    delBoard('.board');
    delShips();
    dispBoard(this.player.gameboard);
    dispShips(this.player.board.ships);
    this.initDragStart();
    this.initDragEnd();
    this.player.board.dir = 'hor';
    this.updateGameStatus();
  }
  // Check if all ships are placed on the board
  allShipsPlaced() {
    const shipsCont = document.querySelector('.ships-cont');
    return shipsCont.children.length === 0;
  }
  // Reflect the setup or the start game phase
  updateGameStatus() {
    const statusBoard = document.querySelector('.status-board');
    const startBtn = document.querySelector('.start-btn');
    // Don't enable start until all ships have been placed on the board
    if (!this.allShipsPlaced()) {
      statusBoard.textContent = `Place your ships Admiral ${this.player.name}!`;
      startBtn.disabled = true;
      return;
    }
    // Enable the start button
    statusBoard.textContent = `Press start to begin, Admiral ${this.player.name}!`;
    startBtn.disabled = false;
  }
  // Enable the comp board to be attacked by the player
  initBoardAttack() {
    const compBoard = document.querySelector('.board.comp');
    compBoard.addEventListener('click', (e) => this.handleBoardAttack(e));
  }
  // Attack the board if allowed and process the computer attack as well
  handleBoardAttack(e) {
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);
    // Check attack validity
    if (this.gameActive && x && y) {
      this.playerAttack(x, y);
      if (this.gameActive) {
        setTimeout(() => this.compAttack(), 500);
      }
    }
  }
  // Handle game win status
  gameWon(winner) {
    const statusBoard = document.querySelector('.status-board');
    const compBoard = document.querySelector('.board.comp');
    const restartBtn = document.querySelector('.restart-btn');

    if (winner.name === 'Computer') {
      statusBoard.textContent = `You've lost, better luck next time Admiral ${this.player.name}.`;
    } else {
      statusBoard.textContent = `Congrats Admiral ${this.player.name}! You're the victor!`;
    }
    // Stops the board being clickable
    compBoard.style.pointerEvents = 'none';
    this.gameActive = false;
    // Show the restart btn
    restartBtn.style.display = 'block';
    // Store player name (in restart btn data attribute) so it can be reused
    restartBtn.dataset.name = this.player.name;
  }
  // Handle computer attack
  compAttack() {
    const attMove = this.comp.attack();
    this.player.board.receiveAttack(attMove[0], attMove[1]);
    delBoard('.board');
    dispBoard(this.player.gameboard);

    if (this.player.board.allShipsSunk()) {
      this.gameWon(this.comp);
    }
  }
  // Handle player attack
  playerAttack(x, y) {
    this.comp.board.receiveAttack(x, y);
    // Reset comp board display to update the attack
    delBoard('.board.comp');
    dispCompBoard(this.comp.gameboard);
    this.initBoardAttack();

    if (this.comp.board.allShipsSunk()) {
      this.gameWon(this.player);
    }
  }
}
