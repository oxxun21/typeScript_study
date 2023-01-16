// Function overloads : 동일한 함수에 대해 여러 함수 시그니처를 정의
// 다양한 매개변수를 지닌 함수를 호출하는 여러 가지 가능한 방법을 사용하여 함수 내에서 작업을 수행할 수 있게 함
// 자체적으로 반환 타입을 정확히 추론하지 못하는 경우에 다 설정해주는 형식

type Combinable2 = string | number;
type Numeric2 = number | Boolean;

type Universal2 = Combinable1 & Numeric;  

function addOverload(a: number, b: number): number;
function addOverload(a: string, b: string): string;
function addOverload(a: number, b: string): string;
function addOverload(a: string, b: number): string;

function addOverload(a: Combinable1, b:Combinable1){
    if (typeof a === 'string' || typeof b === 'string'){  
        return a.toString() + b.toString();
    }
    return a+ b;
}
// function addOverload(a: number, b: number): number (+3 overloads) => 오버로드를 등록하여 3가지의 방법이 더 있음을 알게됨

const result1 = addOverload('Max' , ' schwarz');
result1.split(' ');   //  오버로드가 없는 경우 문자열로 추론될 것 같지만 문자열 혹은 숫자형으로 추론되어 문자열 메서드 사용 불가