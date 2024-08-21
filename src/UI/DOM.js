import { Player, Computer } from '../logic/Player';
import {
  dispName,
  dispBoard,
  dispCompBoard,
  delBoard,
  dispShips,
  delShips,
} from './displayBoard';
// PlayGame class takes in a player and initiates a game
export default class PlayGame {
  constructor(player = 'Ackbar') {
    this.player = new Player(player);
    this.comp = new Computer();
    this.initSetup();
    this.dragged = null;
  }

  // TODO: place event listeners in a single init method
  // TODO: create handlers outside the init

  initSetup() {
    dispName(this.player.name);
    dispBoard(this.player.gameboard);
    dispShips(this.player.board.ships);
    dispCompBoard(this.comp.gameboard);
    this.initDragStart();
    this.initDraggable();
    this.handleRandomizeShips();
    this.initResetBtn();
    this.changeShipDir();
    this.updateGameStatus();
  }

  initDragStart() {
    const unplacedShips = document.querySelectorAll('.unplaced-ship');

    unplacedShips.forEach((ship) => {
      ship.addEventListener('dragstart', (e) => {
        const shipName = ship.dataset.name;
        // Find the dragged ship object
        this.dragged = this.player.board.ships.find(
          (ship) => ship.name === shipName
        );
        e.dataTransfer.effectAllowed = 'move';
        e.target.classList.add('dragging');
      });

      ship.addEventListener('dragend', () => {
        this.dragged = null;
      });
    });
  }

  initDraggable() {
    const board = document.querySelector('.board');

    board.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggable = document.querySelector('.unplaced-ship.dragging');
      // Prevent placed item being draggable issue
      if (!draggable) {
        e.dataTransfer.dropEffect = 'none';
        return;
      }
      e.dataTransfer.dropEffect = 'move';
      e.target.classList.add('highlight');
    });

    board.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.target.classList.remove('highlight');
    });

    board.addEventListener('drop', (e) => {
      e.preventDefault();
      e.target.classList.remove('highlight');
      // Prevent placed item being draggable issue
      const draggable = document.querySelector('.unplaced-ship.dragging');
      if (!draggable) return;

      const x = Number(e.target.dataset.x);
      const y = Number(e.target.dataset.y);
      if (this.player.board.placeShip(this.dragged, x, y)) {
        this.player.board.placeShip(this.dragged, x, y);
        delBoard('.board');
        dispBoard(this.player.gameboard);
        // Delete ship el
        document.querySelector('.dragging').remove();
        // Check if all ships are placed
        this.updateGameStatus();
      }
    });
  }

  initResetBtn() {
    const resetBtn = document.querySelector('.reset-ships-btn');

    resetBtn.addEventListener('click', () => {
      this.player.board.resetBoard();
      delBoard('.board');
      delShips();
      dispBoard(this.player.gameboard);
      dispShips(this.player.board.ships);
      this.initDragStart();
      this.player.board.dir = 'hor';
      this.updateGameStatus();
    });
  }

  changeShipDir() {
    const changeDirBtn = document.querySelector('.change-dir-btn');

    changeDirBtn.addEventListener('click', () => {
      // Update gameboard ship dir
      this.player.board.dir = this.player.board.dir === 'hor' ? 'vert' : 'hor';
      const unplacedShips = document.querySelectorAll('.unplaced-ship');
      // Change flex position on every ship to represent ship placement direction
      unplacedShips.forEach((ship) => {
        const dir = ship.style.flexDirection || 'row';
        ship.style.flexDirection = dir === 'row' ? 'column' : 'row';
      });
    });
  }

  handleRandomizeShips() {
    const randomizeBtn = document.querySelector('.randomize-ships-btn');
    randomizeBtn.addEventListener('click', () => {
      this.player.board.resetBoard();
      this.player.board.randomizeShips();
      delBoard('.board');
      dispBoard(this.player.gameboard);
      delShips();
      this.updateGameStatus();
    });
  }

  allShipsPlaced() {
    const shipsCont = document.querySelector('.ships-cont');
    return shipsCont.children.length === 0;
  }

  updateGameStatus() {
    const statusBoard = document.querySelector('.status-board');
    const startBtn = document.querySelector('.start-btn');

    if (!this.allShipsPlaced()) {
      statusBoard.textContent = `Place your ships Admiral ${this.player.name}!`;
      startBtn.disabled = true;
      return;
    }
    statusBoard.textContent = `Press start to begin, Admiral ${this.player.name}!`;
    startBtn.disabled = false;
    this.startGame();
  }

  startGame() {
    const startBtn = document.querySelector('.start-btn');
    const statusBoard = document.querySelector('.status-board');
    const btnCont = document.querySelector('.btn-cont');

    startBtn.addEventListener('click', () => {
      this.comp.board.randomizeShips();
      this.initPlay();
      startBtn.remove();
      btnCont.remove();
      statusBoard.textContent = `Good luck Admiral ${this.player.name}!`;
    });
  }

  initPlay() {
    const compBoard = document.querySelector('.board.comp');

    compBoard.addEventListener('click', (e) => {
      this.playerAttack(Number(e.target.dataset.x), Number(e.target.dataset.y));
    });
  }

  gameWon(winner) {
    const statusBoard = document.querySelector('.status-board');
    const compBoard = document.querySelector('.board.comp');

    if (winner.name === 'Computer') {
      statusBoard.textContent = `You've lost, better luck next time Admiral ${this.player.name}.`;
    }
    statusBoard.textContent = `Congrats Admiral ${this.player.name}! You're the victor!`;
    // stop playability after win:
    compBoard.style.pointerEvents = 'none';
    // create restart btn
    // add restart btn functionality

    // make a restart button appear
    // which will reset all back to beginning
    // except for the player name
  }

  compAttack() {
    const attMove = this.comp.attack();
    this.player.board.receiveAttack(attMove[0], attMove[1]);
    delBoard('.board');
    dispBoard(this.player.gameboard);

    if (this.player.board.allShipsSunk()) {
      this.gameWon(this.comp);
      return;
    }
  }

  playerAttack(x, y) {
    this.comp.board.receiveAttack(x, y);
    delBoard('.board.comp');
    dispCompBoard(this.comp.gameboard);

    if (this.comp.board.allShipsSunk()) {
      this.gameWon(this.player);
      return;
    }

    setTimeout(() => this.compAttack(), 500);
  }
  // Bonus: once a ship isSunk() display it as such?
}
