"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var App;
(function (App) {
    // Component Base Class
    class Component {
        constructor(templatedId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templatedId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    // autobind decorator
    function autobind(_, _2, descriptor) {
        const originaMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originaMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
    App.autobind = autobind;
})(App || (App = {}));
var App;
(function (App) {
    function validate(ValidatableInput) {
        let isValid = true;
        if (ValidatableInput.required) {
            isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
        }
        if (ValidatableInput.minLength != null && typeof ValidatableInput.value === 'string') {
            isValid = isValid && ValidatableInput.value.length >= ValidatableInput.minLength;
        }
        if (ValidatableInput.maxLength != null && typeof ValidatableInput.value === 'string') {
            isValid = isValid && ValidatableInput.value.length <= ValidatableInput.maxLength;
        }
        if (ValidatableInput.min != null && typeof ValidatableInput.value === 'number') {
            isValid = isValid && ValidatableInput.value >= ValidatableInput.min;
        }
        if (ValidatableInput.max != null && typeof ValidatableInput.value === 'number') {
            isValid = isValid && ValidatableInput.value <= ValidatableInput.max;
        }
        return isValid;
    }
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, numOfPeople) {
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />
var App;
(function (App) {
    // ProjectInput class
    class ProjectInput extends App.Component {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptInputElement = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
        renderContent() { }
        gatherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable = {
                value: enteredTitle,
                required: true,
                minLength: 2,
            };
            const peopleValidatable = {
                value: enteredTitle,
                required: true,
                min: 1,
                max: 2,
            };
            if (!App.validate(titleValidatable) ||
                !App.validate(descriptionValidatable) ||
                !App.validate(peopleValidatable)) {
                alert('Invalid input, please try again');
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
        clearInputs() {
            this.titleInputElement.value = '';
            this.descriptInputElement.value = '';
            this.peopleInputElement.value = '';
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                App.projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        App.autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    // Project Type
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />
var App;
(function (App) {
    // ProjectList class
    class ProjectList extends App.Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData('text/plain');
            App.projectState.moveProject(prjId, this.type === 'active' ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            App.projectState.addListener((projects) => {
                const relevantProject = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === App.ProjectStatus.Active;
                    }
                    return prj.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProject;
                this.renderProjects();
            });
        }
        ;
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = '';
            for (const prjItme of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector('ul').id, prjItme);
            }
        }
    }
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
// namespace 내에서 import 가능
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList('active');
    new App.ProjectList('finished');
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag-drop.ts" />
var App;
(function (App) {
    // ProjectItem class
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return '1 person';
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(_) {
            console.log('DragEnd');
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.persons + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    __decorate([
        App.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
// const : 상수나 변수를 정의하도록 해줌
// 차이점은 새로운 값을 할당하려고 하면 그 값이 정확한 타입이라 하더라도 에러를 발생시킴
// 변경 불가능
// let : 변경 가능한 변수
// var와 비슷하지만 var를 사용하는 것은 피하는 것이 좋음
// let와 var는 변수를 사용할 수 있는 유효범위(스코프)가 다름
function addVar(a, b) {
    var result;
    result = a + b;
    return result;
}
// console.log(result); > 오류 발생 result는 함수 내에서만 접근 가능하기 때문
var result;
function addVar2(a, b) {
    result = a + b;
    return result;
}
console.log(result); // result가 전역 스코프로 작동되어 오류 발생 X
// let도 동일하지만 다른 것은 var는 전역 유효범위와 함수의 유효범위만 지닌다는 것
// let과 const는 블록 스코프의 개념을 가짐, 변수나 상수가 정의된 블록이나 하위 블록에서는 항상 유효함
// 화살표 함수
const addArrow = (a, b) => a + b;
console.log(addArrow(2, 5));
const btn = document.querySelector('button');
if (btn) {
    button.addEventListener('click', (event) => { console.log(event); });
}
// 기본 값이 없는 인자가 몇 번째에 있는지 모르기 때문에 순서에 따라 기본 값은 오른쪽에 넣어야 함
const addArrow2 = (a, b = 1) => a + b;
console.log(addArrow2(5));
// 스프레드 연산자
const food = ['banana', 'apple'];
const anotherfood = ['soup'];
const anotherfood2 = ['soup', ...food]; // 인수의 목록 사용, 이 위치에서 기존 배열을 해당 배열로 전개 가능
// anotherfood.push(food[0], food[1]);  
// 상수로 push가 가능한 이유는 배열은 객체이고 객체는 참조 값이기 때문
// 위처럼 인덱스로 각각 넣는 것이 번거롭기 때문에 스프레드 연산자를 사용
anotherfood.push(...food); // 해당 배열의 모든 요소를 꺼내 값의 목록으로 추가해라
// 원본을 변경하는 것이 아닌 완전한 복사본을 만듬
const person1 = {
    firstName: 'Max',
    age: 30
};
const copiedPerson1 = Object.assign({}, person1); // 객체가 필요한 곳 어디서든 사용 가능
// 나머지 매개변수
// const add3 = (a, b, c, d) => {};  유연한 작업 불가
const add3 = (...numbers) => {
    let result = 0;
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add3(5, 10, 2, 3.7);
console.log(addedNumbers);
// 나머지 매개변수를 사용해서 쉼표로 구분된 문자열(or 숫자) 목록이 배열로 병합되고 처리
// 튜플 타입으로도 실행 가능
const addTuple = (...numbers) => {
    let result = 0;
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedTuples = addTuple(5, 10, 2);
console.log(addedTuples);
// 배열 및 객체 비구조화 할당
// const food1 = food[0];
// const food2 = food[1];
const [food1, food2, ...remainingFood] = food; // remainingFood : food1, food2에 추출하지 않은 나머지 요소가 모두 새 배열에 저장
// 오른쪽에 구조 분해하려는 배열을 입력
// 구조분해란 배열에서 요소를 추출하는 것, 원본 배열 변경 X
// 배열은 정렬되어 있어 순서대로 추출하지만 항상 보장되지 않으므로 위치별 요소를 추출하는 것이 아닌 키 이름으로 요소를 추출
const { firstName, age } = person1;
// 따라서 중괄호 내에는 값이나 이름을 임의로 지정하지 않음, 객체에 입력된 속성 이름을 사용해야 이 키들의 값이 객체에서 추출되어 같은 이름의 상수나 변수에 저장됨
const { firstName: Name, age: newAge } = person1;
// 이름을 따로 변경하고 싶을 때는 위처럼 사용
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
// 배열은 객체 내부던지 외부던지 완전히 동일함
// 대괄호 쌍 앞에 대괄호 안에 저장되는 데이터 타입을 입력
const exampleArray = {
    hobbies: ['Sports', 'Cooking']
};
let Activities_; // 문자열들의 배열이다.
Activities_ = ['Sports'];
let ActivitiesAny; // 여러 타입의 배열이다.
ActivitiesAny = ['Sports', 1];
for (const hobby of exampleArray.hobbies) {
    console.log(hobby.toUpperCase()); // toUpperCase() 와 같은 문자열에 사용하는 함수도 인식되어 사용 가능
}
// 튜플 타입 선언 방법
const exampleTuple = {
    role: [2, 'author']
};
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
////// 컴파일러
// 커맨드를 직접 실행하고(tsc app.ts) 반복적으로 직접 컴파일을 하는 작업을 줄이기 위해 "관찰(watch) 모드"를 사용할 수 있음
// 관찰 모드는 타입스크립트가 파일을 관찰하고 파일에 변경사항이 있을 때마다 다시 컴파일 해줌
// tsc app.ts --watch(-w)
// 파일을 구체적으로 지정해주어야 함 (규모가 큰 프로젝트에선 사용 X)
// index에 연결되어있는 ts 파일이 2개 이상일 경우
// 1. tsc --init (파일 지정 X) 
// 2. tsconfig.json : 타입스크립트가 관리해야 하는 해당 파일이 포함된 프로젝트와 해당 폴더의 모든 하위 폴더를 참고
// 3. tsc 만 입력하여 모든 파일을 자동 컴파일
// 4. tsc --watch 모든 파일이 컴파일 대상이 되었을 때 관찰 모드로 돌림
// 파일 포함/제외 시키기
// tsconfig.json에서 어떤 파일을 컴파일하는지 타입스크립트에서 알려줌
// node_modules 는 일반적으로 exclude 시킴 (exclude 옵션을 사용하지 않을 경우 node_modules 파일의 제외는 기본 값임으로 굳이 설정하지 않음)
// node_modules 폴더에는 package.json에 설치한 모든 종속성이 포함 (변경하지 않아야 할 타사 라이브러리를 가져오는 위치가 됨)
// 그 라이브러리들 중 일부가 타입스크립트 코드를 제공하는 경우 컴파일하게 되면 계산 과정이 느려질뿐더러 프로젝트가 망가질 수도 있음
// enum (열거형) : 상수들의 집합을 정의하고 싶은 경우 사용
// 값들의 집합을 명명하고 이를 사용
// 역할이 없는 숫자도 추가가 가능하다는 단점 존재
// 선언 후 변경 불가, 속성 값으로 문자열 혹은 숫자만 허용
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
// 값을 0(기본값)부터 시작하고 싶지 않을 때는 숫자를 할당해줌 
// 필요에 따라 임의의 숫자를 모든 식별자에 고유한 값으로 할당 가능 (텍스트, 혼합 할당 가능)
// enum Role { ADMIN = 5, READ_ONLY, AUTHOR };  5, 6, 7
// enum Role { ADMIN = 5, READ_ONLY = 'READ_ONLY', AUTHOR = 250 }; 
const example = {
    role: Role.ADMIN,
};
if (example.role === Role.ADMIN) {
    console.log('is admin');
}
// js 컴파일
// (function (Role) {
//     Role[Role["ADMIN"] = 0] = "ADMIN";
//     Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
//     Role[Role["AUTHOR"] = 2] = "AUTHOR";
// })(Role || (Role = {}));
// any : 모든 종류의 값 저장 (타입 배정 필요 없음)
let Activities;
Activities = ['Sports', 5]; // 배열이기만 하면 어떤 값이든 저장 가능
// any 타입은 타입스크립트 컴파일러가 작동하지 않음
// 어떤 값이나 종류의 데이터가 어디에 저장될지 알 수 없는 경우, 런타임 검사 수행, 런타임 도중 특정 값에 수행하고자 하는 작업의 범위 좁히기 => any 사용
// !는 주로 false를 의미하는 연산자로 사용
// Ts에서 변수 뒤에 !를 사용하여 다른 용도로 사용 가능
// 1. Null이 아닌 어선셜 연산자 , Non-null assertion operator
// 피연산자가 null이 아니라고 컴파일러에게 전달하여 일시적으로 null 제약조건을 완화함
const button = document.querySelector('button'); // !가 없으면 아래 에러 발생
button.addEventListener('click', () => {
    console.log('Clicked');
});
// 느낌표가 개발자에게 이 button이 존재하거나 이 연산이 null이 아닌 값을 반환해야함을 알려줌
// 해당 expression이 null 또는 undefined가 될 수 없다고 단언해줌
// 2. 확정 할당 어선셜 , Definite Assignment Assertions
// 값이 무조건 할당되어있다고 컴파일러에게 전달하여 값이 없어도 변수 또는 객체를 사용
// let x: number;
// console.log(x + x);    'x' 변수가 할당되기 전에 사용되었습니다.
let x;
console.log(x + x); // 에러 발생 X
const person = {
    // 키 : 값 지정
    name: 'hi',
    age: 22,
};
const object = {}; // 객체 기본 형태
console.log(person.name);
const product = {
    id: 'abc1',
    price: 12.99,
    tags: ['great-offer', 'hot-and-new'],
    details: {
        title: 'Red Carpet',
        description: 'A great carpet - almost brand-new!'
    }
};
// Union 타입: 숫자와 문자열로도 작업 가능함
// 숫자가 결과로 반환되는 경우도 있고, 연결된 문자열이 나타나는 경우도 있음
// 숫자와 문자열로 작업 가능한 유연한 조합 함수를 포함하는 애플리케이션을 구축 가능하게 함
function combine(input1, input2, resultConversion) {
    // 유니온 타입을 사용하면 매개변수를 유연하게 사용할 수 있음 
    let result;
    // 추가적인 런타임 검사
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2; // + 기호를 붙이면 숫자로 변환되도록 함
    }
    else {
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
function combineLiteral(input1, input2, resultConversion // 유니온 타입을 리터럴 타입과 결합하여 사용, 이 문자열들만 특정하여 허용
) { } // resultConversion의 값은 as-number과 as-text로 보장받음 => 오류 찾기 수월
////// unknown 타입
let userInput; // 무엇을 입력할지 모름, 어떤 값이든 할당할 수 있지만 any 와는 다름
let userName;
userInput = 5;
userInput = 'Max';
// userName = userInput;    unknown타입은 string에 할당할 수 없다고 오류 발생, any 타입이라면 오류 발생 X
if (typeof userInput === 'string') {
    userName = userInput;
}
////// never 타입 (아직 정식으로 반영되진 않음, 명시적 설정은 가능)
function generateError(message, code) {
    // throw : 값, 객체를 넘김
    throw { message: message, errorCode: code };
}
generateError('An error occurred', 500);
// never를 명시함으로써 코드의 의도를 더 명확히 하고, 함수가 아무것도 반환하지 않음을 알리며 
// 기본적으로 스크립트나 스크립트의 일부를 충돌시키거나 망가트리기 위한 것임을 알림
////// 함수 반환 타입 추론
function add(n1, n2) {
    return n1 + n2;
}
// 함수 반환 타입도 추론
// function add(n1: number, n2: number): number
function add2(n1, n2) {
    return n1 + n2;
}
// 반환 타입 명시 가능 => 타입을 명시적으로 설정할 이유가 없다면 타입스크립트가 추론하게 두는 것이 좋음
////// void 타입
function printResult_(num) {
    console.log('Result: ' + num);
}
// function printResult(num: number): void
// void : 작업도 수행하고 코드도 실행하고 에러도 띄우지 않지만 아무것도 반환하지 않음
// 함수에 의도적으로 반환문이 없음을 명시할 때는 undefined가 아닌 void를 적음
function printResult2(num) {
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
let combineValues2;
combineValues2 = add; // 잘못된 함수를 입력했을 경우의 대처 X
console.log(combineValues2(8, 8));
// 명확하게 알려주기
let combineValues3;
// combineValues3가 매개변수를 취하지 않는 any 함수를 받아드리지 않고 number를 반환
let combineValues4;
// 매개변수 개수와 타입까지 맞추어 명시 (매개변수 이름은 자유)
////// 콜백과 함수 타입
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
addAndHandle(10, 20, (result) => {
    console.log(result);
    // return result;   "cb: (num: number) => void" 리턴 값을 void로 지정해놨기 때문에 반환 값은 없음
});
// Function overloads : 동일한 함수에 대해 여러 함수 시그니처를 정의
// 다양한 매개변수를 지닌 함수를 호출하는 여러 가지 가능한 방법을 사용하여 함수 내에서 작업을 수행할 수 있게 함
// 자체적으로 반환 타입을 정확히 추론하지 못하는 경우에 다 설정해주는 형식
function addOverload(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
// function addOverload(a: number, b: number): number (+3 overloads) => 오버로드를 등록하여 3가지의 방법이 더 있음을 알게됨
const result1 = addOverload('Max', ' schwarz');
result1.split(' '); //  오버로드가 없는 경우 문자열로 추론될 것 같지만 문자열 혹은 숫자형으로 추론되어 문자열 메서드 사용 불가
// index Type : 객체가 지닐 수 있는 속성에 대해 보다 유연한 객체를 생성하게 해줌
const errorBag = {
    email: 'Not a vaild email',
    username: 'Must start with a character',
};
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
// optional chaining (?.) : 개체의 속성에 접근하거나 함수를 호출함, 개체가 undefined 또는 null인 경우 오류를 발생시키는 대신 undefined를 반환
// 옵셔널 체이닝 연산자는 객체 데이터의 중첩된 속성과 객체에 안전하게 접근 가능
var _a;
const fetchedUserDate = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }
};
console.log((_a = fetchedUserDate === null || fetchedUserDate === void 0 ? void 0 : fetchedUserDate.job) === null || _a === void 0 ? void 0 : _a.title); // 정의되어 있는지 여부가 확실치 않은 부분에 ? 추가
// null 병합 연산자 (??) : 왼쪽 피연산자가 null 또는 undefined일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환 
const userInputNull = '';
const storedDate = userInputNull !== null && userInputNull !== void 0 ? userInputNull : 'DEFAULT';
// userInputNull이 (빈문자열이나 0이 아닌) null이거나 undefined라면 폴백을 사용
console.log(storedDate);
// 형 변환(type assertions) : 타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려줌
// const paragraph = document.querySelector('p'); HTMLParagraphElement, html 요소에 id 추가 시 ts는 p 태그를 읽지 못함
const paragraph = document.getElementById('message-output'); // HTMLElement, 어떤 특정 html 요소인지는 모름
// const userInputElement = document.getElementById('user-input')!;
// userInputElement.value = 'hi there!';   html 요소인 것만 추론하기 때문에 value 속성이 있는지는 모름
// 그렇기 때문에 !로 null이 아님을 알려주기보단 input 요소인 걸 알려야 함 => 형 변환으로 구현
// 방법 1 : 변환하고자 하는 요소 앞이나 타입스크립트에 타입을 알려주고자 하는 위치 앞에 태그 추가
const userInputElement = document.getElementById('user-input'); // html의 input요소임을 알림
// 방법 2 : 선택한 부분 다음에 as 키워드를 입력한 후 이를 어떤 타입으로 변환할 것인지 입력
const userInputElement2 = document.getElementById('user-input');
// document.getElementById('user-input')! => null을 반환하지 않을 것을 확신하면 느낌표를 사용하지만 확실치 않다면 if문 사용
const userInputElement3 = document.getElementById('user-input');
if (userInputElement3) {
    // ()로 감싸 표현식을 먼저 평가되도록 한 다음 표현식 결과 값에 접근
    userInputElement3.value = 'hi there...';
}
userInputElement.value = 'hi there!';
function Logger(logString) {
    console.log("LOGGER FACTORY");
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// _ : 타입스크립트의 시그널 (명시만 해두는 용도) 
function WithTemplate(template, hookId) {
    console.log("TEMPLATE FACTORY");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("Renderig template");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
// @Logger("LOGGING - PERSON")   // @은 읽히거나 찾는 식별자 상징
let Person2 = class Person2 {
    constructor() {
        this.name = "max";
        console.log("Creating person object");
    }
};
Person2 = __decorate([
    Logger("LOGGING"),
    WithTemplate("<h1>My Person object</h1>", "app")
], Person2);
const pers = new Person2();
console.log(pers);
// 데코레이터 factory 정의 : 데코레이터 함수 도출, 어떤 대상에 데코레이터를 할당할 때 설정할 수 있게 함
// 팩토리 함수와 함께 실행하면 데코레이션 함수 값을 커스터마이즈 가능
function Log(target, propertyName) {
    console.log("Property decorator");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price - should be positive");
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = "This works";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button2 = document.querySelector("button");
button2.addEventListener("Click", p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", event => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert("Invalid input, please try again");
        return;
    }
    console.log(createdCourse);
});
// https://www.typescriptlang.org/docs/handbook/decorators.html
// 객체 지향 프로그래밍 : 애플리케이션을 어떻게 구축할 것인지, 논리적으로 어떻게 나눌 수 있을지에 대한 방법
// 객체 지향 방법으로 객체를 구성하면서 앱이나 애플리케이션 로직을 로직의 일부를 관리하는 객체로 분할 가능
// 자바스크립트에 있는 객체들을 사용하는 개념과 결합하여 객체를 사용 가능 => class
// 클래스를 사용하여 객체의 형태, 포함해야 하는 데이터, 클래스를 기반으로 객체를 쉽게 만들 수 있으려면 어떤 메소드가 필요한지 정의할 수 있기 때문에 이를 클래스 내의 인스턴스라 부름
// 객체는 클래스 내의 인스턴스
// 이러한 클래스를 기반으로 하면 동일한 구조, 동일한 클래스를 기반으로 하는 동일한 메소드로 여러 객체를 빠르게 복사 가능
// 클래스는 객체의 형태, 포함해야 할 속성과 메소드를 정의하는데 좋음
// 객체에 저장된 정확한 데이터 세부 정보만 다르고 동일한 구조 유지
// 클래스임을 명확히 하기 위해 첫글자는 대문자
class Department {
    // 생성자 메소드 (예약어)
    // 클래스와 연결되며 객체가 생성되면서 실행되는 클래스에 기반하여 만드는 모든 객체에 연결되는 함수
    // 이를 활용하여 구축하는 객체에 대한 초기화 작업 가능
    constructor(n) {
        this.name = n;
    }
    describe() {
        console.log('Department: ' + this.name); // this는 일반적으로 생성된 클래스의 구체적인 인스턴스를 참조, .표기로 인스턴스의 모든 속성과 메소드에 접근 가능
    }
}
const accounting = new Department('Accounting');
accounting.describe();
// 이 메소드를 실행할 때는 this가 아래 객체를 참조하지 않음
const accountingCopy = { describe: accounting.describe }; // 객체 리터럴로 생성되어 클래스나 정의된 특정 클래스를 기반으로 하지 않고 더미 객체로 생성되어 부서이름 출력 X
accountingCopy.describe(); // Dapartment: undefined
// undefined 해결 (ts class에서만 가능함)
class Department2 {
    constructor(n) {
        this.name = n;
    }
    describe() {
        // this: Department2 로 적으면 객체는 결국 Department 타입이 되어 에러 발생
        console.log('Department: ' + this.name);
    }
}
const accounting2 = new Department2('Accounting');
accounting2.describe();
const accountingCopy2 = { name: 'Dummy', describe: accounting2.describe }; // 에러 해결을 위해 name 프로퍼티 추가
accountingCopy2.describe(); // Dapartment: Dummy
class DepartmentData {
    // private은 상속받게 되면 사용할 수 없지만 protected는 이 클래스를 확장받는 모든 클래스에서 사용이 가능
    // private: 제어자, employees가 클래스(생성된 객체) 내부에서만 접근할 수 있는 속성으로 바꿈
    // public도 있는데 기본값이라 굳이 작성 X
    // readonly 읽기 전용 설정 (변경 불가능)
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // 클래스 필드와 생성자에 선언이 반복되므로 생성자에 다 몰아넣음
        // private id: string;
        // private name: string;
        this.employees = [];
        // this.id = id;
        // this.name = n;
        // 정적이 아닌 곳에서 정적 프로퍼티나 메서드를 사용하려면 클래스 이름으로 접근 (this X)
        console.log(DepartmentData.fiscalYear);
    }
    // 정적 메서드
    static createEmployee(name) {
        return { name: name };
    }
    // abstract는 추상 클래스에서만 사용 가능하기 때문에 abstract가 있는 메소드가 하나 이상이라면 클래스 앞에도 abstract를 추가해야 함
    addEmployees(employees) {
        this.employees.push(employees);
    }
    printEmplyeesInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
DepartmentData.fiscalYear = 2020;
// 상속 (위 코드 속성을 사용함과 동시에 다른 속성도 추가하기)
class ITDepartment extends DepartmentData {
    constructor(id, admins) {
        // super : 다른 클래스로부터 상속받는 클래스에 고유 생성자를 추가할 때 상속하는 클래스에 super를 추가하고 이를 함수처럼 실행
        // super는 기본 클래스의 생성자를 호출함
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('IT Department - ID: ' + this.id);
    }
}
class AccountingDepartment extends DepartmentData {
    // 싱글턴 패턴 (생성자 앞에 private 붙임 , 아래에서 new 키워드 사용 불가 , 클래스 내에서만 접근 가능)
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    // 게터: 값을 가지고 올 때 함수나 메소드를 실행하는 속성
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport; // this.lastReport를 반환하여 캡슐화 (공개적 접근 허용)
        } // 게터는 꼭 반환이 있어야함
        throw new Error('No report found.');
    }
    // 세터: 속성 값 설정
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Please pass in a valid value.');
        }
        this.addReport(value);
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }
    describe() {
        console.log('Accounting Department - ID: ' + this.id);
    }
    addEmployees(name) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
// 정적 메서드 : 새 키워드 없이 직접 클래스에서 호출 (클래스를 그룹화 매커니즘으로 사용 가능)
const employee1 = DepartmentData.createEmployee('Max');
console.log(employee1, DepartmentData.fiscalYear);
// const sales = new DepartmentData('id', 'Sales');
const it = new ITDepartment('d1', ['Max']); // 괄호 안에 있는 생성자 호출 가능
it.addEmployees('Max');
it.addEmployees('Manu');
// 위 방법 말고도 아래처럼 사람을 추가할 수도 있지만 방법은 통일하는게 좋음
// sales.employees[2] = 'Anna';
// 클래스 외부에서 값에 접근하는 것은 안좋기 때문에 이 방법은 지양 
it.describe();
it.printEmplyeesInformation();
console.log(it);
// const Accounting = new AccountingDepartment('d2', []);
const Accounting = AccountingDepartment.getInstance();
const Accounting2 = AccountingDepartment.getInstance();
console.log(Accounting, Accounting2);
Accounting.mostRecentReport = '';
Accounting.addReport('Something went wrong...');
console.log(Accounting.mostRecentReport); // 게터를 속성처럼 접근함
Accounting.addEmployees('Max');
Accounting.addEmployees('Manu');
// Accounting.printReports();
// Accounting.printEmplyeesInformation();
Accounting.describe();
// 기본 클래스의 메소드를 무시할 수 있음, 각 클래스의 고유한 구현을 추가하여 기본 클래스안의 구현 대신 추가한 구현을 적용 가능
// 게터, 세터는 로직을 캡슐화하고 속성을 읽거나 설정하려 할 때 실행되어야 하는 추가적인 로직을 추가하는데 유용
// static 정적 프로퍼티나 메서드는 정적이 아닌 부분에서는 접근 불가
// 생성자는 static으로 변경할 수 없음 => 정적 속성에 접근도 X, this는 클래스 기반으로 생성된 인스턴스를 참조하기 때문
// 추상 클래스는 일부 상위 클래스를 기반으로 하는 모든 클래스가 일부 공통 메소드 또는 속성을 공유하도록 함
// OOP 싱글턴 패턴 : 특정 클래스의 인스턴스를 정확히 하나만 갖도록 함
// 정적 메소드나 속성을 사용할 수 없거나 사용하지 않고자 하는 동시에 언제나 클래스 기반으로 정확히 하나의 객체만 가지도록 함
// 클래스 내에서만 접근이 가능, 객체를 더 생성할 수 없는데 접근이 가능한 이유는 클래스 자체에서 정적 메서드를 호출 => 인스턴스화 필요 X
// 함수 타입 인터페이스
let addInter;
addInter = (n1, n2) => {
    return n1 + n2;
};
// Ts에서 interface는 객체의 구조를 말함, 객체의 형태를 설명
// Js에는 없는 키워드
// 클래스와 달리 인터페이스는 청사진으로 이용하지 않고 사용자 정의 타입으로만 사용
// interface도 정의 첫글자는 대문자
// 인터페이스에 선택적 속성을 입력하고(?사용) 클래스에는 선택적이지 않은 속성으로 구현한 다음 로직이 항상 초기화 되도록 해야 함
class Person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        else {
            console.log('Hi');
        }
    }
}
let user1; // 인터페이스를 타입으로 적용
// user1 = {
//     name: 'Max',
//     age: 30,
//     greet(phrase: string){
//         console.log(phrase + ' ' + this.name);
//     }
// };
user1 = new Person('Max');
// user1.name = 'Menu';  Error : 읽기 전용 속성이므로 'name'에 할당할 수 없습니다.
user1.greet('Hi there - I am');
// 인터페이스 구조를 가져야 하는 객체에 대한 타입을 확인하는 타입으로 사용
// type 정의(사용자 정의)와 다른점
// 1. 인터페이스는 객체의 구조를 설명하기 위해서만 사용 => 클래스 사용 시 인터페이스 내용을 이행하고 준수하게끔 함 (인터페이스 구조에 맞춰서 구현해야함)
// 2. 인터페이스는 주로 구체적인 구현이 아닌 서로 다른 클래스 간의 기능을 공유하기 위해 사용
// Generic Type : 다른 타입과 연결되는 종류
// 다른 타입이 어떤 타입인지에 대해서는 상관 없음
// 배열은 그 자체로 타입이지만 배열에 특정 타입의 데이터를 저장할 수 있음 → 정보가 저장되는 것인지에 대한 확인
// const names: Array = [];  error : 'Array<T>' 제네릭 형식에 1 형식 인수가 필요합니다.
// <> 안에 배열 안에 어떤 타입을 저장할 것인지 타입 지정 (어떤 타입이든 다 됨)
const names = [];
// 제네릭 타입을 설정하면 그 타입에 맞는 메소드를 호출할 수 있게 됨
names[0].split(' ');
// promise Type : 자바스크립트 promise 맞음, 비동기 작업의 최종적인 완료/실패 및 해당 결과 반환
// 주요 타입은 promise지만 배열처럼 다른 타입과 함께 작동함
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done');
    }, 2000);
});
// 프로미스는 결국 다른 타입과 함께 작동하여 어떤 타입의 데이터를 반환하는 것
// 제네릭 타입은 추가적인 타입 정보를 얻는데 유용함 
// 두 객체 병합 후 새 객체 반환 함수
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
// console.log(merge({name: 'Max'}, {age: 30}));    문제 없음
const mergeObj = merge({ name: 'Max' }, { age: 30 }); // 굳이 이렇게 형변환? → 제네릭 사용
// mergeObj.name;   접근 X → objA/B의 타입을 객체로 입력하여 객체를 반환하는 것으로 추론
function merge2(objC, objD) {
    // return Object.assign(objC, objD);   error : 'T' 형식의 인수는 '{}' 형식의 매개 변수에 할당될 수 없습니다. => 왜?
}
const mergeObj2 = merge2({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
// <T, U>를 사용함으로써 무작위의 객체 타입을 받는 것이 아닌 다양한 타입의 데이터가 들어올 수 있음을 인지시킴
// 함수 호출시 동적으로 타입을 추론할 수 있음
console.log(mergeObj.age);
// 제네릭 타입 제약조건 사용
// function merge<T extends object, U extends object>(objA: T, objB: U){
//     return Object.assign(objA, objB);   // 왜 자꾸 오류 뜨지? → T extends object 쓰니까 사라짐;
// }
function countAndDescribe(element) {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    }
    else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements.';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe(''));
// 유연한 작업이 요구될 때 제네릭 타입을 사용하면 제약조건 덕분에 정확한 타입에 대해 신경쓰지 않고 작업할 수 있음
// keyof 제약조건
// 객체를 첫번째 인수로 가지고 두번째 매개변수가 결과적으로 키가 되는 함수
function extractAndConvert(obj, key) {
    return 'Value: ' + obj[key]; // 제네릭이 없을때 obj[key] 에러이유 : obj 객체에 키가 있는지 보장할 수 없음을 알림
}
extractAndConvert({ name: 'max' }, 'name');
// 제네릭 클래스
// 제네릭 클래스를 원시 값으로 사용하면 타입 안전성을 확보할 수 있음
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return; // 잘못된 item 제거를 방지
        } // 참조 형식인 값이 제대로 동작하는지 확인하는 로직
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItem() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItem());
const numberStorage = new DataStorage();
function createCourseGoal(title, desciption, date) {
    let courseGoal = {};
    // Partial ? 만든 타입 전체를 모든 속성이 선택적인 타입, CourseGoal를 선택적인 객체 타입으로 바꿈
    // 각 단계 이전에 추가적인 유효성 검사 수행
    courseGoal.title = title;
    courseGoal.desciption = desciption;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const readnames = ['Max', 'Anna'];
// readnames.push('Manu'); → X
// readnames.pop(); → X
// Readonly를 사용하여 속성을 변경하지 못하도록 함
//# sourceMappingURL=bundle.js.map