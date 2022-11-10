// 배열은 객체 내부던지 외부던지 완전히 동일함
// 대괄호 쌍 앞에 대괄호 안에 저장되는 데이터 타입을 입력
var example = {
    hobbies: ['Sports', 'Cooking']
};
var Activities; // 문자열들의 배열이다.
Activities = ['Sports'];
var ActivitiesAny; // 여러 타입의 배열이다.
ActivitiesAny = ['Sports', 1];
for (var _i = 0, _a = example.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
}
