import { Player, Computer } from '../logic/Player';
import GameUI from './GameUI';
// PlayGame class takes in a player name and initiates a new game
export default class PlayGame {
  constructor(player) {
    this.player = new Player(player);
    this.comp = new Computer(this.player.board);
    this.ui = new GameUI(this.player, this.comp, this);
    this.gameActive = false;
  }
  // Attack the board if allowed and process the computer attack as well
  handleBoardAttack(e) {
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);
    // Check attack validity
    if (this.gameActive && x && y) {
      this.playerAttack(x, y);
      if (this.gameActive) {
        setTimeout(() => this.compAttack(), 500);
      }
    }
  }
  // Handle player attack
  playerAttack(x, y) {
    this.comp.board.receiveAttack(x, y);
    // Reset comp board display to update the attack
    this.ui.boardDisplay.delBoard('.board.comp');
    this.ui.boardDisplay.dispCompBoard(this.comp.gameboard);
    this.ui.initBoardAttack();
    this.checkWinCond();
  }
  // Handle computer attack
  compAttack() {
    this.comp.attack();
    // Update board display and check the win condition
    this.ui.boardDisplay.delBoard('.board');
    this.ui.boardDisplay.dispBoard(this.player.gameboard);
    this.checkWinCond();
  }
  // Check if either player or computer won the game
  checkWinCond() {
    if (this.comp.board.allShipsSunk()) {
      this.ui.handleGameWin(this.player);
    } else if (this.player.board.allShipsSunk()) {
      this.ui.handleGameWin(this.comp);
    }
  }
}
