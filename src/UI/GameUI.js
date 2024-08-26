import { createSetupBtn } from './utils';
import PlayGame from './PlayGame';
import BoardDisplay from './BoardDisplay';
import DragAndDrop from './DragAndDrop';
// Sets up the initial game UI
export default class GameUI {
  constructor(player, comp, playGame) {
    this.player = player;
    this.comp = comp;
    this.playGame = playGame;
    this.boardDisplay = new BoardDisplay();
    this.dragAndDrop = new DragAndDrop(
      this.player,
      this.boardDisplay,
      this.updateGameStatus.bind(this)
    );
    this.init();
  }

  init() {
    this.boardDisplay.dispName(this.player.name);
    this.boardDisplay.dispBoard(this.player.gameboard);
    this.boardDisplay.dispCompBoard(this.comp.gameboard);
    this.boardDisplay.dispShips(this.player.board.ships);
    this.dragAndDrop.initDragStart();
    this.dragAndDrop.initDragEnd();
    this.initStartBtn();
    this.initRandomizeShips();
    this.initShipDir();
    this.initShipReset();
    this.updateGameStatus();
    this.initBoardAttack();
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
    this.boardDisplay.delBoard('.board');
    this.boardDisplay.dispBoard(this.player.gameboard);
    this.boardDisplay.delShips();
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
    this.boardDisplay.delBoard('.board');
    this.boardDisplay.delShips();
    this.boardDisplay.dispBoard(this.player.gameboard);
    this.boardDisplay.dispShips(this.player.board.ships);
    this.dragAndDrop.initDragStart();
    this.dragAndDrop.initDragEnd();
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
    this.boardDisplay.delBoard('.board');
    this.boardDisplay.delBoard('.board.comp');
    // Create a new game instance
    new PlayGame(this.player.name);
    // Hide the restart button again
    document.querySelector('.restart-btn').remove();
  }
}
