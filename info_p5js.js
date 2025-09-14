let img;
let asciiText = ' .:-=+*#%@';

function preload() {
  img = loadImage('img/pexels-markus-winkler-1430818-32750830.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 120);
  //-120은 임시로 설정해놓은 사이즈임
  background('#1b1b1b');
  textAlign(LEFT, TOP);
  noLoop();
}

function draw() {
  background('#1b1b1b');
  let charSize = 12;
  //아스키 문자 하나의 가로 세로 크기
  //숫자가 작을 수록 촘촘, 커질 수록 픽셀 느낌남

  textSize(charSize);

  let cols = floor(width / charSize);
  let rows = floor(height / charSize);
  //화면에 들어갈 문자 개수

  img.resize(cols, rows);
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let brightness = (r + g + b) / 3;
      let charIndex = floor(map(brightness, 0, 255, asciiText.length - 1, 0));
      let c = asciiText.charAt(charIndex);

      fill(150);
      textSize(7);
      text(c, x * charSize, y * charSize);
    }
  }
}
