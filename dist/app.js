"use strict";
// optional chaining (옵셔널 체이닝) :
const fetchedUserDate = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }
};
console.log(fetchedUserDate.job && fetchedUserDate.job.title);
