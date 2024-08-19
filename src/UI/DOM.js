import Player from '../logic/Player';
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
    this.comp = new Player('comp');
    this.initBoard();
    this.dragged = null;
  }

  initBoard() {
    dispName(this.player.name);
    dispBoard(this.player.gameboard);
    dispShips(this.player.board.ships);
    dispCompBoard(this.comp.gameboard);
    this.initDragStart();
    this.initDraggable();
    this.initResetBtn();
    this.changeShipDir();
    this.updateStatusBoard();
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
        delBoard();
        dispBoard(this.player.gameboard);
        // Delete ship el
        document.querySelector('.dragging').remove();
        // Check if all ships are placed
        this.updateStatusBoard();
      }
    });
  }

  initResetBtn() {
    const resetBtn = document.querySelector('.reset-ships-btn');

    resetBtn.addEventListener('click', () => {
      this.player.board.resetBoard();
      delBoard();
      delShips();
      dispBoard(this.player.gameboard);
      dispShips(this.player.board.ships);
      this.initDragStart();
      this.player.board.dir = 'hor';
      this.updateStatusBoard();
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

  allShipsPlaced() {
    const shipsCont = document.querySelector('.ships-cont');
    return shipsCont.children.length === 0;
  }

  updateStatusBoard() {
    const statusBoard = document.querySelector('.status-board');
    if (!this.allShipsPlaced()) {
      statusBoard.textContent = `Place your ships Admiral ${this.player.name}!`;
      return;
    }
    statusBoard.textContent = `Press start to begin, Admiral ${this.player.name}!`;
  }

  // start game button event

  // const oppBoard = document.querySelector('.board.comp');

  // // perform an attack on random enemy cell
  // // don't attack the same cell twice

  // // possibly add timeout and disable player attack during it
  // // so as to simulate delay between play
  // // add timeout into the func call itself, not here

  // const handleAttack = (x, y) => {
  //   // this.comp.board.receiveAttack(x, y);
  //   // displayBoard(comp.gameboard);
  //   // this.player.board.receiveAttack(this.comp.attack());
  // };

  // oppBoard.addEventListener('click', (e) => {
  //   handleAttack(e.target.dataset.x, e.target.dataset.y);
  // });
}
