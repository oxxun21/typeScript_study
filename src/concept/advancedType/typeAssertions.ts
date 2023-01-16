// 형 변환(type assertions) : 타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려줌

// const paragraph = document.querySelector('p'); HTMLParagraphElement, html 요소에 id 추가 시 ts는 p 태그를 읽지 못함
const paragraph = document.getElementById('message-output');    // HTMLElement, 어떤 특정 html 요소인지는 모름

// const userInputElement = document.getElementById('user-input')!;
// userInputElement.value = 'hi there!';   html 요소인 것만 추론하기 때문에 value 속성이 있는지는 모름
// 그렇기 때문에 !로 null이 아님을 알려주기보단 input 요소인 걸 알려야 함 => 형 변환으로 구현

// 방법 1 : 변환하고자 하는 요소 앞이나 타입스크립트에 타입을 알려주고자 하는 위치 앞에 태그 추가
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;  // html의 input요소임을 알림

// 방법 2 : 선택한 부분 다음에 as 키워드를 입력한 후 이를 어떤 타입으로 변환할 것인지 입력
const userInputElement2 = document.getElementById('user-input')! as HTMLInputElement;

// document.getElementById('user-input')! => null을 반환하지 않을 것을 확신하면 느낌표를 사용하지만 확실치 않다면 if문 사용
const userInputElement3 = document.getElementById('user-input') as HTMLInputElement;

if (userInputElement3) {
    // ()로 감싸 표현식을 먼저 평가되도록 한 다음 표현식 결과 값에 접근
    (userInputElement3 as HTMLInputElement).value = 'hi there...';
}

userInputElement.value = 'hi there!';