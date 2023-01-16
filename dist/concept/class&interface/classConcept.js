"use strict";
// 객체 지향 프로그래밍 : 애플리케이션을 어떻게 구축할 것인지, 논리적으로 어떻게 나눌 수 있을지에 대한 방법
// 객체 지향 방법으로 객체를 구성하면서 앱이나 애플리케이션 로직을 로직의 일부를 관리하는 객체로 분할 가능
// 자바스크립트에 있는 객체들을 사용하는 개념과 결합하여 객체를 사용 가능 => class
// 클래스를 사용하여 객체의 형태, 포함해야 하는 데이터, 클래스를 기반으로 객체를 쉽게 만들 수 있으려면 어떤 메소드가 필요한지 정의할 수 있기 때문에 이를 클래스 내의 인스턴스라 부름
// 객체는 클래스 내의 인스턴스
// 이러한 클래스를 기반으로 하면 동일한 구조, 동일한 클래스를 기반으로 하는 동일한 메소드로 여러 객체를 빠르게 복사 가능
// 클래스는 객체의 형태, 포함해야 할 속성과 메소드를 정의하는데 좋음
// 객체에 저장된 정확한 데이터 세부 정보만 다르고 동일한 구조 유지
// 클래스임을 명확히 하기 위해 첫글자는 대문자
class Department {
    // 생성자 메소드 (예약어)
    // 클래스와 연결되며 객체가 생성되면서 실행되는 클래스에 기반하여 만드는 모든 객체에 연결되는 함수
    // 이를 활용하여 구축하는 객체에 대한 초기화 작업 가능
    constructor(n) {
        this.name = n;
    }
    describe() {
        console.log('Department: ' + this.name); // this는 일반적으로 생성된 클래스의 구체적인 인스턴스를 참조, .표기로 인스턴스의 모든 속성과 메소드에 접근 가능
    }
}
const accounting = new Department('Accounting');
accounting.describe();
// 이 메소드를 실행할 때는 this가 아래 객체를 참조하지 않음
const accountingCopy = { describe: accounting.describe }; // 객체 리터럴로 생성되어 클래스나 정의된 특정 클래스를 기반으로 하지 않고 더미 객체로 생성되어 부서이름 출력 X
accountingCopy.describe(); // Dapartment: undefined
// undefined 해결 (ts class에서만 가능함)
class Department2 {
    constructor(n) {
        this.name = n;
    }
    describe() {
        // this: Department2 로 적으면 객체는 결국 Department 타입이 되어 에러 발생
        console.log('Department: ' + this.name);
    }
}
const accounting2 = new Department2('Accounting');
accounting2.describe();
const accountingCopy2 = { name: 'Dummy', describe: accounting2.describe }; // 에러 해결을 위해 name 프로퍼티 추가
accountingCopy2.describe(); // Dapartment: Dummy
//# sourceMappingURL=classConcept.js.map