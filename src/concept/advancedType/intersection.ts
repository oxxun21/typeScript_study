// intersection 타입 : 다른 타입과 결합을 가능하게 함
// intersection 교차로, 교차지점

type Admin = {
    name: string;
    privileges: String[];
};

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;   // 결과는 두 타입이 결합된 새 객체 타입이 됨

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
};

// interface를 사용해도 결합이 가능
interface Admin2 {
    name: string;
    privileges: String[];
};

interface Employee2 {
    name: string;
    startDate: Date;
}

interface ElevatedEmployee2 extends Employee2, Admin2 {}

type Combinable1 = string | number;  // 유니온 타입
type Numeric = number | Boolean;

type Universal = Combinable1 & Numeric;     // Universal을 숫자 타입으로 간주 => 중복되는 타입(개념 확인 필요)

// 유니온 타입 결합처럼 런타임 시 코드의 타입 확인이 필요할 때 확인 시켜주는 로직을 "타입 가드"라고 함
function addType(a: Combinable1, b:Combinable1){
    if (typeof a === 'string' || typeof b === 'string'){    // typeof를 이용한 타입 가드
        return a.toString() + b.toString();
    }
    return a+ b;
}

// 타입 가드를 위한 if문은 자바스크립트로 컴파일 되기 때문에 사용자 정의 타입을 typeof로 검사하는 것은 안됨
type UnknownEmployee = Employee | Admin;

function EmployeeInformation(emp: UnknownEmployee){
    console.log('Name: ' + emp.name);
    if ('privileges' in emp){      // 객체의 키 값이 있는지 확인할 땐 in 키워드를 사용
        // emp 내에 존재한다면 ts가 감지하고 if문 내의 속성으로 접근 가능하게 함
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp){
        console.log('Start Date: ' + emp.startDate);
    }
}

EmployeeInformation(e1);

// 클래스 사용 시 다른 유형의 타입가드
class Car {
    drive(){
        console.log('Driving...');
    }
}
class Truck {
    drive(){
        console.log('Driving a truck...');
    }

    loadCargo(amount: number){
        console.log('Loading Cargo ...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(Vehicle: Vehicle){  // Vehicle는 유니온 타입
    Vehicle.drive();
    if ('loadCargo' in Vehicle) {       // 방법 1
        Vehicle.loadCargo(1000);
    }
    if (Vehicle instanceof Truck) {     // 방법 2 (오타 확률 적음)
        Vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// 결국 타입가드는 특정 속성이나 메소드를 사용하기 전에 그것이 존재하는지 확인하거나 타입을 사용하기 전에 
// 이 타입으로 어떤 작업을 수행할 수 있는지를 확인하는 개념 또는 방식을 나타내는 용어
// 객체에선 instanceof나 in을 사용하여 수행
// 다른 타입은 typeof 사용

// in 키워드 : 해당 속성이 객체 안에 있는지 검사 (true, false)

// instanceof 연산자 : 객체가 특정 클래스에 속하는지 검사 (true, false)
// 기본형 : object instanceof Class
// interface로 구현시 타입가드에서 사용 X

// discriminated union (구별된 유니온) : 타입가드를 쉽게 구현할 수 있게 해주는 유니온 타입으로 작업을 수행할 때 사용할 수 있는 패턴, 객체 타입 작업도 사용 가능
// interface에서 switch case 구문 사용
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {      // 공통된 타입을 넣음으로 검사 가능
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});
// moveAnimal({type: 'bird', runningSpeed: 10}); 속성이 맞지 않아 오류 출력