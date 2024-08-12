// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';
import Player from './logic/Player';
import displayBoard from './UI/displayBoard';

const jimmy = new Player('jimmy');
const player2 = new Player('player2');

jimmy.gameboard.placeShip(jimmy.gameboard.ships[0], 1, 1, 'vert');
jimmy.gameboard.placeShip(jimmy.gameboard.ships[1], 2, 1, 'vert');
jimmy.gameboard.placeShip(jimmy.gameboard.ships[2], 3, 1, 'vert');
jimmy.gameboard.placeShip(jimmy.gameboard.ships[3], 4, 1, 'vert');
jimmy.gameboard.placeShip(jimmy.gameboard.ships[4], 5, 1, 'vert');

player2.gameboard.placeShip(player2.gameboard.ships[0], 1, 1, 'vert');
player2.gameboard.placeShip(player2.gameboard.ships[1], 2, 1, 'vert');
player2.gameboard.placeShip(player2.gameboard.ships[2], 3, 1, 'vert');
player2.gameboard.placeShip(player2.gameboard.ships[3], 4, 1, 'vert');
player2.gameboard.placeShip(player2.gameboard.ships[4], 5, 1, 'vert');

displayBoard(jimmy.board, true);
displayBoard(player2.board);
