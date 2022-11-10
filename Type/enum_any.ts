// enum (열거형) : 상수들의 집합을 정의하고 싶은 경우 사용
// 값들의 집합을 명명하고 이를 사용
// 역할이 없는 숫자도 추가가 가능하다는 단점 존재
// 선언 후 변경 불가, 속성 값으로 문자열 혹은 숫자만 허용

enum Role { ADMIN, READ_ONLY, AUTHOR };

// 값을 0(기본값)부터 시작하고 싶지 않을 때는 숫자를 할당해줌 
// 필요에 따라 임의의 숫자를 모든 식별자에 고유한 값으로 할당 가능 (텍스트, 혼합 할당 가능)
// enum Role { ADMIN = 5, READ_ONLY, AUTHOR };  5, 6, 7
// enum Role { ADMIN = 5, READ_ONLY = 'READ_ONLY', AUTHOR = 250 }; 

const example = {
    role: Role.ADMIN,
}

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
let Activities: any[];  
Activities = ['Sports', 5];     // 배열이기만 하면 어떤 값이든 저장 가능
// any 타입은 타입스크립트 컴파일러가 작동하지 않음
// 어떤 값이나 종류의 데이터가 어디에 저장될지 알 수 없는 경우, 런타임 검사 수행, 런타임 도중 특정 값에 수행하고자 하는 작업의 범위 좁히기 => any 사용