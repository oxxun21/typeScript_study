"use strict";
// const : 상수나 변수를 정의하도록 해줌
// 차이점은 새로운 값을 할당하려고 하면 그 값이 정확한 타입이라 하더라도 에러를 발생시킴
// 변경 불가능
// let : 변경 가능한 변수
// var와 비슷하지만 var를 사용하는 것은 피하는 것이 좋음
// let와 var는 변수를 사용할 수 있는 유효범위(스코프)가 다름
function addVar(a, b) {
    var result;
    result = a + b;
    return result;
}
// console.log(result); > 오류 발생 result는 함수 내에서만 접근 가능하기 때문
var result;
function addVar2(a, b) {
    result = a + b;
    return result;
}
console.log(result); // result가 전역 스코프로 작동되어 오류 발생 X
// let도 동일하지만 다른 것은 var는 전역 유효범위와 함수의 유효범위만 지닌다는 것
// let과 const는 블록 스코프의 개념을 가짐, 변수나 상수가 정의된 블록이나 하위 블록에서는 항상 유효함
// 화살표 함수
const addArrow = (a, b) => a + b;
console.log(addArrow(2, 5));
const btn = document.querySelector('button');
if (btn) {
    button.addEventListener('click', (event) => { console.log(event); });
}
// 기본 값이 없는 인자가 몇 번째에 있는지 모르기 때문에 순서에 따라 기본 값은 오른쪽에 넣어야 함
const addArrow2 = (a, b = 1) => a + b;
console.log(addArrow2(5));
// 스프레드 연산자
const food = ['banana', 'apple'];
const anotherfood = ['soup'];
const anotherfood2 = ['soup', ...food]; // 인수의 목록 사용, 이 위치에서 기존 배열을 해당 배열로 전개 가능
// anotherfood.push(food[0], food[1]);  
// 상수로 push가 가능한 이유는 배열은 객체이고 객체는 참조 값이기 때문
// 위처럼 인덱스로 각각 넣는 것이 번거롭기 때문에 스프레드 연산자를 사용
anotherfood.push(...food); // 해당 배열의 모든 요소를 꺼내 값의 목록으로 추가해라
// 원본을 변경하는 것이 아닌 완전한 복사본을 만듬
const person1 = {
    firstName: 'Max',
    age: 30
};
const copiedPerson1 = Object.assign({}, person1); // 객체가 필요한 곳 어디서든 사용 가능
// 나머지 매개변수
// const add3 = (a, b, c, d) => {};  유연한 작업 불가
const add3 = (...numbers) => {
    let result = 0;
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add3(5, 10, 2, 3.7);
console.log(addedNumbers);
// 나머지 매개변수를 사용해서 쉼표로 구분된 문자열(or 숫자) 목록이 배열로 병합되고 처리
// 튜플 타입으로도 실행 가능
const addTuple = (...numbers) => {
    let result = 0;
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedTuples = addTuple(5, 10, 2);
console.log(addedTuples);
// 배열 및 객체 비구조화 할당
// const food1 = food[0];
// const food2 = food[1];
const [food1, food2, ...remainingFood] = food; // remainingFood : food1, food2에 추출하지 않은 나머지 요소가 모두 새 배열에 저장
// 오른쪽에 구조 분해하려는 배열을 입력
// 구조분해란 배열에서 요소를 추출하는 것, 원본 배열 변경 X
// 배열은 정렬되어 있어 순서대로 추출하지만 항상 보장되지 않으므로 위치별 요소를 추출하는 것이 아닌 키 이름으로 요소를 추출
const { firstName, age } = person1;
// 따라서 중괄호 내에는 값이나 이름을 임의로 지정하지 않음, 객체에 입력된 속성 이름을 사용해야 이 키들의 값이 객체에서 추출되어 같은 이름의 상수나 변수에 저장됨
const { firstName: Name, age: newAge } = person1;
// 이름을 따로 변경하고 싶을 때는 위처럼 사용
//# sourceMappingURL=ES6JavaScript.js.map