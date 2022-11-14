"use strict";
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
