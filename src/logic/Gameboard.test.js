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

test('attack hit', () => {
  const board = new Gameboard();
  board.placeShip(board.ships[0], 1, 1, 'vert');
  expect(board.receiveAttack(1, 5)).toBeTruthy();
});

test('attack miss', () => {
  const board = new Gameboard();
  board.placeShip(board.ships[0], 1, 1, 'vert');
  expect(board.receiveAttack(2, 1)).toBeFalsy();
});

test('attack same cell twice', () => {
  const board = new Gameboard();
  board.receiveAttack(5, 5);
  expect(board.receiveAttack(5, 5)).toBeFalsy();
});

test('attack same ship twice', () => {
  const board = new Gameboard();
  board.placeShip(board.ships[4], 5, 5, 'vert');
  board.receiveAttack(5, 5);
  expect(board.receiveAttack(5, 5)).toBeFalsy();
});

test('all ships sunk', () => {
  const board = new Gameboard();

  board.placeShip(board.ships[0], 1, 1, 'vert');
  board.placeShip(board.ships[1], 2, 1, 'vert');
  board.placeShip(board.ships[2], 3, 1, 'vert');
  board.placeShip(board.ships[3], 4, 1, 'vert');
  board.placeShip(board.ships[4], 5, 1, 'vert');

  board.receiveAttack(1, 1);
  board.receiveAttack(1, 2);
  board.receiveAttack(1, 3);
  board.receiveAttack(1, 4);
  board.receiveAttack(1, 5);

  board.receiveAttack(2, 1);
  board.receiveAttack(2, 2);
  board.receiveAttack(2, 3);
  board.receiveAttack(2, 4);

  board.receiveAttack(3, 1);
  board.receiveAttack(3, 2);
  board.receiveAttack(3, 3);

  board.receiveAttack(4, 1);
  board.receiveAttack(4, 2);
  board.receiveAttack(4, 3);

  board.receiveAttack(5, 1);
  board.receiveAttack(5, 2);

  expect(board.allShipsSunk()).toBeTruthy();
});

test('not all ships sunk', () => {
  const board = new Gameboard();

  board.placeShip(board.ships[0], 1, 1, 'vert');
  board.placeShip(board.ships[1], 2, 1, 'vert');
  board.placeShip(board.ships[2], 3, 1, 'vert');
  board.placeShip(board.ships[3], 4, 1, 'vert');
  board.placeShip(board.ships[4], 5, 1, 'vert');

  board.receiveAttack(1, 1);
  board.receiveAttack(1, 2);
  board.receiveAttack(1, 3);
  board.receiveAttack(1, 4);

  board.receiveAttack(2, 1);
  board.receiveAttack(2, 2);
  board.receiveAttack(2, 3);
  board.receiveAttack(2, 4);

  board.receiveAttack(3, 1);
  board.receiveAttack(3, 2);
  board.receiveAttack(3, 3);

  board.receiveAttack(4, 1);
  board.receiveAttack(4, 2);
  board.receiveAttack(4, 3);

  board.receiveAttack(5, 1);
  board.receiveAttack(5, 2);

  expect(board.allShipsSunk()).toBeFalsy();
});
