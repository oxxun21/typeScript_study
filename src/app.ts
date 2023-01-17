// namespace로 import / export가 가능하지만 파일을 제대로 불러오지 않았을 경우에도 
// 웹이 실행되고 터미널에 에러가 뜨지 않아 위험
// -> es 모듈의 import {} from '~~.js' 로 불러오는 것이 안전
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');