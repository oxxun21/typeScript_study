const person: {
    // 키 : 타입 지정
    name: string;
    age: number;
} = {
    // 키 : 값 지정
    name: 'hi',
    age: 22,
};

const object: {} = {};  // 객체 기본 형태

console.log(person.name);

const product: {
    id: string;
    price: number;
    tags: String[]; // 배열 안의 값이 무슨 타입인지 적어줌
    details: {
        title: string;
        description: string;
    }   // 객체 안에 객체 타입 다시 생성
} = {
    id: 'abc1',
    price: 12.99,
    tags: ['great-offer', 'hot-and-new'],
    details: {
      title: 'Red Carpet',
      description: 'A great carpet - almost brand-new!'
    }
}