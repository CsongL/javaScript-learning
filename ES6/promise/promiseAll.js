// promise.all(Iterator) 接受一个可迭代对象作为一个参数，这个可迭代对象的内容都是一个个promise实例对象
// promise.all(Iterator).then((value) => {}) value 是一个数组，是迭代对象中每一个promise实例对象所返回的resolve(结果) 

const { resolve } = require("path");

let p1 = new Promise((resolve, reject) => {
    resolve(1);
});

let p2 = new Promise((resolve, reject) => {
    resolve(2);
});

let pAll = Promise.all([p1, p2]).then((result) => {
    console.log(result);
});

// 如果作为Promise.all 参数的Promise实例对象自身定义了catch()方法，那么这个promise实例对象所抛出的错误会被自身的catch方法捕获，
// 而不会被promise.all方法的catch方法所处理
// 而且 由于这个promise实例对象的error已经被catch()方法所处理，并且这个catch()方法返回的也是一个promise实例对象，所以最终这个promise实例对象的状态是resolved
// eg
// cp1 其实指向的是then()方法所返回的实例对象
let cp1 = new Promise((resolve, reject) => {
    resolve(1);
}).then((value) => {
    return value + 1;
});


// cp2 指向的是catch() 方法返回的promise实例对象
let cp2 = new Promise((resolve, reject) => {
    throw  Error('world');
}).then((value) => {
    console.log(value);
}).catch((e) => e); 


let cpAll = Promise.all([cp1, cp2])
            .then((result) => {
                console.log(result);
            });