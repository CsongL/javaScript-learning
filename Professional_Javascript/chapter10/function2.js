// 函数属性和方法
// 函数对象的apply方法和call方法的主要作用就是通过这两个方法的第一个参数设置其函数对象执行时的this指针的值
// 这两个方法会设置调用函数时，函数体内this指针的值，也就是说将this的指针值设置为我们想要的指向的那个实例对象
function sum(num1, num2){
    return num1 + num2;
}

function callSum(num1, num2){
    return sum.apply(this, arguments);
}

function callSum2(num1, num2){
    return sum.call()
}
console.log(callSum(10,10));



let o ={
    color:"blue"
};
let o1 = {
    color: "white"
}
function sayColor(){
    console.log(this.color);
}
// 分别将函数对象的函数体内的this指针设置为实例对象o 或实例对o1
sayColor.call(o);
sayColor.call(o1);


// 闭包
let object = {
    identity: "This object",
    getIdentity(){
        return function() {
            return this.identity;
        };
    }
};
let obeject2 = {
    identity: "This object2"
}
obeject2.getIdentity = object.getIdentity();
console.log(object.getIdentity()());
console.log(obeject2.getIdentity());


//  构造函数模式
function MyObject(){
    //  私有变量和方法
    let privateVariable = 10;
    function privateFunction(){
        return false;
    }

    //  特权方法
    this.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    };
    this.getPrivateVariable = function() {
        return privateVariable;
    };
}

let myObject = new MyObject();
console.log(myObject.getPrivateVariable());
console.log(myObject.publicMethod());
console.log(myObject.getPrivateVariable());

// 静态私有变量模式(原型模式)  在构造函数的原型对象上定义特权方法来返回构造函数内部的私有变量
function MyObject2() {
    let privateVariable = 10;
    function privateFunction(){
        return false;
    }

    // 在原型属性对应的对象上定义特权方法
    MyObject2.prototype.publicMethod = function(){
        privateVariable ++;
        return privateFunction();
    };
    MyObject2.prototype.getPrivateVariable = function(){
        return privateVariable;
    };
}

let myObject2 = new MyObject2();
console.log(myObject2.getPrivateVariable());
console.log(myObject2.publicMethod());
console.log(myObject2.getPrivateVariable());

//  模块模式(返回一个对象字面量)
let sigleton = function(){
    let arr = new Array([1,2,3]);
    arr.push(4);

    return {
        getArr(){
            return arr;
        },
        addElment(element){
            if(typeof element == "number"){
                arr.push(element);
            }else{
                throw "the type of the element should be a number";
            }
        }
    };
};

let sigletonObject = sigleton();
console.log(sigletonObject.getArr());
sigletonObject.addElment(5);
console.log(sigletonObject.getArr());
sigletonObject 


