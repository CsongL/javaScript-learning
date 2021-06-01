//  创建一个对象
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayHi = function (){
        console.log(this.name);
    };
}
let person1 = new Person("Cai", 12, "Worker");
let person2 = new Person("Chang", 14, "SoftWare Enginner");
console.log(Person.propotype);
person1.sayHi();
person2.sayHi();
console.log(person1.constructor);
console.log(person1.constructor == Person);
console.log(person2.constructor == Person);
console.log(person1 instanceof Object);
console.log(person1 instanceof Person);
console.log(person2 instanceof Object);
console.log(person2 instanceof Person);
console.log(person1.sayHi == person2.sayHi);

//  只要创建一个函数，js就会默认为这个函数创建一个prototype属性，这个属性对应的值是一个对象，还会默认的为prototype属性所对应的对象创建一个constructor属性，这个属性指向的是与这个构造函数相关联的构造函数
//  使用构造函数创建一个实例对象，js会默认为这个实例对象创建一个[[prototype]]特性指针，这个指针所指向的就是用来构建这个实例对象的构造函数的proto属性对应的对象
//  实例对象的[[propototype]]指针永远指向创建该实例对象时，构造函数的prototype属性所对应的对象（或者说所指向的值），即使之后构造函数的prototype属性对应的对象发生改变，那么这个实例对象的[[prototype]]指针还是指向创建这个对象时构造函数的prototype属性对应的值
//  通过上面的描述，我们也能看出来，一个实例对象的原型对象其实就是构造函数的prototype属性对应的对象,这个对象就被称为实例对象的原型对象
//  因此 我们也就可以知道，实例对象是直接和构造函数的prototype属性对应的对象相关联，而非与构造函数直接相关联
console.log("原型属性")
let Person1 = function() {};
console.log(Person1.prototype);
console.log(typeof Person1.prototype);
console.log(Person1.prototype.constructor);
let person1_1 = new Person1();
console.log(person1_1.__proto__);
console.log(person1_1 !== Person1);
console.log(person1_1 !== Person1.propotype);
console.log(Person1.prototype != Person1);
console.log(person1_1.__proto__ == Person1.prototype);

Person1.prototype.name = "Cai";
Person1.prototype.age = 12;
Person1.prototype.job = "SoftWare Engineer";
let person1_2 = new Person1();
console.log(person1_2.__proto__);

function Person2() {};
let friend = new Person2();
Person2.prototype = {
    constructor: Person2,
    name: "Cai",
    age: 12,
    job: "SofrWare Enginner"
};
console.log(friend.name);

// isPrototypeOf()
console.log(Person1.prototype.isPrototypeOf(person1_1));
console.log(Object.getPrototypeOf(person1_1));
// setPrototypeOf()
let biped = {
    name: "Cai"
};
let person = {
    age: 12
}
Object.setPrototypeOf(person, biped);
console.log(person.name);
console.log(person.age);
console.log(Object.getPrototypeOf(person));
console.log(Object.getPrototypeOf(person) === biped);
//  原型层级
//  当我们调用一个实例对象的属性时，后代默认先在改实例对象本身去查找该属性，如果在实例对象本身没有查找到该属性，那么就去查找原型指针所指向的原型对象中是否有该属性
//  在实例对象本身定义的属性会遮蔽在该实例对象的原型对象中定义的同名的属性，也就是说实例对象和原型对象有一个同名的属性，那么最终返回的是实例对象中的这个属性，这是因为属性查找原则是先查找实例对象中的属性
let person1_3 = new Person1();
console.log(person1_3.name);
person1_3.name = "ZX";
console.log(person1_3.name);
console.log(person1_3.__proto__);
console.log(person1_3);

//  hasOwnProperty()  这个方法用于判断某一属性是否定义对象本省而不是对象的原型对象中，返回的是true/false
// 这个方法用来判断某一属性是在自身定义的还是属于该对象的原型对象
console.log(person1_3.hasOwnProperty("name"));
console.log(person1_3.hasOwnProperty("age"));
//  in 用来判断该对象是否能够调用某一属性，不论这一个属性是实例对象自身定义的，还是说该属性是在实例对象的原型对象中定义的
//  只要这个实例对象能够成功调用这个属性，那么in() 就会返回true;
let person1_4 = new Person1();
console.log(person1_4.name);
console.log("name" in person1_4);
console.log(person1_4.hasOwnProperty("name"));

console.log(person1_3.name);
console.log("name" in person1_3);
console.log(person1_3.hasOwnProperty("name"));

delete person1_3.name;
console.log("name" in person1_3);
console.log(person1_3.hasOwnProperty("name"));

//  通过这个hasOwnProperty() 和 in 方法我们可以判断出这个属性是不是定义在原型对象上
function hasPrototypeProperty(object, property){
    if(!object.hasOwnProperty(property) && (property in object)){
        return true;
    }
    return false;
}

person1_3.name = "rilong";
console.log(hasPrototypeProperty(person1_3, "name"));
console.log(hasPrototypeProperty(person1_3, "age"));

// 实例属性--定义在实例中的属性是实例属性， 原型属性--定义在实力对象的原型对象中的属性是原型属性
// for..in  可以对实例对象中的可迭代的属性进行迭代，不论是实例属性还是原型属性，只要这个属性可以迭代那么就可以在for..in中展示
//  Object.keys()只能返回可迭代的实例属性(即定义在自身的可迭代属性），也就是定义在实例对象中可迭代的属性，而不能返回定义在原型对象中可迭代的属性
// Object.getOwnPropertyNames() 得到所有的实例属性，不能得到原型属性, 但是不能得到实例属性中用符号作为键的属性
// Object.getOwnPropertySymbols() 得到所有实例属性中以符号作为键的属性
// 只要是看到own 就是得到实例属性，

console.log(Object.keys(Person1.prototype));
console.log(Object.keys(person1_3));
person1_3.title = "Manager";
console.log(Object.keys(person1_3));
console.log(Object.values(person1_3));
let k1 = Symbol("k1");
let k2 = Symbol("K2");
person1_3[k1] = "k1";
person1_3[k2] = "k2";
console.log(Object.getOwnPropertyNames(person1_3));
console.log(Object.getOwnPropertySymbols(person1_3));
//  当我们要用一个变量的值作为一个属性的键时，我们就要用中括号将这个变量括起来，，这样的属性也就成为计算属性，要计算一下这个变量的值是什么
// for...in  和 Object.keys()方法属性的输出顺序是不确定的
// 其他方法属性的输出顺序是按照 先输出以数字作为键的属性，并且按照数字的升序输出， 其他以字符串或符号作为键的属性的输出顺序是按照其插入顺序来进行输出的
let o = {
    1: 1,
    [k1] : "k1",
    first: "first",
    0:0
};
o[4] = 4;
o.second = "second";
o[k2] = "k2";
o[2] = 2;
o.third = "third";
console.log(Object.getOwnPropertyNames(o));
console.log(Object.getOwnPropertySymbols(o));
// Object.values() 和 Object.entries()会自动忽律符号属性
console.log(Object.values(o));
console.log(Object.entries(o));

let arr = new Array();
console.log(arr.__proto__ == Array.prototype);
console.log(arr.__proto__);
console.log(Array.prototype.splice);
String.prototype.startsWith = function(str){
    if(this.indexOf(str) ==0){
        return true;
    }
    return false;
};
let newStr = "testhhhhaa";
console.log(newStr.startsWith("test"));
console.log(newStr.startsWith("h"));