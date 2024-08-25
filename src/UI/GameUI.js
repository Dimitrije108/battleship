import { createCell, createShip, createSetupBtn } from './utils';
import PlayGame from './PlayGame';
// Sets up the initial game UI
export default class GameUI {
  constructor(player, comp, playGame) {
    this.player = player;
    this.comp = comp;
    this.playGame = playGame;
    this.dragged = null;
    this.init();
  }

  init() {
    this.dispName(this.player.name);
    this.dispBoard(this.player.gameboard);
    this.dispCompBoard(this.comp.gameboard);
    this.dispShips(this.player.board.ships);
    this.initDragStart();
    this.initDragEnd();
    this.initStartBtn();
    this.initRandomizeShips();
    this.initShipDir();
    this.initShipReset();
    this.updateGameStatus();
    this.initBoardAttack();
  }
  // Display player name above the board
  dispName(name) {
    const plName = document.querySelector('.player-name');
    plName.textContent = `Admiral ${name}`;
  }
  // Create and display player gameboard cells
  dispBoard(board) {
    const boardCont = document.querySelector('.board-cont');
    const newBoard = document.createElement('div');
    newBoard.classList.add('board');

    board.forEach((cell) => {
      const square = createCell(cell);
      if (cell.isShip) square.classList.add('ship');
      newBoard.append(square);
    });

    boardCont.append(newBoard);
  }
  // Create and display computer gameboard cells
  dispCompBoard(board) {
    const boardCont = document.querySelector('.comp-board-cont');
    const compBoard = document.createElement('div');
    compBoard.classList.add('board');
    compBoard.classList.add('comp');

    board.forEach((cell) => {
      const square = createCell(cell);
      compBoard.append(square);
    });

    boardCont.append(compBoard);
  }
  // Delete the displayed board
  delBoard(board) {
    if (document.querySelector(`${board}`)) {
      document.querySelector(`${board}`).remove();
    }
  }
  // Display player ships to be placed on the board
  dispShips(ships) {
    const shipsCont = document.querySelector('.ships-cont');

    ships.forEach((ship) => {
      const shipEl = createShip(ship);
      shipEl.dataset.name = ship.name;
      shipEl.draggable = true;
      shipsCont.append(shipEl);
    });
  }
  // Delete unplaced ships
  delShips() {
    const ships = document.querySelectorAll('.unplaced-ship');
    ships.forEach((ship) => ship.remove());
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
  // Setup drag start for a ship
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
      this.delBoard('.board');
      this.dispBoard(this.player.gameboard);
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
  // Enable the comp board to be attacked by the player
  initBoardAttack() {
    const compBoard = document.querySelector('.board.comp');
    compBoard.addEventListener('click', (e) => {
      this.playGame.handleBoardAttack(e);
    });
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
    this.playGame.gameActive = true;
  }
  // Randomize ship placement on the board and display it
  handleRandomizeShips() {
    this.player.board.resetBoard();
    this.player.board.randomizeShips();
    this.delBoard('.board');
    this.dispBoard(this.player.gameboard);
    this.delShips();
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
    this.delBoard('.board');
    this.delShips();
    this.dispBoard(this.player.gameboard);
    this.dispShips(this.player.board.ships);
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
  // Handle game win display status
  handleGameWin(winner) {
    const statusBoard = document.querySelector('.status-board');
    const compBoard = document.querySelector('.board.comp');

    if (winner.name === 'Computer') {
      statusBoard.textContent = `You've lost, better luck next time Admiral ${this.player.name}.`;
    } else {
      statusBoard.textContent = `Congrats Admiral ${this.player.name}! You're the victor!`;
    }
    // Stops the board being clickable
    compBoard.style.pointerEvents = 'none';
    this.playGame.gameActive = false;
    // Create the restart btn
    this.initRestartBtn();
  }

  initRestartBtn() {
    const btn = createSetupBtn('restart-btn', 'Play Again!');
    btn.addEventListener('click', () => this.handleRestart());
  }
  // Restart the game by creating a new PlayGame instance and re-using the
  // same player name
  handleRestart() {
    // Remove the last game's boards
    this.delBoard('.board');
    this.delBoard('.board.comp');
    // Create a new game instance
    new PlayGame(this.player.name);
    // Hide the restart button again
    document.querySelector('.restart-btn').remove();
  }
}
