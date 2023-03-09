const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight || window.innerHeight;
  const scrolled = scrollTop / (scrollHeight - clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
});
