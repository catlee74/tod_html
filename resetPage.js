// const delay = 3000;
const delay = 60000;
//10초 후 리셋됨
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
const callbackFn = () => (window.location.href = './index.html');
// const callbackFn = () => console.log('3초간 입력 없음 → 이동!');

const debouncedFn = debounce(callbackFn, delay);
['pointerdown', 'pointermove', 'scroll'].forEach((event) =>
  window.addEventListener(event, debouncedFn)
);
