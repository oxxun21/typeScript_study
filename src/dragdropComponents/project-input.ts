// export 시 default를 해두면 중괄호 없이 Component로만 작성 가능 (불러올 때 이름 변경도 가능)
import { Component } from "./base-component.js";
// import * as Validation from ""; 으로 사용 가능(모든 것을 import), Validation.Validatable 처럼 점 표기법으로 접근
import { Validatable, validate } from "../dragdropUtil/validation.js";
// import { autobind as Autobind } from ""; 하면 autobind 대신 Autobind로 사용 가능
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../dragdropState/project-state.js";

// ProjectInput class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor(){
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 2,
    };
    const peopleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      min: 1,
      max: 2,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs(){
    this.titleInputElement.value = '';
    this.descriptInputElement.value = '';
    this.peopleInputElement.value = '';
  }

    @autobind
    private submitHandler(event: Event){
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }  
  }
