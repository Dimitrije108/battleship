// Create gameboard cell
export function createCell(cell) {
  const square = document.createElement('div');
  square.classList.add('cell');
  square.dataset.x = cell.x;
  square.dataset.y = cell.y;
  if (cell.isHit) square.classList.add('hit');
  if (cell.isHit && cell.isShip) square.classList.add('hit-ship');
  return square;
}
// Create player ships
export function createShip(ship) {
  const shipCont = document.createElement('div');
  shipCont.classList.add('unplaced-ship');

  for (let i = 0; i < ship.length; i++) {
    const square = document.createElement('div');
    square.classList.add('unplaced');
    shipCont.append(square);
  }

  return shipCont;
}
// Create, append and return a button for the game setup phase
export function createSetupBtn(className, text) {
  const cont = document.querySelector('.btn-cont');
  const btn = document.createElement('button');
  btn.classList.add(className);
  btn.textContent = text;
  cont.append(btn);
  return btn;
}
