import Ship from './Ship';
// test if isSunk calculates when a ship is sunk correctly
test('ship hit', () => {
  const ship = new Ship(5);
  ship.hit();
  ship.hit();
  expect(ship.getNumberOfTimesHit).toBe(2);
});

test('ship sunk', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk).toBeTruthy();
});

test('ship not sunk', () => {
  const ship = new Ship(4);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk).toBeFalsy();
});
