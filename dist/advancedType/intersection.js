"use strict";
// intersection 타입 : 다른 타입과 결합을 가능하게 함
// intersection 교차로, 교차지점
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
};
;
// 유니온 타입 결합처럼 런타임 시 코드의 타입 확인이 필요할 때 확인 시켜주는 로직을 "타입 가드"라고 함
function addType(a, b) {
    if (typeof a === 'string' || typeof b === 'string') { // typeof를 이용한 타입 가드
        return a.toString() + b.toString();
    }
    return a + b;
}
function EmployeeInformation(emp) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) { // 객체의 키 값이 있는지 확인할 땐 in 키워드를 사용
        // emp 내에 존재한다면 ts가 감지하고 if문 내의 속성으로 접근 가능하게 함
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}
EmployeeInformation(e1);
// 클래스 사용 시 다른 유형의 타입가드
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading Cargo ...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(Vehicle) {
    Vehicle.drive();
    if ('loadCargo' in Vehicle) { // 방법 1
        Vehicle.loadCargo(1000);
    }
    if (Vehicle instanceof Truck) { // 방법 2 (오타 확률 적음)
        Vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) { // 공통된 타입을 넣음으로 검사 가능
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving at speed: ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
// moveAnimal({type: 'bird', runningSpeed: 10}); 속성이 맞지 않아 오류 출력
