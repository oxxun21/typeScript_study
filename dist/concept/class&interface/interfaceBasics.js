"use strict";
// Ts에서 interface는 객체의 구조를 말함, 객체의 형태를 설명
// Js에는 없는 키워드
// 클래스와 달리 인터페이스는 청사진으로 이용하지 않고 사용자 정의 타입으로만 사용
// interface도 정의 첫글자는 대문자
// 인터페이스에 선택적 속성을 입력하고(?사용) 클래스에는 선택적이지 않은 속성으로 구현한 다음 로직이 항상 초기화 되도록 해야 함
class Person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        else {
            console.log('Hi');
        }
    }
}
let user1; // 인터페이스를 타입으로 적용
// user1 = {
//     name: 'Max',
//     age: 30,
//     greet(phrase: string){
//         console.log(phrase + ' ' + this.name);
//     }
// };
user1 = new Person('Max');
// user1.name = 'Menu';  Error : 읽기 전용 속성이므로 'name'에 할당할 수 없습니다.
user1.greet('Hi there - I am');
// 인터페이스 구조를 가져야 하는 객체에 대한 타입을 확인하는 타입으로 사용
// type 정의(사용자 정의)와 다른점
// 1. 인터페이스는 객체의 구조를 설명하기 위해서만 사용 => 클래스 사용 시 인터페이스 내용을 이행하고 준수하게끔 함 (인터페이스 구조에 맞춰서 구현해야함)
// 2. 인터페이스는 주로 구체적인 구현이 아닌 서로 다른 클래스 간의 기능을 공유하기 위해 사용
//# sourceMappingURL=interfaceBasics.js.map