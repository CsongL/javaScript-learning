//我们应该把类当成一种特殊的函数，如我们上一节所学，js会为所有的函数创建一个prototype属性，这个属性对应的对象就被称为原型对象，并且还会在原型对象中定一个属性，这个属性为constructor，这个属性对应的值为与其相关联的构造函数，也就是这个了类的构造函数。
// 类是ES6中新增的概念，其背后使用的仍然是原型和构造函数的概念
//  类的两种声明方式
//  类声明 和类表达式  类命名要求和构造函数一样，首字母要大写
class Person{};
const Animal = class {};

//类表达式在它们被求值之前不能被引用
//  函数声明可以提升，但是类定义不行
// 提升只是将其声明提升，而并不是也将其赋值提升， 赋值操作还是在原来的位置进行，只不过变量的声明放在了最开始
console.log(FunctionExpression);
var FunctionExpression = function(){};
console.log(FunctionExpression);

console.log(FucntionDecleration);
function FucntionDecleration() {};
console.log(FucntionDecleration);

console.log(ClassExpression);
var ClassExpression = class {};
console.log(ClassExpression);

//  console.log(ClassDecleration);
class ClassDecleration{}; //  函数声明可以提升，但是类声明不能提示 因此如果在类声明之前调用这个类，那么会报错
console.log(ClassDecleration);
//  函数受函数作用域限制， 类受块作用域限制
{
    function FunctionDecleration1 (){};
    class ClassDecleration1{};
}
console.log(FunctionDecleration1);
// console.log(ClassDecleration1);//报错 找不到ClassDecleration1 类的作用域默认为块级作用域，而函数的作用域默认为函数作用域即全局作用域，声明一个函数，它则会被提升，当做全局函数 

// 类中的普通方法都是定义在类的prototype属性对应的对象中
// 类中static方法时直接定义在类本身的，
//  因此普通方法智能通过类的prototype属性来调用， 而static方法可以通过类名直接调用
//类中定义的都是方法，而不要定义属性，不能在类块中给类的prototype属性对应的对象添加原始值或对象作为成员数据
// 但是可以在类中的constructor()函数中给类的实例对象定义相应的属性
class Bar {
    constructor() {
        this.name = "cai";
        console.log("this is constructor");
    }
    myBar() {
        return "myBar";
    }
    static myZoo() {
        return "myZoo";
    }
}
Bar.constructor.prototype.name = "test";
let bar = new Bar();
console.log(bar.name);
console.log(bar.__proto__);
console.log(Bar.prototype.myBar());
console.log(Bar.myZoo());

// 类就是一个特殊的函数，函数就有prototyep属性，该属性对应的对象中就会有constructor属性，constructor属性对应的值就是这个类本身。
console.log(Bar.prototype.constructor);

// 报错，不能再类块中定义属性和方法
// class Bar{
//     test: "test",
// }
// let bar = new Bar();
// console.log(bar.test);


// 类的构造函数，类的构造函数定义在类块中，当使用new操作符创建类的一个实例对象时，会调用类的构造函数，构造函数不是必须的，如果不构造则相当于类的构造函数为空
//  使用new操作符 构建一个实例对象的过程：
// 1 在内存中为新对象开辟一个空间 因此每一个新的实例对象在内存中都有一片自己的空间
// 2 将新的实例对象的[[prototype]]特性指针指向类的构造函数的prototype属性对应的对象
//  3 将实例对象赋值给构造函数中的this指针
//  4 执行构造函数内的代码，给实例对象添加属性
// 5 如果构造函数有返回的对象，则该对象就作为新的实例独享，如果没有，则this独享就默认为返回的对象

class Person1{
    constructor(name){
        this.name = name;
    }
}
let person1_1 = new Person1("Cai");
console.log(person1_1.name);

class Person2{
    constructor(override){
        this.foo="foo";
        if(override){
            return {
                bar:"bar"
            }
        }
    }
}
let person2_1 = new Person2();
let person2_2 = new Person2(true);
console.log(person2_1)
console.log(person2_1 instanceof Person2);

console.log(person2_2);
console.log(person2_2 instanceof Person2);


// 为了实现不同实例中对类的方法的共享，所以将类中定义的普通方法，定义到类的prototypr属性对应的对象上
class Person3{
    constructor(){
        this.locate = () => console.log("instance");
    }
    locate() {
        console.log("prototype");
    }
}
let person3_1 = new Person3();
person3_1.locate();
Person3.prototype.locate();

// 不支持直接在类的原型或类上添加成员数据，但在类的外部可以添加
class Person4 {
    sayName() {
        console.log(`${Person4.greeting}: ${this.name}`);
    }
}
Person4.greeting = "My name is";
console.log(Person4.greeting);
Person4.prototype.name = "Cai";
let person4_1 = new Person4();
person4_1.sayName();

