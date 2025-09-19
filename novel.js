import { interiors } from './novel_data.js';

document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.cursor');
  const gallery = document.querySelector('.gallery');
  const numberOfItems = 50;

  const radius = 1100;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const angleIncrement = (2 * Math.PI) / numberOfItems;

  for (let i = 0; i < numberOfItems; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    const p = document.createElement('p');
    const count = document.createElement('span');
    p.textContent = interiors[i].name;
    count.textContent = `(${Math.floor(Math.random() * 50) + 1})`;
    item.appendChild(p);
    p.appendChild(count);
    gallery.appendChild(item);

    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const rotation = (angle * 180) / Math.PI;

    gsap.set(item, {
      x: x + 'px',
      y: y + 'px',
      rotation: rotation,
    });
  }
});
