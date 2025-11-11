// let mouseCursor = document.querySelector('.mouse_cursor');

// window.addEventListener('scroll', cursor);
// window.addEventListener('mousemove', cursor);
// //커스텀 커서의 left값과 top값을 커서의 XY좌표값과 일치시킴
// function cursor(e) {
//   mouseCursor.style.left = e.pageX + 'px';
//   mouseCursor.style.top = e.pageY - scrollY + 'px';
// }

let mouseCursor = document.querySelector('.mouse_cursor');

// 마우스좌표
let mouseX = 0;
let mouseY = 0;

// 커서좌표
let cursorX = 0;
let cursorY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;

  mouseCursor.style.left = cursorX + 'px';
  mouseCursor.style.top = cursorY + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();
