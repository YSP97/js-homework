# 네이버 로그인 페이지 구현

---

## (1) 실행 영상

#### 1. user data와 일치할 경우(로그인 성공)

![링크 이동(성공)](https://github.com/YSP97/js-homework/assets/140301763/c6d91b13-0ae6-41f2-b07f-c13f5b950338)

> 링크 이동 후 이전 페이지로 이동
> ![되돌아오기](https://github.com/YSP97/js-homework/assets/140301763/5d47201c-1787-4fce-8b54-7f4a6ac09ecb)

#### 2. email 형식이 아닐 경우

![이메일 오류](https://github.com/YSP97/js-homework/assets/140301763/f40d71e1-bf36-44a7-8ab8-8a2d79c1aa16)

#### 3. 비밀번호 형식이 잘못된 경우

![비번 오류](https://github.com/YSP97/js-homework/assets/140301763/bde30774-6179-4de5-af93-eeda5440e01f)

#### 4. email, 비밀번호 형식이 모두 잘못된 경우

![둘다오류](https://github.com/YSP97/js-homework/assets/140301763/30e433c4-96c7-4a96-84c3-7b6ac2ace901)

#### 5. email, 비밀번호 형식은 맞지만 user data와 일치하지 않는 경우

![비밀번호 불일치](https://github.com/YSP97/js-homework/assets/140301763/123cde19-64b2-44de-867d-59134ea124da)

<hr>

## (2) 코드 설명

### 이벤트

```js
const btn = getNode('.btn-login');
btn.addEventListener('click', handleValidation);
```

이벤트 제어를 위해 addEventListener를 이용하여 버튼의 click 이벤트 발생 시 handleValidation 함수를 실행하도록 하였다.

### `handleValidation`: Email, password 형식 validation 함수

event 객체를 가져오기 위해 매개변수 event로 연결하였고, 클릭 이벤트 발생 시 폼 제출을 하는 것을 막기 위해 `event.preventDefault();`처리 하였다.
<br>

#### 1. 변수

- `inputEmail`: email input 박스 노드
- `inputPw`: 비밀번호 input 박스 노드
- `errorEmail`, `errorPwd`: error 메세지 노드
- `errorLogin`: user data 와 불일치일 시 error 메세지 노드
- `validEmail`, `validPw`: emailReg함수에 inputEmail과 inputPw의 텍스트를 넣어 실행했을 때의 boolean값

#### 2. 클래스, 접근성 속성 초기화

```js
hideError(inputEmail, errorEmail);
hideError(inputPw, errorPwd);
errorLogin.classList.remove('is--invalid');
```

- 로그인 버튼 클릭시 `is--invalid`가 클래스에 추가되어 에러 메세지가 보이도록 하기 위해 초기화 함수 `hideError` 실행
- user 데이터와 불일치일 시 보이는 에러 메세지 제어를 위한 초기화

#### 3. 접근성 속성 초기화

```js
inputEmail.setAttribute('aria-invalid', 'false');
inputPw.setAttribute('aria-invalid', 'false');
```

`aria-invalid`값을 초기에 false로 지정하여 로그인 오류 발생 시 해당 로그인 폼이 잘못되었음을 스크린 리더 사용자에게 알려주려 했다.

#### 4. 조건문

1. 이메일과 비밀번호 형식이 맞을 때: `validEmail`, `validPw`가 true → user data와 일치 여부 확인을 위해 `validationUserData`함수 실행
2. 이메일 형식이 맞지 않을 때: `validEmail`가 false

   ```js
   showError(inputEmail, errorEmail);
   ```

   - 에러 메세지를 보이고 접근성 속성을 제어하는 함수 showError 실행

3. 비밀번호 형식이 맞지 않을 때: `validPw`가 false
   ```js
   showError(inputPw, errorPwd);
   ```
   - 에러 메세지를 보이고 접근성 속성을 제어하는 함수 showError 실행
4. 두 형식 다 맞지 않을 때: `validEmail`, `validPw` false
   ```js
   showError(inputPw, errorPwd);
   showError(inputEmail, errorEmail);
   ```
   - 에러 메세지를 보이고 접근성 속성을 제어하는 함수 showError 실행

### `validationUserData` 함수: user 객체 정보와 일치 여부 validation

#### 1. 변수

- `errorLogin`: user data 와 불일치일 시 error 메세지 노드
- `inputPw`: 비밀번호 input 박스 노드

#### 2. 조건문

- user 객체 값과 일치: `id === user.id && pwd === user.pw`인 경우
  ```js
  clearInputs();
  location.href = 'welcome.html';
  ```
  → 새로고침하거나 페이지 이동 후 뒤로가기 눌렀을 때 초기 상태로 유지하기 위해 모든 input 노드 텍스트 제거하는 `clearInputs()`함수 실행하고 `welcome.html`로 이동
- user 객체 값과 불일치: `id === user.id || pwd === user.pw`인 경우
  → `showError` 함수 실행

### `showError`, `hideError` 함수

```js
function showError(input, error) {
  error.classList.add('is--invalid');
  error.setAttribute('aria-hidden', 'false');
  error.setAttribute('aria-live', 'assertive');
  input.setAttribute('aria-invalid', 'true');
  input.value = '';
  input.focus();
  input.setAttribute('tabindex', '0');
}
```

- class에 is--invalid 속성값 추가
- 스크린리더가 에러메세지를 읽도록 aria-hidden: false
- 이벤트 발생시 바로 에러메세지를 읽도록 aria-live 를 assertive
- 해당 폼에 오류가 발생했음을 스크린리더 사용자에게 알리기 위해 aria-invalid를 true
- 오류가 발생한 필드의 input 값을 제거하고 해당 필드에 포커스
- tabindex = 0: tab이 먼저 가게

```js
function hideError(input, error) {
  error.classList.remove('is--invalid');
  error.setAttribute('aria-hidden', 'true');
  error.setAttribute('aria-live', 'off');
  input.setAttribute('aria-invalid', 'false');
}
```

- 클래스에서 속성값 'is--invalid'을 제거하여 에러 메세지 보이지 않게 설정
- aria-hidden = 'true': 스크린리더가 에러메세지 읽지 못하도록

### `clearInputs` 함수

```js
function clearInputs() {
  const inputEmail = getNode('#userEmail');
  const inputPw = getNode('#userPassword');
  inputEmail.value = '';
  inputPw.value = '';
  inputEmail.focus();
}
```

- 모든 input 인풋 노드 내의 텍스트를 빈문자열로 바꾼 뒤 email input 박스에 포커스 되도록
  > `window.onload = clearInputs;`를 통해 브라우저가 완전히 로드 시(브라우저 열기, 새로고침 등) `clearInput` 함수를 실행하여 초기화되도록 함

## (3) 고치고 싶은 것들...

> 천천히 수정해보자😭

1. 아이디 입력 오류일 시 탭으로 이동했을 때 스크린 리더가 비밀번호 오류 메세지까지 읽음
2. 스크린 리더 사용했을 때 비밀번호 오류 시 엔터나 스패이스로 로그인 버튼을 누르게 되면 포커스가 비밀번호가 아닌 로그인 버튼에 머물러 있음

## (4) 실습 후기

> 접근성 생각하는 거 너무너무 어렵다...이게 맞나?🤮
