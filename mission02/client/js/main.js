import { data } from './data.js';

const nav = document.querySelector('.nav');
const imgField = document.querySelector('.visual img');
const liList = document.querySelectorAll('li');

// get node 함수
function getNode(node, context = document) {
  if (context.nodeType !== 9) context = document.querySelector(context);
  return context.querySelector(node);
}

// 배경색 설정 함수
function setBgColor(selector, startColor, endColor) {
  const node = getNode(selector);
  if (node) {
    node.style.background = `linear-gradient(to bottom, ${startColor}, ${endColor})`;
  } else {
    throw new Error('해당 노드가 존재하지 않습니다.');
  }
}

// 이미지 설정 함수
function setImage(field, file) {
  field.src = `./assets/${file.name}.jpeg`;
  field.alt = file.alt;
}

// 제목 수정 함수
function setNameText(selector, file) {
  const node = getNode(selector);
  node.textContent = file.name;
}

// 오디오 생성하고 재생하는 함수
function createAudioPlayer() {
  let audio = null;

  return function playAudio(file) {
    if (audio) {
      audio.pause();
      audio = null;
    }

    audio = new Audio(`./assets/audio/${file.name}.m4a`);
    audio.play();
  };
}
const playAudio = createAudioPlayer();

function handleClick(e) {
  const btn = e.target.closest('li');

  // li가 아닌 곳은 제외
  if (!btn) return;

  const index = btn.dataset.index;
  const dataItem = data[index - 1];

  // 이미지 변경
  setImage(imgField, dataItem);

  // 배경색 변경
  setBgColor('body', dataItem.color[0], dataItem.color[1]);

  // 버튼 활성화
  [...liList].forEach((li) => li.classList.remove('is-active'));
  btn.classList.add('is-active');

  // 제목 변경
  setNameText('h1', dataItem);

  // 오디오 재생
  playAudio(dataItem);
}

nav.addEventListener('click', handleClick);
