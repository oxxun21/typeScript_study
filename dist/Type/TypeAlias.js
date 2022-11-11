"use strict";
function combineLiteral_(input1, input2, resultConversion) { }
// 유니온 타입 외 객체 타입에도 별칭을 붙여 중복된 부분을 단순화시킬 수 있음 
// before
function greet(user) {
    console.log('Hi, I am ' + user.name);
}
function isOlder(user, checkAge) {
    return checkAge > user.age;
}
function greetAlias(user) {
    console.log('Hi, I am ' + user.name);
}
function isOlderAlias(user, checkAge) {
    return checkAge > user.age;
}
