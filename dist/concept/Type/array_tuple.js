"use strict";
// 배열은 객체 내부던지 외부던지 완전히 동일함
// 대괄호 쌍 앞에 대괄호 안에 저장되는 데이터 타입을 입력
const exampleArray = {
    hobbies: ['Sports', 'Cooking']
};
let Activities_; // 문자열들의 배열이다.
Activities_ = ['Sports'];
let ActivitiesAny; // 여러 타입의 배열이다.
ActivitiesAny = ['Sports', 1];
for (const hobby of exampleArray.hobbies) {
    console.log(hobby.toUpperCase()); // toUpperCase() 와 같은 문자열에 사용하는 함수도 인식되어 사용 가능
}
// 튜플 타입 선언 방법
const exampleTuple = {
    role: [2, 'author']
};
//# sourceMappingURL=array_tuple.js.map