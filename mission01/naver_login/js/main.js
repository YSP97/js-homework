
const user = {
  id: 'asd@naver.com',
  pw: 'spdlqj123!@',
};



/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/


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

// user 정보와 일치 확인
function isSameUser(id, pwd) {
  if (id === user.id && pwd === user.pw) {
    location.href = "welcome.html";
  } else {
    alert('아이디와 비밀번호가 일치하지 않습니다.');
  }
}

// validation
function validationUserInfo(event) {
  event.preventDefault();
  let inputId = document.getElementById('userEmail').value;
  let inputPw = document.getElementById('userPassword').value;

  const validId = emailReg(inputId);
  const validPw = pwReg(inputPw);

  let errorId = document.getElementById('userEmailError');
  let errorPwd = document.getElementById('userPasswordError');

  // 초기화
  errorId.style.display = 'none';
  errorPwd.style.display = 'none';

  if (validId && validPw) {
    isSameUser(inputId, inputPw);
  } else if (!validId && validPw) {
    errorId.style.display = 'block';
    errorPwd.style.display = 'none';
  } else if (validId && !validPw) {
    errorId.style.display = 'none';
    errorPwd.style.display = 'block';
  } else {
    errorId.style.display = 'block';
    errorPwd.style.display = 'block';
  }
}

document
  .querySelector('.btn-login')
  .addEventListener('click', validationUserInfo);
