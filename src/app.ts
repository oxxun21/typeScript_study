/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
// namespace 내에서 import 가능

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}