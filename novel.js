import { interiors } from './novel_data.js';

document.addEventListener('DOMContentLoaded', function () {
  // const cursor = document.querySelector('.cursor');
  const gallery = document.querySelector('.gallery');

  const textBox = document.querySelector('.text');
  const sentenceBox = document.querySelector('.sentence');
  const descriptionBox = document.querySelector('.description');

  const numberOfItems = 50;
  // const radius = 1200; //원 크기임
  const radius = 1300; //원 크기임

  const centerX = window.innerWidth / 1.8; //원의 중심 x좌표
  // const centerX = window.innerWidth / 2; //원의 중심 x좌표
  const centerY = window.innerHeight / 2;
  const angleIncrement = (2 * Math.PI) / numberOfItems;

  for (let i = 0; i < numberOfItems; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    const p = document.createElement('p');
    const count = document.createElement('span');

    p.textContent = interiors[i].name;
    //숫자 순서대로
    // count.textContent = `(${i + 1})`;

    //숫자 랜덤으로
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

    item.addEventListener('mouseover', function () {
      //상자 띄우는거
      // const imgSrc = `./assets/img${i + 1}.png`;
      // const img = document.createElement('img');
      // img.src = imgSrc;
      // img.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%,0% 100%)';
      // cursor.appendChild(img);

      // gsap.to(img, {
      //   clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%,0% 0%)',
      //   duration: 1,
      //   ease: 'power3.out',
      // });

      // 키워드 문장 표시
      const data = interiors[i];
      const sentence = data.sentence || data.name || '';
      const description = data.description || '';

      if (sentence) {
        sentenceBox.innerHTML = sentence;
        descriptionBox.innerHTML = description;

        gsap.killTweensOf([textBox, sentenceBox, descriptionBox]);

        gsap.fromTo(
          textBox,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            transformOrigin: 'center center',
          }
        );

        gsap.fromTo(
          sentenceBox,
          { opacity: 0, y: 5, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
        );

        gsap.fromTo(
          descriptionBox,
          { opacity: 0, y: 5 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.02,
            ease: 'power3.out',
          }
        );
      }

      const p = item.querySelector('p');
      gsap.to(p, {
        color: '#ff0000',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    item.addEventListener('mouseout', function () {
      //네모 나타나는거 코드

      // const imgs = cursor.getElementsByTagName('img');
      // if (imgs.length) {
      //   const lastImg = imgs[imgs.length - 1];
      //   Array.from(imgs).forEach((img, index) => {
      //     if (img !== lastImg) {
      //       gsap.to(img, {
      //         clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%,0% 0%)',
      //         duration: 1,
      //         ease: 'power3.out',
      //         onComplete: () => {
      //           setTimeout(() => {
      //             img.remove();
      //           }, 1000);
      //         },
      //       });
      //     }
      //   });
      //   gsap.to(lastImg, {
      //     clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%,0% 0%)',
      //     duration: 1,
      //     ease: 'power3.out',
      //     delay: 0.25,
      //     onComplete: () => {
      //       setTimeout(() => {
      //         if (lastImg.parentElement) lastImg.remove();
      //       }, 1000);
      //     },
      //   });
      // }

      gsap.killTweensOf([textBox, sentenceBox, descriptionBox]);

      gsap.to(descriptionBox, {
        opacity: 0,
        y: -5,
        duration: 0.35,
        ease: 'power2.inOut',
        padding: 0,
      });

      gsap.to(sentenceBox, {
        opacity: 0,
        y: -5,
        duration: 0.5,
        delay: 0.05,
        ease: 'power2.inOut',
      });

      gsap.to(textBox, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        delay: 0.08,
        ease: 'power2.inOut',
        transformOrigin: 'center center',

        onComplete: () => {
          sentenceBox.textContent = '';
          descriptionBox.textContent = '';

          gsap.set([sentenceBox, descriptionBox, textBox], {
            y: 0,
            scale: 1,
          });
        },
      });
      const p = item.querySelector('p');
      gsap.to(p, {
        color: '#d2d2d2', // 원래 색상
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }

  let rotationOffset = 0;
  document.addEventListener('wheel', function (e) {
    // +=는 위로 -=는 아래로 감
    rotationOffset -= e.deltaY * 0.0003; // 속도
    updatePosition();
  });

  function updatePosition() {
    document.querySelectorAll('.item').forEach((item, index) => {
      const angle = index * angleIncrement + rotationOffset;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI;

      gsap.to(item, {
        duration: 0.6,
        x,
        y,
        rotation,
        ease: 'power2.out',
      });
    });
  }

  // updatePosition();
  // document.addEventListener('scroll', updatePosition);

  //이미지 안넣을거면 필요x
  // document.addEventListener('mousemove', function (e) {
  //   gsap.to(cursor, {
  //     x: e.clientX - 150,
  //     y: e.clientY - 200,
  //     duration: 1,
  //     ease: 'power3.out',
  //   });
  // });
});
