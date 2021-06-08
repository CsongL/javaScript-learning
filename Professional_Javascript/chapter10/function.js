//  声明式定义
function sum(num1, num2){
    return num1 + num2;
}
// 表达式定义
let sum1 = function(num1, num2){
    return num1 + num2;
};

// 箭头函数
let sum2 = (num1, num2) => {
    return num1 + num2;
};

let dog = {
    year: 12,
    get age(){
        return this.year;
    },
    set age(value){
        this.year = value;
    }
};

let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, "age");
console.log(propertyDescriptor);
console.log(propertyDescriptor.get.name);
console.log(propertyDescriptor.set.name);

// arguments的值会和命名参数保持同步
function doAdd(num1, num2){
    arguments[1] = 10;
    return arguments[0] + num2;
}

console.log(doAdd(1,2));

function makeKing(name="Hearny", numerals = "II"){
    return "King" + name + " "+ numerals;
}

console.log(makeKing("Lourse", "IV"));
console.log(makeKing());
console.log(makeKing("Lource"));

// 函数作为默认参数
let romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
let ordinality = 0;

function getNumerals(){
    return romanNumerals[ordinality++];
}

function kingName(name="Henry", numerals = getNumerals()){
    return `King  ${name}  ${numerals}`;
}

console.log(kingName());
console.log(kingName());
console.log(kingName());

function testCallee(){
    console.log(arguments.callee);
}
testCallee();

// 箭头函数内部的this指针指向的是创建箭头函数时的执行上下文对象，而不是调用该箭头函数的实例对象
let o = {
    color: "white"
};

sayColor = () => console.log(this.color);

sayColor();

o.sayColor = sayColor;

o.sayColor();

// 函数的caller属性返回的是调用这个函数的函数
function outer(){
    inner();
}
function inner(){
     console.log(inner.caller);
}

outer();

// new.target 用来判断这个函数是否被new操作符所调用
function King(){
    if(!new.target){
        throw 'King must be instantiated using new';
    }
    console.log("King have been instantiated");
}

new King();
King(); // 报错