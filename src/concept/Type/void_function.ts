////// 함수 반환 타입 추론
function add(n1: number, n2: number) {
    return n1 + n2;
}
// 함수 반환 타입도 추론
// function add(n1: number, n2: number): number

function add2(n1: number, n2: number): number {
    return n1 + n2;
}
// 반환 타입 명시 가능 => 타입을 명시적으로 설정할 이유가 없다면 타입스크립트가 추론하게 두는 것이 좋음


////// void 타입
function printResult_(num: number): void {
    console.log('Result: ' + num);
}
// function printResult(num: number): void
// void : 작업도 수행하고 코드도 실행하고 에러도 띄우지 않지만 아무것도 반환하지 않음
// 함수에 의도적으로 반환문이 없음을 명시할 때는 undefined가 아닌 void를 적음

function printResult2(num: number): undefined {
    console.log('Result: ' + num);
    return;
}
// undefined는 실제 값을 반환하지 않을 때 return를 적음으로써 사용하기도 함

console.log(printResult_(add(4, 12)));
// 아무 것도 반환하지 않는 값이면 undefined 반환
// undefined도 유효한 값임

// 값을 반환하지 않는 함수를 사용하는 경우 void 사용 => 추론 가능하므로 굳이 명시 X


////// 함수 타입
let combineValues;

combineValues = add;

console.log(combineValues(8, 8));
// combineValues는 any 타입으로 다시 다른 것을 할당해서 컴파일 할 수 있음 => 런타임 에러 확률 ↑

// combineValues가 함수임을 명시해주면 됨
let combineValues2: Function;

combineValues2 = add;   // 잘못된 함수를 입력했을 경우의 대처 X

console.log(combineValues2(8, 8));

// 명확하게 알려주기
let combineValues3: () => number;
// combineValues3가 매개변수를 취하지 않는 any 함수를 받아드리지 않고 number를 반환
let combineValues4: (a: number, b: number) => number;
// 매개변수 개수와 타입까지 맞추어 명시 (매개변수 이름은 자유)


////// 콜백과 함수 타입
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10, 20, (result) => {      // (parameter) result: number , 매개변수 하나인 숫자 타입 콜백 함수일 것을 추론
    console.log(result);
    // return result;   "cb: (num: number) => void" 리턴 값을 void로 지정해놨기 때문에 반환 값은 없음
});

// call signatures
type Add = (a: number, b: number) => number;
const add4:Add = (a, b) => a + b;