// Union 타입: 숫자와 문자열로도 작업 가능함
// 숫자가 결과로 반환되는 경우도 있고, 연결된 문자열이 나타나는 경우도 있음
// 숫자와 문자열로 작업 가능한 유연한 조합 함수를 포함하는 애플리케이션을 구축 가능하게 함
function combine(
    input1: number | string | boolean, 
    input2:  number | string | boolean,
    resultConversion: string
    ) {
    // 유니온 타입을 사용하면 매개변수를 유연하게 사용할 수 있음 
    let result;
    // 추가적인 런타임 검사
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;     // + 기호를 붙이면 숫자로 변환되도록 함
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);


// Literal 타입: 정확한 값을 가지는 타입, 타입이 추론되지 않고 값 그 자체 (변하지 않는 상수)
function combineLiteral(
    input1: number | string, 
    input2:  number | string,
    resultConversion: 'as-number' | 'as-text'   // 유니온 타입을 리터럴 타입과 결합하여 사용, 이 문자열들만 특정하여 허용
) {}    // resultConversion의 값은 as-number과 as-text로 보장받음 => 오류 찾기 수월