import { interiors } from './novel_data.js';

document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.cursor');
  const gallery = document.querySelector('.gallery');

  const textBox = document.querySelector('.text');
  const sentenceBox = document.querySelector('.sentence');
  const descriptionBox = document.querySelector('.description');

  const numberOfItems = 50;
  const radius = 1300; //원 크기임

  const centerX = window.innerWidth / 2; //원의 중심 x좌표
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
        // 텍스트 교체
        sentenceBox.innerHTML = sentence;
        descriptionBox.innerHTML = description;

        gsap.killTweensOf([textBox, sentenceBox, descriptionBox]); // 이전 애니메이션 중지

        gsap.fromTo(
          textBox,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
        );

        // sentence
        gsap.fromTo(
          sentenceBox,
          { opacity: 0, y: 5, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
        );

        // description은 sentence 밑에서 살짝 올라오도록 지연(stagger)
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
    });

    // 마우스 아웃: 이미지 제거 + 중앙 문장 숨김
    item.addEventListener('mouseout', function () {
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
      //       // 마지막 이미지 제거 (선택)
      //       setTimeout(() => {
      //         if (lastImg.parentElement) lastImg.remove();
      //       }, 1000);
      //     },
      //   });
      // }

      // 애니메이션 중단 방지
      gsap.killTweensOf([textBox, sentenceBox, descriptionBox]);

      // description 먼저 사라지게 (약간 빠르게)
      gsap.to(descriptionBox, {
        opacity: 0,
        y: -5,
        duration: 0.35,
        ease: 'power2.inOut',
      });

      // sentence와 전체 박스는 조금 더 천천히 사라짐
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
        onComplete: () => {
          // 완전히 숨겨졌을 때 텍스트 제거(중복표시 방지)
          sentenceBox.textContent = '';
          descriptionBox.textContent = '';
          // 초기 위치 리셋
          gsap.set([sentenceBox, descriptionBox, textBox], {
            y: 0,
            scale: 0.95,
          });
        },
      });

      // // 페이드아웃 + 살짝 축소 + 위로 약간 움직임
      // gsap.to(centerText, {
      //   opacity: 0, // 서서히 투명해짐
      //   scale: 0.9, // 살짝 작아지며 멀어지는 느낌
      //   y: 5, // 아래로 떨어짐
      //   duration: 0.5, // 0.5초 동안 서서히
      //   ease: 'power2.inOut', // 부드러운 감속-가속曲선
      //   onComplete: () => {
      //     // 애니메이션이 끝난 뒤 텍스트 제거
      //     centerText.textContent = '';
      //     // 위치를 초기화해두면 다음 등장 시 깜빡임이 없음
      //     gsap.set(centerText, { y: 0, scale: 0.95 });
      //   },
      // });
    });
  }

  function updatePosition() {
    const scrollAmount = window.scrollY * 0.0001;
    document.querySelectorAll('.item').forEach(function (item, index) {
      const angle = index * angleIncrement + scrollAmount;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI;

      gsap.to(item, {
        duration: 0.05,
        x: x + 'px',
        y: y + 'px',
        rotation: rotation,
        ease: 'elastic.out(1,0.3)',
      });
    });
  }

  updatePosition();
  document.addEventListener('scroll', updatePosition);

  document.addEventListener('mousemove', function (e) {
    gsap.to(cursor, {
      x: e.clientX - 150,
      y: e.clientY - 200,
      duration: 1,
      ease: 'power3.out',
    });
  });
});
