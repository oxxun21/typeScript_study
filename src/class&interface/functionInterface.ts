// 함수 타입 인터페이스

// type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a:number, b: number): number;  // (매개변수: 타입): 반환 타입
}

let addInter: AddFn;

addInter = (n1: number, n2: number) => {
    return n1 + n2;
};