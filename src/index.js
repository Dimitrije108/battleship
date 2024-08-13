// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';
import Player from './logic/Player';
import displayBoard from './UI/displayBoard';

const jimmy = new Player('jimmy');
const player2 = new Player('player2');

jimmy.board.placeShip(jimmy.board.ships[0], 1, 1, 'vert');
jimmy.board.placeShip(jimmy.board.ships[1], 2, 1, 'vert');
jimmy.board.placeShip(jimmy.board.ships[2], 3, 1, 'vert');
jimmy.board.placeShip(jimmy.board.ships[3], 4, 1, 'vert');
jimmy.board.placeShip(jimmy.board.ships[4], 5, 1, 'vert');

player2.board.placeShip(player2.board.ships[0], 1, 1, 'vert');
player2.board.placeShip(player2.board.ships[1], 2, 1, 'vert');
player2.board.placeShip(player2.board.ships[2], 3, 1, 'vert');
player2.board.placeShip(player2.board.ships[3], 4, 1, 'vert');
player2.board.placeShip(player2.board.ships[4], 5, 1, 'vert');

displayBoard(jimmy.gameboard, true);
displayBoard(player2.gameboard);
