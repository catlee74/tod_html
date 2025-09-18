let asciiChar =
  '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`';
let video;

//3:2 비율임
//고정사이즈인데 아이맥에서도 ㄱㅊ을지?
// let vidw = 96;
// let vidh = 54;

// let vidw = 120;
// let vidh = 80;

//16:9비율
let vidw = 128;
let vidh = 72;
// let vidw = 160;
// let vidh = 90;

let w;
let h;
let charSize = 10; //글자 사이즈

//교수님 코드__네비 외 화면계산
let parentDom;
let p5Renderer;

function setup() {
  // // 교수님코드__네비 외에 화면크기 계산
  // //나중에 꼭 연구해볼 것!
  // parentDom = document.querySelector('.canvas-container');
  // const { width: parentWidth, height: parentHeight } =
  //   parentDom.getBoundingClientRect();
  // p5Renderer = createCanvas(parentWidth, parentHeight);
  // p5Renderer.parent(parentDom);

  createCanvas(windowWidth, windowHeight - 120);
  video = createCapture(VIDEO, { flipped: true });
  video.size(vidw, vidh);
  video.hide();

  w = width / vidw;
  h = height / vidh; //세로 간격
  // h = 10; //세로 간격

  textAlign(CENTER, CENTER);
  fill(255);
}

function draw() {
  background('#1b1b1b');
  textSize(charSize);
  // fill('#d2d2d2');

  video.loadPixels();

  for (let i = 0; i < video.width; i++) {
    for (let j = 0; j < video.height; j++) {
      let pixelIndex = (i + j * video.width) * 4;
      let r = video.pixels[pixelIndex];
      let g = video.pixels[pixelIndex + 1];
      let b = video.pixels[pixelIndex + 2];

      let bright = (r + g + b) / 3;

      //대비를 강하게 줘서 아스키아트가 잘 보이게 만들어주는 코드
      //2.2 이 숫자 건드리면 대비 강해짐
      let normalBright = bright / 255;
      let powedBright = pow(normalBright, 1 / 2.2);
      bright = 255 * powedBright;

      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length - 1));
      let x = i * w + w / 2;
      let y = j * h + h / 2;
      let t = asciiChar.charAt(tIndex);
      text(t, x, y);

      //gpt
      let topCol = color('#1b1b1b');
      let bottomCol = color('#d2d2d2');
      let amt = j / video.height; // 0(위) → 1(아래)
      let gradCol = lerpColor(topCol, bottomCol, amt);
      fill(gradCol);

      text(asciiChar.charAt(tIndex), x, y);
    }
  }
}
