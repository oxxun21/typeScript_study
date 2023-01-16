function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// _ : 타입스크립트의 시그널 (명시만 해두는 용도) 
function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function<T extends {new(...args: any[]): {name: string}}>(
    originalConstructor: T
    ) { 
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Renderig template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger("LOGGING - PERSON")   // @은 읽히거나 찾는 식별자 상징
@Logger("LOGGING")
@WithTemplate("<h1>My Person object</h1>", "app")
class Person2 {
  name = "max";

  constructor() {
    console.log("Creating person object");
  }
}

const pers = new Person2();

console.log(pers);

// 데코레이터 factory 정의 : 데코레이터 함수 도출, 어떤 대상에 데코레이터를 할당할 때 설정할 수 있게 함
// 팩토리 함수와 함께 실행하면 데코레이션 함수 값을 커스터마이즈 가능

function Log(target: any, propertyName: string | Symbol){
  console.log("Property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor){
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | symbol, position: number){
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number){
    if(val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number){
    return this._price * (1 + tax);
  }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
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
  message = "This works";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button2 = document.querySelector("button")!;
button2.addEventListener("Click", p.showMessage);

// form 유효성 검사

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required','positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  };
}

function validate(obj: any){
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]){
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
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number){
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", event => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

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