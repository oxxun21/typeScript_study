"use strict";
// Generic Type : 다른 타입과 연결되는 종류
// 다른 타입이 어떤 타입인지에 대해서는 상관 없음
// 배열은 그 자체로 타입이지만 배열에 특정 타입의 데이터를 저장할 수 있음 → 정보가 저장되는 것인지에 대한 확인
// const names: Array = [];  error : 'Array<T>' 제네릭 형식에 1 형식 인수가 필요합니다.
// <> 안에 배열 안에 어떤 타입을 저장할 것인지 타입 지정 (어떤 타입이든 다 됨)
const names = [];
// 제네릭 타입을 설정하면 그 타입에 맞는 메소드를 호출할 수 있게 됨
names[0].split(' ');
// promise Type : 자바스크립트 promise 맞음, 비동기 작업의 최종적인 완료/실패 및 해당 결과 반환
// 주요 타입은 promise지만 배열처럼 다른 타입과 함께 작동함
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done');
    }, 2000);
});
// 프로미스는 결국 다른 타입과 함께 작동하여 어떤 타입의 데이터를 반환하는 것
// 제네릭 타입은 추가적인 타입 정보를 얻는데 유용함 
// 두 객체 병합 후 새 객체 반환 함수
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
// console.log(merge({name: 'Max'}, {age: 30}));    문제 없음
const mergeObj = merge({ name: 'Max' }, { age: 30 }); // 굳이 이렇게 형변환? → 제네릭 사용
// mergeObj.name;   접근 X → objA/B의 타입을 객체로 입력하여 객체를 반환하는 것으로 추론
function merge2(objC, objD) {
    // return Object.assign(objC, objD);   error : 'T' 형식의 인수는 '{}' 형식의 매개 변수에 할당될 수 없습니다. => 왜?
}
const mergeObj2 = merge2({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
// <T, U>를 사용함으로써 무작위의 객체 타입을 받는 것이 아닌 다양한 타입의 데이터가 들어올 수 있음을 인지시킴
// 함수 호출시 동적으로 타입을 추론할 수 있음
console.log(mergeObj.age);
