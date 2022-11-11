"use strict";
function add_(n1, n2, showResult, phrase) {
    if (showResult) {
        console.log(phrase + n1 + n2);
    }
    else {
        return n1 + n2;
    }
}
let number3;
number3 = 3; // 값을 나중에 할당할 때에 한해서 밑에서 타입 지정
const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';
add_(number1, number2, printResult, resultPhrase);
