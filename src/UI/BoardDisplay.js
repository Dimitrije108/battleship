import { createCell, createShip } from './utils';
// Display player name, boards and ships to be placed on player board
export default class BoardDisplay {
  constructor() {}
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
}
