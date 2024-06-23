// 문제 1
function getValueAtObject(obj, key) {
  if (Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object') {
    if (typeof key === 'string'){
      if (Object.prototype.hasOwnProperty.call(obj,key)) {
        return obj[key];
      } 
      else {
        throw new Error(`객체에 ${key}가 존재하지 않습니다.`);
      }
    }
    else{
      throw new Error('두 번째 인수에는 문자 타입을 입력하세요.');
    }
  } 
  else {
    throw new Error('첫 번째 인수에는 객체를 입력해주세요.');
  }
}

const person = {
  name: 'Alice',
  age: 25,
  city: 'Wonderland'
};

const exampleArray = [];

// console.log(getValueAtObject(person, 'name')); // 'Alice'
// console.log(getValueAtObject(person, 'age'));  // 25
// console.log(getValueAtObject(person, 'city')); // 'Wonderland'
// console.log(getValueAtObject(person, 'country')); // Error !: 객체에 키가 존재 X
// console.log(getValueAtObject(exampleArray, 'country ')); // Error !: 객체로
// console.log(getValueAtObject(person,1)); // Error ! : 문자열로


// 문제 2

function getNumberAtArray(arr, index) {
  // 배열인 경우
  if (Array.isArray(arr)){
    if (typeof index === 'number'){
      if (index >= 0 && index < arr.length) {
        return arr[index];
      } else {
        throw new Error(`${index}번째 인덱스는 존재하지 않습니다.`);
      }
    }
    else{
      throw new Error ('두 번째 인수는 숫자형이어야 합니다.')
    }
  }
  // 객체 타입인 경우
  else if (
    Object.prototype.toString.call(arr).slice(8, -1).toLowerCase() === 'object'
  ) {
    arr = Object.values(arr);
    return getNumberAtArray(arr, index);
  }
  // 배열이나 객체가 아닌경우
  else{
    throw new Error('첫 번째 인수는 배열이거나 객체여야 합니다.');
  }
}

const numbers = [10, 20, 30, 40, 50];
const exampleObject = {
  0: 10, 
  1: 20,
  2: 30,
  3: 40,
  4: 50
}

// console.log(getNumberAtArray(numbers, 2)); // 30
// console.log(getNumberAtArray(numbers, 4)); // 50
// console.log(getNumberAtArray(numbers, 5)); // Error!: 5번째 인덱스 X
// console.log(getNumberAtArray(numbers, -1)); // Error! : -1번째 인덱스 X
// console.log(getNumberAtArray(numbers, '1')); // Error! : 두 번째 인수 숫자형이어야
// console.log(getNumberAtArray(exampleObject, 3)); // 40