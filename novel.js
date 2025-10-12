import { interiors } from './novel_data.js';

document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.cursor');
  const gallery = document.querySelector('.gallery');
  const centerText = document.querySelector('.text');

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
      const imgSrc = `./assets/img${i + 1}.png`;
      const img = document.createElement('img');
      img.src = imgSrc;
      img.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%,0% 100%)';
      cursor.appendChild(img);

      gsap.to(img, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%,0% 0%)',
        duration: 1,
        ease: 'power3.out',
      });

      // 키워드 문장 표시
      const sentence = interiors[i].sentence || interiors[i].name || '';
      if (sentence) {
        // 텍스트 교체
        centerText.textContent = sentence;
        // 클래스 토글로 CSS 애니메이션 (fade-in)
        centerText.classList.add('visible');
        centerText.classList.remove('hidden-scale');

        // 추가 애니메이션(선택) — gsap으로 미세한 팝업 이펙트
        gsap.fromTo(
          centerText,
          { scale: 0.98, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' }
        );
      }
    });

    // 마우스 아웃: 이미지 제거 + 중앙 문장 숨김
    item.addEventListener('mouseout', function () {
      const imgs = cursor.getElementsByTagName('img');
      if (imgs.length) {
        const lastImg = imgs[imgs.length - 1];
        Array.from(imgs).forEach((img, index) => {
          if (img !== lastImg) {
            gsap.to(img, {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%,0% 0%)',
              duration: 1,
              ease: 'power3.out',
              onComplete: () => {
                setTimeout(() => {
                  img.remove();
                }, 1000);
              },
            });
          }
        });

        gsap.to(lastImg, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%,0% 0%)',
          duration: 1,
          ease: 'power3.out',
          delay: 0.25,
          onComplete: () => {
            // 마지막 이미지 제거 (선택)
            setTimeout(() => {
              if (lastImg.parentElement) lastImg.remove();
            }, 1000);
          },
        });
      }

      // 중앙 문장 사라지게 하기
      centerText.classList.remove('visible');
      centerText.classList.add('hidden-scale');

      // optional: 문구를 바로 비우지 않고 애니메이션 후 비우기
      setTimeout(() => {
        // 현재 보이지 않는 상태이면 텍스트 제거 (액세서빌리티, 텍스트 겹침 방지)
        if (!centerText.classList.contains('visible')) {
          centerText.textContent = '';
        }
      }, 400); // CSS transition 시간과 맞추면 자연스러움
    });
  }

  function updatePosition() {
    const scrollAmout = window.scrollY * 0.0001;
    document.querySelectorAll('.item').forEach(function (item, index) {
      const angle = index * angleIncrement + scrollAmout;
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
