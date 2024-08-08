test('ship placed', () => {
  const board = new Gameboard();
  expect(board.placeShip(board.ships[0], 5, 5, vertical)).toBeTruthy();
});

test('ship out of bounds', () => {
  const board = new Gameboard();
  expect(board.placeShip(board.ships[1], 3, 8, horizontal)).toBeFalsy();
});

test('ship overlap', () => {
  const board = new Gameboard();
  board.placeShip(board.ships[0], 5, 5, vertical);
  expect(board.placeShip(board.ships[1], 8, 5, horizontal)).toBeFalsy();
});

// receiveAttack - takes a pair of coordinates, determines whether or not the attack hit a ship and then
// sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

// Gameboards should be able to report whether or not all of their ships have been sunk.
