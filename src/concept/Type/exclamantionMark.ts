// !는 주로 false를 의미하는 연산자로 사용
// Ts에서 변수 뒤에 !를 사용하여 다른 용도로 사용 가능

// 1. Null이 아닌 어선셜 연산자 , Non-null assertion operator
// 피연산자가 null이 아니라고 컴파일러에게 전달하여 일시적으로 null 제약조건을 완화함

const button = document.querySelector('button')!;   // !가 없으면 아래 에러 발생

button.addEventListener('click', () => {    // 개체가 'null'인 것 같습니다
    console.log('Clicked');
});
// 느낌표가 개발자에게 이 button이 존재하거나 이 연산이 null이 아닌 값을 반환해야함을 알려줌
// 해당 expression이 null 또는 undefined가 될 수 없다고 단언해줌

// 2. 확정 할당 어선셜 , Definite Assignment Assertions
// 값이 무조건 할당되어있다고 컴파일러에게 전달하여 값이 없어도 변수 또는 객체를 사용

// let x: number;
// console.log(x + x);    'x' 변수가 할당되기 전에 사용되었습니다.

let x!: number;
console.log(x + x);        // 에러 발생 X