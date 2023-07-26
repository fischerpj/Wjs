
function obj_() {
const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
person.age = 50;
person.eyeColor = "blue";

const person2 = new Object();
person2.firstName = "Jack";
person2.lastName = "Bee";
person2.age = 45;
person2.eyeColor = "brown";

return person2
}

console.log( JSON.stringify(obj_()));
