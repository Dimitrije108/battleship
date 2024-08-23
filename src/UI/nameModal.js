import PlayGame from './DOM';

export default function initNameModal() {
  const modal = document.querySelector('.modal');
  const submitBtn = document.querySelector('.submit-btn');
  const input = document.querySelector('#username');
  modal.showModal();

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value) {
      new PlayGame(input.value);
      modal.close();
    }
  });
}
