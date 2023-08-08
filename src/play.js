7// FUNCTIONS
// declaration like
//    function name() { code, }
// expression like
//    const funName = function(p1, p2, ...){code};
// short hand like
//    name (a,b) { code }
// constructor of objects
// arrow style

function  xt_(x='toto',y='itsme'){
const filter = new Object();
filter[x]=y;
return filter;
}
console.log(JSON.stringify(xt_()));

function obj_(x='toto') {
const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
person.age = 50;
person.eyeColor = "blue";

const person2 = new Object();
person2.firstName = "Jack";
person2.lastName = "Bee";
person2.age = 45;
person2.eyeColor = "brown";
person2.nickname= x;

return person2
}
// destructuring an object
const { firstname, age } = obj_();
console.log(age);
// is equivalent to:
console.log( JSON.stringify(obj_()));
console.log(obj_());
