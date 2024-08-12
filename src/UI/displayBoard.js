// Create and display all gameboard cells
export default function displayBoard(board, ships = false) {
  const cont = document.querySelector('.gameboard-cont');
  const boardCont = document.createElement('div');
  boardCont.classList.add('board');
  board.forEach((cell) => {
    const square = document.createElement('div');
    square.classList.add('cell');
    square.dataset.x = cell.x;
    square.dataset.y = cell.y;
    if (cell.isHit) square.classList.add('hit');
    if (cell.isHit && cell.isShip) square.classList.add('hitShip');
    if (ships && cell.isShip) square.classList.add('ship');
    boardCont.append(square);
  });
  cont.append(boardCont);
}
