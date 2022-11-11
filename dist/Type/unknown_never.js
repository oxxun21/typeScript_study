"use strict";
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
