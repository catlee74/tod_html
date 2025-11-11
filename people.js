let window_scrolling;

window.addEventListener('scroll', () => {
  if (!window_scrolling) {
    console.log('start wheeling!');
    document.documentElement.classList.remove('scroll-hidden');
  }

  // 일정시간 뒤에 스크롤 동작 멈춤을 감지
  clearTimeout(window_scrolling);
  window_scrolling = setTimeout(() => {
    console.log('stop wheeling!');
    window_scrolling = undefined;
    document.documentElement.classList.add('scroll-hidden');
  }, 400);
});
