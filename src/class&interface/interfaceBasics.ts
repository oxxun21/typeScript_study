// Ts에서 interface는 객체의 구조를 말함, 객체의 형태를 설명
// Js에는 없는 키워드
// 클래스와 달리 인터페이스는 청사진으로 이용하지 않고 사용자 정의 타입으로만 사용
// interface도 정의 첫글자는 대문자
// 인터페이스에 선택적 속성을 입력하고(?사용) 클래스에는 선택적이지 않은 속성으로 구현한 다음 로직이 항상 초기화 되도록 해야 함

interface Named {
    readonly name?: string;      // readonly을 추가하여 인터페이스를 기반으로 구축하는 모든 객체의 속성이 한 번만 설정되게 하고, 이후에는 읽기전용으로 설정하여 객체가 초기화되면 변경할 수 없도록 만듬
    outputName?: string;    // Named.outputName?: string | undefined, 물음표를 붙여서 문자열이어야 하는지의 여부를 선택적으로 바꿈 (? : 선택적 속성 지정)
    // 기본 폴백 fallback 값을 입력하거나 기본값이 정의되지 않은 경우 물음표를 추가할 수 있음
}

// 두 개 이상 확장 시 쉼표로 구분 interface Greetable extends Named, AnitherInterface1 {}
interface Greetable extends Named {     // Named도 가질 수 있도록 interface 확장, 새 인터페이스를 형성함 => 인터페이스 결합 가능 
    // 코드 블록 내에서 객체의 형태를 정의함
    // 필드 정의 추가, 초기값 정의 X
    // 구체적인 값이 아닌 구조만 생성
    // 메소드 정의는 실제 메소드를 추가하는 것이 아닌 구조와 형태를 잡아두는 것
    // readonly 읽기전용 가능 / public, private 등은 지정 X

    // age: number;

    greet(phrase: string): void;    // 메소드
}

class Person implements Greetable {     // Greetable 인터페이스를 이 클래스에서 사용할 것임
    name?: string;
    age = 30;

    constructor(n?: string){
        if (n) {
            this.name = n;
        }
    }
    greet(phrase: string){
        if (this.name){
            console.log(phrase + ' ' + this.name);
        } else {
            console.log('Hi');
        }
    }
}

let user1: Greetable;  // 인터페이스를 타입으로 적용

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