// Type Alias(타입 알리아스): 타입 별칭을 사용하여 타입을 직접 생성할 수 있음
// 유니온 타입을 반복하는 것은 번거롭기 때문에 유니온 타입을 저장할 수 있음
// 유니온 타입의 동일한 타입이나 동일한 유형 설정을 참조시킴
// 타입 설정이 필요한 코드 어디서나 사용할 수 있고, 타입의 별칭을 직접 설정함으로써 의도를 명확하게 반영할 수 있음
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combineLiteral_(
    input1: Combinable, 
    input2:  Combinable,
    resultConversion: ConversionDescriptor
) {}

// 유니온 타입 외 객체 타입에도 별칭을 붙여 중복된 부분을 단순화시킬 수 있음 
// before
function greet(user: { name: string; age: number }) {
    console.log('Hi, I am ' + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
    return checkAge > user.age;
}
// after
type User = { name: string; age: number };

function greetAlias(user: User) {
    console.log('Hi, I am ' + user.name);
}

function isOlderAlias(user: User, checkAge: number) {
    return checkAge > user.age;
}