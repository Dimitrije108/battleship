// Create and display player gameboard cells
export function dispBoard(board) {
  const boardCont = document.querySelector('.board');
  boardCont.classList.add('board');

  board.forEach((cell) => {
    const square = createCell(cell);
    if (cell.isShip) square.classList.add('ship');
    boardCont.append(square);
  });
}
// Create and display player computer cells
export function dispCompBoard(board) {
  const cont = document.querySelector('.comp-board');

  const boardCont = document.createElement('div');
  boardCont.classList.add('board');
  boardCont.classList.add('comp');

  board.forEach((cell) => {
    const square = createCell(cell);
    boardCont.append(square);
  });

  cont.append(boardCont);
}

export function delBoard() {
  if (document.querySelector('.board')) {
    document.querySelector('.board').textContent = '';
  }
}
// Display player name above the board
export function dispName(name) {
  const plName = document.querySelector('.player-name');
  plName.textContent = `Admiral ${name}`;
}
// Create gameboard cell
function createCell(cell) {
  const square = document.createElement('div');
  square.classList.add('cell');
  square.dataset.x = cell.x;
  square.dataset.y = cell.y;
  if (cell.isHit) square.classList.add('hit');
  if (cell.isHit && cell.isShip) square.classList.add('hitShip');
  return square;
}
// Display player ships to be placed on the board
export function dispShips(ships) {
  const cont = document.querySelector('.player-board');
  const shipsCont = document.createElement('div');
  shipsCont.classList.add('ships-cont');

  ships.forEach((ship) => {
    const shipEl = createShip(ship);
    shipEl.dataset.name = ship.name;
    shipEl.draggable = true;
    shipsCont.append(shipEl);
  });

  cont.append(shipsCont);
}
// Create player ships
function createShip(ship) {
  const shipCont = document.createElement('div');
  shipCont.classList.add('unplaced-ship');

  for (let i = 0; i < ship.length; i++) {
    const square = document.createElement('div');
    square.classList.add('unplaced');
    shipCont.append(square);
  }

  return shipCont;
}

export function delShips() {
  document.querySelector('.ships-cont').remove();
}
