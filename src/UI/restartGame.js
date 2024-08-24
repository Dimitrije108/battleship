import PlayGame from './DOM';
import { delBoard } from './displayBoard';

export default function initRestart() {
  const restartBtn = document.querySelector('.restart-btn');

  restartBtn.addEventListener('click', () => {
    handleRestart(restartBtn);
  });
}

function handleRestart(restartBtn) {
  // Remove the last game's boards
  delBoard('.board');
  delBoard('.board.comp');
  // Create a new game instance
  new PlayGame(restartBtn.dataset.name);
  // Hide the restart button again
  restartBtn.style.display = 'none';
  // Show the start button again so it can be used
  const startBtn = document.querySelector('.start-btn');
  startBtn.style.visibility = 'visible';
}
