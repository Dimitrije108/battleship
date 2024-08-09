import Gameboard from './Gameboard';

test('ship placed', () => {
  const board = new Gameboard();
  expect(board.placeShip(board.ships[0], 5, 5, 'vert')).toBeTruthy();
});

test('ship out of bounds', () => {
  const board = new Gameboard();
  expect(board.placeShip(board.ships[0], 10, 7, 'vert')).toBeFalsy();
  expect(board.placeShip(board.ships[1], 8, 3, 'hor')).toBeFalsy();
});

test('ship overlap', () => {
  const board = new Gameboard();
  board.placeShip(board.ships[0], 5, 5, 'vert');
  expect(board.placeShip(board.ships[1], 5, 9, 'hor')).toBeFalsy();
});

test('ship overlap 2', () => {
  const board = new Gameboard();
  board.placeShip(board.ships[0], 1, 1, 'vert');
  board.placeShip(board.ships[1], 5, 1, 'hor');
  board.placeShip(board.ships[2], 10, 2, 'vert');
  board.placeShip(board.ships[3], 6, 6, 'hor');
  expect(board.placeShip(board.ships[4], 10, 4, 'hor')).toBeFalsy();
});

test('find node', () => {
  const board = new Gameboard();
  expect(board.find(5, 5)).toMatchObject({ x: 5, y: 5 });
  expect(board.find(8, 10)).toMatchObject({ x: 8, y: 10 });
});

// test('attack hit', () => {
//   const board = new Gameboard();
//   board.placeShip(board.ships[0], 1, 1, 'vert');
//   board.receiveAttack(1, 5).toBeTruthy();
// });

// test('attack miss', () => {
//   const board = new Gameboard();
//   board.placeShip(board.ships[0], 1, 1, 'vert');
//   board.receiveAttack(2, 1).toBeFalsy();
// });

// receiveAttack - either hit a ship or hit an empty cell
// if ship record hit
// if empty record it on gameboard
// gameboard should report if all ships are sunk - allShipsSunk();

// there's also an option for attacking an already attacked spot?

// Gameboards should be able to report whether or not all of their ships have been sunk.
