const buttons = document.querySelectorAll('.button--active');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('button--active');
  });
});
