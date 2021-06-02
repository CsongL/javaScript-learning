//  首先我们要明白 继承的含义， 一个对象继承另一个对象就是指这个对象可以调用所继承的对象的属性和方法
//  js的继承也是通过原型链来实现的， 通过原型链可以访问另一个实例对象的属性和方法从而实现继承的特性

// 原型链实现继承
function SuperType(){
    this.property = true;
}
SuperType.prototype.getProperty = function() {
    return this.property;
}

function SubType() {
    this.subProperty = false;
}

SubType.prototype = new SuperType();
SubType.prototype.getSubProperty = function() {
    return this.subProperty;
}
let subType = new SubType();
console.log(subType.property);
console.log(subType.getProperty());
//覆盖原方法
SubType.prototype.getProperty = function() {
    return false;
}
console.log(subType.getProperty());

// 原型与继承的关系
//  instanceof 只要这个实例对象的原型链中出现了这原型 那么这个instanceof结果就会返回true
console.log("InstanceOf");
console.log(subType instanceof SubType);
console.log(subType instanceof SuperType);
console.log(subType instanceof Object);
//  isPrototypeOf() 方法是判断对象的prototype属性所对应的对象是否在subType的原型链中，如果存在则返回true，不存在则返回false;
console.log("isPrototyeOf");
console.log(SubType.prototype.isPrototypeOf(subType));
console.log(SuperType.prototype.isPrototypeOf(subType));
console.log(Object.prototype.isPrototypeOf(subType));


// 原型链问题
// 如果在原型链中的对象中的某一个属性时引用属性，那么创建的所有实例都会共享这一个引用属性，所有的实例对象读取，修改的都是同一引用对象，这有事会造成问题
function SuperType1() {
    this.colors = ["red", "blur", "green"];
}

SuperType1.prototype.getColors = function() {
    return this.colors;
}

function SubType1() {
    this.name = "cai";
}
SubType1.prototype = new SuperType1();

let instance1_1 = new SubType1();
console.log(instance1_1.colors);
console.log(instance1_1.colors.push("black"));
let instance1_2 = new SubType1();
console.log(instance1_2.colors);

// 为了解决上述不同实例对象之间会共享原型链中对象的引用属性，提出了集中解决方式
// 盗用构造函数， 在子类的构造函数中通过call()/ apply()方法来调用父类的构造函数，从而将父类的属性定义在子类的实例对象自身身上，就像属性合并一样。还能解决向父类传递参数的问题
// 盗用构造函数只能解决属性的问题，而且因为必须要在构造函数中根据不同的需求定义不同的方法，因此不能重用该构造函数
// 组合继承  利用盗用构造函数来继承属性， 利用之前将子类的构造函数的prototype属性对应的对象变为父类的实例对象的方法来继承方法这就是组合继承
// 原型式继承 和 寄生式继承 很像 都是在内存在重新开辟一个空间，将某一个父类的实例对象进行复制，形成一个新的对象，再将子类的prototype属性的值变为这个新的对象，
// 并对这个新的对象进行一定的修改，从而成为满足我们要求的子类的prototype属性对应的对象，从而通过这个子类来创建新的实例对象
// 组合继承存在一个问题就是， 父类的构造函数会被调用2次，效率较低， 在创建子类实例对象时，在构造函数里面调用一次， 在设置子类的prototype属性的值时调用一次，因此效率较低，而且会包含重复的属性
// 而寄生式组合继承的效率比组合继承要高， 寄生继承 继承的是 父类的prototype属性对应的对象， 
// 就是将父类的prototype属性对应的对象进行复制，然后将复制后所产生的新的对象赋值给子类的构造函数的prototype属性,这就是子类继承父类
//在通过盗用构造函数的方法将父类中的属性定义在子类的实例对象自身身上，从而解决了多个实例对象共享同一个引用变量的问题。
// 寄生式组合继承是引用类型继承的最佳模式

// 盗用构造函数
function SuperType2(name){
    this.name = name;
    this.color = ["red","blue"];
}

function SubType2(name){
    SuperType2.call(this, name);
    this.age = 29;
}
let subType2_1 = new SubType2("vai");
console.log(subType2_1.name);
console.log(subType2_1.color);
subType2_1.color.push("black");
console.log(subType2_1.color);

let subType2_2 = new SubType2("c");
console.log(subType2_2.color);


//寄生式继承
function createAnother(o){
    let another = Object(o);
    another.sayHi = function(){
        console.log("hi");
    }
    return another;
}

let person = {
    name: "cai",
    age: 12
}
let another = createAnother(person);
console.log(another.name);
console.log(another.age);
another.sayHi();

// 寄生式组合继承
function inheritPrototype(superType, subType){
    let superTypePrototype = Object(superType.prototype);
    superTypePrototype.constructor = subType;
    subType.prototype = superTypePrototype;
}
function SuperType3(name){
    this.name = name;
    this.colors = ["red"];
}
SuperType3.prototype.sayName = function(){
    console.log(this.name);
}

function SubType3(name,age) {
    SuperType3.call(this, name);
    this.age = age;
}

inheritPrototype(SuperType3, SubType3);

SubType3.prototype.sayAge = function() {
    console.log(this.age);
}

let subType3_1 = new SubType3("vai", 12);
subType3_1.sayName();
subType3_1.sayAge();
console.log(subType3_1.colors);

