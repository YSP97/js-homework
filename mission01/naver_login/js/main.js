const user = {
  id: 'asd@naver.com',
  pw: 'spdlqj123!@',
};

// getNode 함수
function getNode(node, context = document) {
  if (context.nodeType !== 9) context = document.querySelector(context);
  return context.querySelector(node);
}


// 로그인 버튼
const btn = getNode('.btn-login');

// email 정규표현식 validation 함수
function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

// pw 정규표현식을 사용한 validation 함수
function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text));
}

// 에러 메세지 on
function showError(input, error) {
  error.classList.add('is--invalid');
  error.setAttribute('aria-hidden', 'false');
  error.setAttribute('aria-live', 'assertive');
  input.setAttribute('aria-invalid', 'true');
  input.value = '';
  input.focus();
  input.setAttribute('tabindex', '0');
}

// 에러 메세지 off
function hideError(input, error) {
  error.classList.remove('is--invalid');
  error.setAttribute('aria-hidden', 'true');
  error.setAttribute('aria-live', 'off');
  input.setAttribute('aria-invalid', 'false');
}

// user 정보와 일치 확인
function validationUserData(id, pwd) {
  const errorLogin = getNode('#loginError');
  const inputPw = getNode('#userPassword');

  if (id === user.id && pwd === user.pw) {
    clearInputs();
    location.href = 'welcome.html';
  } else {
    showError(inputPw, errorLogin);
  }
}

// validation
function handleValidation(event) {
  // 클릭 이벤트 발생 시 폼 제출 방지
  event.preventDefault();

  const inputEmail = getNode('#userEmail');
  const inputPw = getNode('#userPassword');
  const errorEmail = getNode('#userEmailError');
  const errorPwd = getNode('#userPasswordError');
  const errorLogin = getNode('#loginError');

  const validEmail = emailReg(inputEmail.value);
  const validPw = pwReg(inputPw.value);

  // 초기화
  hideError(inputEmail, errorEmail);
  hideError(inputPw, errorPwd);
  errorLogin.classList.remove('is--invalid');

  if (validEmail && validPw) {
    validationUserData(inputEmail.value, inputPw.value);
  } else if (!validEmail && validPw) {
    showError(inputEmail, errorEmail);
  } else if (validEmail && !validPw) {
    showError(inputPw, errorPwd);
  } else {
    showError(inputPw, errorPwd);
    showError(inputEmail, errorEmail);
  }
}

// 입력값 초기화
function clearInputs() {
  const inputEmail = getNode('#userEmail');
  const inputPw = getNode('#userPassword');
  inputEmail.value = '';
  inputPw.value = '';
  inputEmail.focus();
}

// 링크 이동 후 이전 페이지로 돌아가거나 새로고침 시 clearInput 실행하는 이벤트 프로퍼티
window.onload = clearInputs;

btn.addEventListener('click', handleValidation);
