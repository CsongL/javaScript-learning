//  如何判断一个变量是否是数组
//  1. instanceOf用来判断某一个变量是不是数组的实例对象
let a = [1];


console.log(a instanceof Array);
// 手写instanceOf实现
// instance的本质就是看这个这个构造函数的原型是否在这个实例对象的原型链上
// 如果在的话就返回true, 不在的话就返回false
function instanceOf(obj, constructor) {
    let prototype = constructor.prototype;
    while(true) {
        if(obj === null) {
            return false;
        }
        if(obj === prototype) {
            return true;
        }
        obj = Object.getPrototypeOf(obj);
    }
}

console.log(instanceOf(a, Object));

//2 通过数组实例对象上的constructor属性
// 数组实例对象上的constructor属性对应的就是该实例对象的构造函数，如果这个构造函数就是数组的构造函数，那么这个实例实例对象就是数组

function ifArrayByConstructor(arr) {
    if(arr.constructor === Array) {
        return true;
    } else {
        return false;
    }
}
console.log(ifArrayByConstructor(a));


// 3 通过Object.prototype.toString.call(数组实例对象)判断
function ifArrayBytoString(arr) {
    if(Object.prototype.toString.call(arr) === '[object Array]') {
        return true;
    } else {
        return false;
    }
}

console.log(ifArrayBytoString(a));

// 4 Array.isArray()
console.log(Array.isArray(a));