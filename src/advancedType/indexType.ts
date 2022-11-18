// index Type : 객체가 지닐 수 있는 속성에 대해 보다 유연한 객체를 생성하게 해줌

// ex. 사용자 입력 유효성 검사 시 필드에 따른 에러 메시지를 저장해서 보여주고 싶다면 적합한 에러 메시지를 에러 컨테이너에 추가해야 함
interface ErrorContainer {
    // { email: 'Not a vaild email' , username: 'Must start with a character' }
    // 위 객체의 경우 email과 username 에러일 경우에만 사용 가능, 한 가지의 에러만 유효할 때 문제
    // for-in 루프를 사용하여 반복하여 모든 에러를 읽고 에러를 실제로 저장하지 않는 속성은 입력 X
    // 값 타입에 대해 명확한 객체 필요 => 인덱스 타입 사용

    // id: string;  사전 정의된 속성을 추가할 수 있는데 prop 부분과 같은 타입인 경우에만 가능

    [prop: string]: string;     // prop 부분에는 불리언 사용 X
    // 정확한 속성 이름/개수는 모르지만 문자열로 해석 가능한 속성 이름을 지녀야하고 해당 속성 값 역시 문자열이여야 함
}

const errorBag: ErrorContainer = {
    email: 'Not a vaild email',
    username: 'Must start with a character',
};