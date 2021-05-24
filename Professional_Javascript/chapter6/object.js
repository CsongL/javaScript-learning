//  two different method to create an instance of object
let person1 = new Object();
person1.name = "Cai";
person1.age = "12";

let person2 = {
    "name": "Chang",
    "age": "1"
}

console.log(person1.name);
console.log(person2.name);

// there is two different mehotd to get the value of property
console.log(person1.name);
console.log(person2["name"]);

// if there is special character in the name of property, we should use the [] to get the vlaue

// person1.first name = "meng"; these is can not work because there is a space 
person2["second name"] = "Song";

console.log(person2["second name"]);