"use strict";
// 제네릭 타입 제약조건 사용
// function merge<T extends object, U extends object>(objA: T, objB: U){
//     return Object.assign(objA, objB);   // 왜 자꾸 오류 뜨지? → T extends object 쓰니까 사라짐;
// }
function countAndDescribe(element) {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    }
    else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements.';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe(''));
// 유연한 작업이 요구될 때 제네릭 타입을 사용하면 제약조건 덕분에 정확한 타입에 대해 신경쓰지 않고 작업할 수 있음
// keyof 제약조건
// 객체를 첫번째 인수로 가지고 두번째 매개변수가 결과적으로 키가 되는 함수
function extractAndConvert(obj, key) {
    return 'Value: ' + obj[key]; // 제네릭이 없을때 obj[key] 에러이유 : obj 객체에 키가 있는지 보장할 수 없음을 알림
}
extractAndConvert({ name: 'max' }, 'name');
// 제네릭 클래스
// 제네릭 클래스를 원시 값으로 사용하면 타입 안전성을 확보할 수 있음
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return; // 잘못된 item 제거를 방지
        } // 참조 형식인 값이 제대로 동작하는지 확인하는 로직
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItem() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItem());
const numberStorage = new DataStorage();
function createCourseGoal(title, desciption, date) {
    let courseGoal = {};
    // Partial ? 만든 타입 전체를 모든 속성이 선택적인 타입, CourseGoal를 선택적인 객체 타입으로 바꿈
    // 각 단계 이전에 추가적인 유효성 검사 수행
    courseGoal.title = title;
    courseGoal.desciption = desciption;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const readnames = ['Max', 'Anna'];
// readnames.push('Manu'); → X
// readnames.pop(); → X
// Readonly를 사용하여 속성을 변경하지 못하도록 함
//# sourceMappingURL=otherGeneric.js.map