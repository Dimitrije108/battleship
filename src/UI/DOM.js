import Player from '../logic/Player';
import {
  dispName,
  dispBoard,
  dispCompBoard,
  delBoard,
  dispShips,
} from './displayBoard';
// PlayGame class takes in a player and initiates a game
export default class PlayGame {
  constructor(player = 'Ackbar') {
    this.player = new Player(player);
    this.comp = new Player('comp');
    this.initBoard();
    this.initDraggable();
  }

  initBoard() {
    dispName(this.player.name);
    dispBoard(this.player.gameboard);
    dispShips(this.player.board.ships);
    dispCompBoard(this.comp.gameboard);
  }

  initDraggable() {
    const board = document.querySelector('.board');

    board.addEventListener('drop', (e) => {
      e.preventDefault();
      const shipName = e.dataTransfer.getData('text/plain');
      const ship = this.player.board.ships.find(
        (ship) => ship.name === shipName
      );
      const x = Number(e.target.dataset.x);
      const y = Number(e.target.dataset.y);
      if (this.player.board.placeShip(ship, x, y, 'hor')) {
        this.player.board.placeShip(ship, x, y, 'hor');
        delBoard();
        dispBoard(this.player.gameboard);
        // Delete ship el
        document.querySelector(`.${shipName}`).remove();
      }
    });
  }
  // there will be a place ship on the board event and method
  // but it will just be an event that triggers user input
  // and then it calls this.player.board.placeShip()

  // there will be a start game button
}

function playGame() {
  const oppBoard = document.querySelector('.board.comp');

  // perform an attack on random enemy cell
  // don't attack the same cell twice

  // possibly add timeout and disable player attack during it
  // so as to simulate delay between play
  // add timeout into the func call itself, not here

  const handleAttack = (x, y) => {
    // this.comp.board.receiveAttack(x, y);
    // displayBoard(comp.gameboard);
    // this.player.board.receiveAttack(this.comp.attack());
  };

  oppBoard.addEventListener('click', (e) => {
    handleAttack(e.target.dataset.x, e.target.dataset.y);
  });
}
