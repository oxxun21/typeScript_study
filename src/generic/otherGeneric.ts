// 제네릭 타입 제약조건 사용
// function merge<T extends object, U extends object>(objA: T, objB: U){
//     return Object.assign(objA, objB);   // 왜 자꾸 오류 뜨지? → T extends object 쓰니까 사라짐;
// }

// const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30});
// console.log(mergedObj);
// 제약조건에 거는 타입도 어떤 타입이든 상관 없음
// 무조건 모든 제네릭 타입에 제약조건을 걸어야하는 것은 아님
// T와 U에 제약조건을 사용함으로써 정확한 타입도 상관없고, 정확한 구조도 상관없지만 어떤 "객체"여야만 한다는 것을 알림

// 일반 함수에서 사용
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string]{      // [T, string] 튜플 타입을 이용하여 각 요소에 제네릭과 문자열 타입이 오는 것을 알림 
    let descriptionText = 'Got no value.';
    if (element.length === 1 ){
        descriptionText = 'Got 1 element.';
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements.';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe(''));
// 유연한 작업이 요구될 때 제네릭 타입을 사용하면 제약조건 덕분에 정확한 타입에 대해 신경쓰지 않고 작업할 수 있음

// keyof 제약조건
// 객체를 첫번째 인수로 가지고 두번째 매개변수가 결과적으로 키가 되는 함수
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){    // U는 T타입의 키가 됨
    return 'Value: ' + obj[key];    // 제네릭이 없을때 obj[key] 에러이유 : obj 객체에 키가 있는지 보장할 수 없음을 알림
} 
extractAndConvert({name : 'max'}, 'name');

// 제네릭 클래스
// 제네릭 클래스를 원시 값으로 사용하면 타입 안전성을 확보할 수 있음
class DataStorage<T extends string | number | boolean> {     // 제네릭 클래스가 아닐 시 item 전부 에러 발생
    private data: T[] = [];

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        if(this.data.indexOf(item) === -1){
            return; // 잘못된 item 제거를 방지
        }   // 참조 형식인 값이 제대로 동작하는지 확인하는 로직
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItem(){
        return [...this.data];
    }
}
const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItem());

const numberStorage = new DataStorage<number>();
// 제네릭 클래스를 구현하면 다른 데이터 스토리지가 필요할 때 다른 타입의 해당 스토리지를 추가할 수 있음

// const objStorage = new DataStorage<object>();

// const maxObj = {name: 'Max'}    // 정확히 같은 객체로 만들어줌
// objStorage.addItem(maxObj);
// // objStorage.addItem({name: 'Max'});
// objStorage.addItem({name: 'Manu'});

// objStorage.removeItem(maxObj);
// // objStorage.removeItem({});   내용을 지워도 console 내용은 바뀌지 않음 → 객체는 참조 값이기 때문
// console.log(objStorage.getItem());
// // 원시 값이 아닌 요소로 작업을 수행하는 것은 지양
// // → 객체나 배열로 작업하는 경우 객체를 전달하면 indexof 작동 X

// 제네릭 유틸리티 타입 → 컴파일 단계에서 타입들이 추가적인 타입 안전성과 유연성 제공
interface CourseGoal {
    title: string;
    desciption: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, desciption: string, date: Date): CourseGoal{
    let courseGoal: Partial<CourseGoal> = {};
    // Partial ? 만든 타입 전체를 모든 속성이 선택적인 타입, CourseGoal를 선택적인 객체 타입으로 바꿈
    // 각 단계 이전에 추가적인 유효성 검사 수행
    courseGoal.title = title;
    courseGoal.desciption = desciption;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

const readnames: Readonly<string[]> = ['Max', 'Anna'];
// readnames.push('Manu'); → X
// readnames.pop(); → X
// Readonly를 사용하여 속성을 변경하지 못하도록 함