// 迭代器 与生成器方法
class Person5 {
    constructor(){
        this.nickName = ["Jack", "Cai"];
    }
    *createNicknameIterator(){
        yield 'jack';
        yield 'Jake';
        yield 'J-Dog';
    }
    static *createJobIterator() {
        yield 'Butcher';
        yield 'worker';
    }
    *[Symbol.iterator](){
        yield *this.nickName.entries();
    }
}
let jobIterator = Person5.createJobIterator();
console.log(jobIterator.next().value);
console.log(jobIterator.next().value);

let person5_1 = new Person5();
let createNicknameIterator = person5_1.createNicknameIterator();
console.log(createNicknameIterator.next().value);
console.log(createNicknameIterator.next().value);
console.log(createNicknameIterator.next().value);

for(let [index, name] of person5_1){
    console.log(name);
}

// 继承
// 派生类会根据原型链访问到类和原型上定义的方法 this会反应调用相应方法的实例对象
class Vehicle{
    constructor() {
        this.name = "Vehicle";
    }
    identifyPortotype(id){
        console.log(id, this);
    }
}

class Bus extends Vehicle{
    static identifyClass(id){
        console.log(id, this);
    }
}
let v= new Vehicle();
let b = new Bus();
v.identifyPortotype(1234);
b.identifyPortotype(1234);
Bus.identifyClass(1224);
console.log(Vehicle.prototype);
console.log(Vehicle.constructor.prototype);
console.log(Bus.prototype);
// 类就相当于一种特殊的函数， 所以类继承的机制和本质 和函数继承的本质是一样的 而且当使用new 操作符时，类就相当于构造函数，因此构造函数的继承机制也适用于类的继承机制
// 因此类的继承机制 就是 派生类的prototype属性的值对应的是基本的实例对象，基类的实例对象的[[prototype]]指针指向的是基类的prototype属性对应的对象，从而实现派生类和基类方法的共享

//super 只能派生类中使用，而且仅限于派生类的构造函数，实例方法，静态函数， 
// 在类的构造函数中使用可以调用父类的构造函数 super会调用父类构造函数，并将返回的实例复制给this， 如果没有定义构造函数，那么在实例化对象时会调用super来调用构造函数，在类的构造函数中，不能再调用super之前引用this
// 如果派生类中显示定义了构造函数，要么必须在构造函数中调用super, 要么这个构造函数必须返回一个对象
//  在类的静态方法中使用可以调用父类的静态方法
class Vehicle1{
    constructor(liciencePlat){
        this.hasEngine = true;
        this.liciencePlat = liciencePlat;
    }
    static identity(){
        console.log("vehivle");
    }
}

class Bus1 extends Vehicle1{
    constructor(liciencePlat){
        super(liciencePlat);
        console.log(this);
        this.people = 12; // this 会被赋值为父类的实例对象
        console.log(this instanceof Vehicle1);

    }
    static identity(){
        super.identity();
        console.log("bus");
    }
}
let bus1_1 = new Bus1(1234);
console.log(bus1_1.people);
console.log(bus1_1.hasEngine);
Bus1.identity();
// 类继承内置类型
// [Symbol.species] 属性决定了当返回一个新创建的实例对象时，这个实例对象是哪一个类的实例。 意思就是说 如果一个方法会返回一个新的实例对象，那么这个属性来决定这个所返回的实例对象是哪一个类的实例对象
class Subarray extends Array {
    shuffle() {
        for(let i=this.length -1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [this[i], this[j]] = [this[j], this[i]];
        }
    }
    // 该边返回的实例对象所对应的类为Array 而不是SubArray
    static get [Symbol.species](){
        return Array;
    }
}

let array = new Subarray(1,2,3,4,5,6);
console.log(array instanceof Subarray);
console.log(array instanceof Array);
console.log(array);
array.shuffle();
console.log(array);
let array2 = array.filter((x) => !!(x%2));
console.log(array2);
console.log(array2 instanceof Subarray);
console.log(array2 instanceof Array);

//类混入 多类继承
class Vehicle2 {}

let FooMixin = (superClass) => class extends superClass{
    foo() {
        console.log("foo");
    }
}

let ZooMixin = (superClass) => class extends superClass{
    zoo() {
        console.log("zoo");
    }
}

let barMixin = (superClass) => class extends superClass{
    bar() {
        console.log("bar");
    }
}

function mix(BaseClass, ...Mixins){
    return Mixins.reduce((accumulator, current) => current(accumulator), BaseClass);
}

class Bux extends mix(Vehicle2, FooMixin, ZooMixin, barMixin) {}

let bux = new Bux();
bux.foo();
bux.bar();
bux.zoo();



