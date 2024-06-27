# 이미지 클릭 이벤트 과제

## 실행 영상

![엘리멘탈 완성](https://github.com/YSP97/js-homework/assets/140301763/c16d750c-58a9-4f13-bb38-6fa125f78895)

## 코드 설명

### 1. `getNode`

```js
function getNode(node, context = document) {
  if (context.nodeType !== 9) context = document.querySelector(context);
  return context.querySelector(node);
}
```

노드가 필요한 경우가 많아 getNode함수를 선언했다.

### 2. `setBgColor`

```js
function setBgColor(selector, startColor, endColor) {
  const node = getNode(selector);
  if (node) {
    node.style.background = `linear-gradient(to bottom, ${startColor}, ${endColor})`;
  } else {
    throw new Error('해당 노드가 존재하지 않습니다.');
  }
}
```

배경색을 `linear-gradient`를 통해 그라데이션 효과를 주는 `setBgColor` 함수를 선언했다.<br>

1. 매개변수
   - selector: 설정하고 싶은 필드
   - startColor: `linear-gradient` 시작 색상
   - endColor: `linear-gradient` 끝 색상
2. 조건문
   - 노드가 존재 O : style의 background에 접근하여 `linear-gradient` 설정
   - 노드가 존재 X : 노드가 존재하지 않는다는 에러 발생

### 3. `setImage`

```js
function setImage(field, item) {
  field.src = `./assets/${item.name}.jpeg`;
  field.alt = item.alt;
}
```

클릭이벤트 발생 시 선택한 이미지로 변경되는 함수

### 4. `setNameText`

```js
function setNameText(selector, item) {
  const node = getNode(selector);
  node.textContent = item.name;
}
```

`selector`로 노드를 가져오고 해당 노드의 텍스트를 데이터 객체에서 선택된 `item`의 name으로 변경하는 함수

### 5. `createAudioPlayer`

```js
function createAudioPlayer() {
  let audio = null;

  return function playAudio(item) {
    if (audio) {
      audio.pause();
      audio = null;
    }

    audio = new Audio(`./assets/audio/${item.name}.m4a`);
    audio.play();
  };
}
const playAudio = createAudioPlayer();
```

Audio객체를 생성하는 생성자함수인 Audio를 이용하여 인스턴스를 audio에 할당하여 주었고 이를 재생하도록 audio.play() 메서드를 사용하였다.<br>
만약 클릭 이벤트가 빠르게 연속하여 발생하면 재생중인 오디오를 멈추었다가 다시 재생할 수 있도록 `audio` 변수에 null을 할당하여 만약 오디오가 재생중인 경우 pause() 메서드를 사용하여 오디오를 멈추고 audio에 다시 null을 할당하도록 하였다.

```js
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
```

버튼 클릭시 이벤트 객체를 매개변수 e에 할당하도록 하였고 nav요소의 가장 가깡운 li를 찾도록 하여 이를 btn에 할당하도록 하였다. li가 아닌 ul을 선택할 시 아래 코드를 실행하지 못하도록 조건문 처리를 하였다.<br>
dataset을 이용하여 data-index를 찾아 해당 li의 인덱스를 index에 할당하도록 하였고 해당하는 index번호의 아이템을 가져오기 편하도록 dataItem도 설정해주었다.

<br>
차례대로 이미지변경, 제목변경, 오디오재생 함수를 불러왔고 버튼 클릭시 is-active를 클래스에 추가해주도록 li 전체 배열인 liList를 forEach로 순회하며 is-active를 제거하도록 초기화해준 뒤 다시 추가해주도록 작성하였다.

## 어려웠던 점

> 오디오 변수를 전역에서 사용하는 것을 피하려고 클로저 함수를 만들었는데 조금 어려웠다...
