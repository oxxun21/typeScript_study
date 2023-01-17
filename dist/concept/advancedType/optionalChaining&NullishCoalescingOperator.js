"use strict";
// optional chaining (?.) : 개체의 속성에 접근하거나 함수를 호출함, 개체가 undefined 또는 null인 경우 오류를 발생시키는 대신 undefined를 반환
// 옵셔널 체이닝 연산자는 객체 데이터의 중첩된 속성과 객체에 안전하게 접근 가능
var _a;
const fetchedUserDate = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }
};
console.log((_a = fetchedUserDate === null || fetchedUserDate === void 0 ? void 0 : fetchedUserDate.job) === null || _a === void 0 ? void 0 : _a.title); // 정의되어 있는지 여부가 확실치 않은 부분에 ? 추가
// null 병합 연산자 (??) : 왼쪽 피연산자가 null 또는 undefined일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환 
const userInputNull = '';
const storedDate = userInputNull !== null && userInputNull !== void 0 ? userInputNull : 'DEFAULT';
// userInputNull이 (빈문자열이나 0이 아닌) null이거나 undefined라면 폴백을 사용
console.log(storedDate);
//# sourceMappingURL=optionalChaining&NullishCoalescingOperator.js.map