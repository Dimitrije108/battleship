// Handles the Drag and Drop API functionality
export default class DragAndDrop {
  constructor(player, boardDisplay, gameStatus) {
    this.player = player;
    this.boardDisplay = boardDisplay;
    this.gameStatus = gameStatus;
    this.dragged = null;
  }
  // Add dragstart listeners to unplaced ships so they can be dragged
  initDragStart() {
    const unplacedShips = document.querySelectorAll('.unplaced-ship');

    unplacedShips.forEach((ship) => {
      ship.addEventListener('dragstart', (e) => {
        this.handleDragStart(ship, e);
      });

      ship.addEventListener('dragend', () => {
        this.dragged = null;
        ship.classList.remove('dragging');
      });
    });
  }
  // Setup drag start for a ship
  handleDragStart(ship, e) {
    const shipName = ship.dataset.name;
    // Find the dragged ship object
    this.dragged = this.player.board.ships.find(
      (ship) => ship.name === shipName
    );
    e.dataTransfer.effectAllowed = 'move';
    // Add class so it can be recognized easier
    e.target.classList.add('dragging');
  }
  // Add all other drag listeners so a ship can be placed on the board
  initDragEnd() {
    const board = document.querySelector('.board');
    board.addEventListener('dragover', (e) => this.handleDragOver(e));
    board.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    board.addEventListener('drop', (e) => this.handleDrop(e));
  }

  handleDragOver(e) {
    e.preventDefault();
    const draggable = document.querySelector('.unplaced-ship.dragging');
    // Prevent placed item being draggable again issue
    if (!draggable) {
      e.dataTransfer.dropEffect = 'none';
      return;
    }
    e.dataTransfer.dropEffect = 'move';
    // Highlight cell the ship will potentially be placed on
    e.target.classList.add('highlight');
  }

  handleDragLeave(e) {
    e.preventDefault();
    // Remove the highlight cell effect when a cell is no longer hovered over
    e.target.classList.remove('highlight');
  }

  handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('highlight');
    // Prevent placed item being draggable again issue
    const draggable = document.querySelector('.unplaced-ship.dragging');
    if (!draggable) return;

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);
    // Pass the required info for a ship to be placed on the board
    this.handleShipPlacement(x, y);
  }
  // If a ship is able to be placed on the board, place it
  handleShipPlacement(x, y) {
    if (this.player.board.placeShip(this.dragged, x, y)) {
      this.player.board.placeShip(this.dragged, x, y);
      this.boardDisplay.delBoard('.board');
      this.boardDisplay.dispBoard(this.player.gameboard);
      this.initDragEnd();
      // Delete the placed ship el so it's no longer available
      document.querySelector('.dragging').remove();
      // Check if all ships are placed on the board
      this.gameStatus();
    }
  }
}
