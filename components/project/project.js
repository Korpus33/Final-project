const button = document.querySelector('.project__button');

button.addEventListener('click', function() {
  if (button.classList.contains('button--active')) {
    button.classList.remove('button--active');
  } else {
    button.classList.add('button--active');
  }
});
