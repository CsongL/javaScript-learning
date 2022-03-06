let raceObject = Promise.race([
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('first Promise'), 5000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('second Promise')), 6000);
    })
]);

raceObject.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

// Promise.allSetlled() 会等所有的promise都有执行完成后才会返回，
// 而 Promise.all() 是只要有一个promise对象失败，那就返回，后面的promise就不会被执行
// Promise.allSetlled() 放回的也是一个Promise实例对象，这个对象的状态只能是fulfilled， 
// 这个方法当所有的参数数组中的Promise实例对象状态发生改变后，返回一个状态位fulfilled的Promise实例对象
// fulfilled状态所对应的值 是一个数组，数组中的数据的数据类型 都是一个对象 对象的形式也都相同，都是{status, value}

let settledPromise = Promise.resolve("settled 1");
let settledPromise2 = Promise.reject("settled 2");

let settled = Promise.allSettled([settledPromise, settledPromise2]);
settled.then((result) => {
    console.log(result);
});

// Promise.any() 该方法的参数是一个数组，该数组中的数据的数据类型都是Promise实例对象
// Promise.any() 参数数组中 有一个promise实例对象变为fulfilled状态，那么Promise.any()所返回的实例对象的状态就是fulfilled
// 只有当promise.any() 参数数组中所有的promise实例对象的状态变为rejected，那么Promise.any()方法所返回的promise实例对象的状态才变为rejected
/* 
let anyResolve = Promise.resolve('fist any fulfilled');
let anyReject2 = Promise.reject('Second any fulfilled');
let anyReject = Promise.reject('first any rejected');
console.log(Promise.prototype)

let anyResult = Promise.any([anyResolve, anyReject2, anyReject]);
anyResult.then((result) => {
    console.log(result);
});

let anyReason = Promise.any([anyReject, anyReject2]);
anyReason.catch((error) => console.log(error)); */

// Promise.resolve() 将对象转为一个Promise类型的实例对象， 这个实例对象的状态位fulfilled状态
let resolve1 = Promise.resolve('foo');
// => 相当于
let resolve2 = new Promise((resolve, reject) => {
    resolve('foo');
});
// Promie.resolve() 参数的类型
// 第一种 参数是一个Promise实例对象，那么Promise.resolve() 将不做任何修改 直接返回这个promise实例对象
let rejected1 = new Promise((resolve, reject) => {
    reject('foo');
});
Promise.resolve(rejected1).then((result) => {
    console.log('fulfilled', result);
}).catch((error) => {
    console.log('rejected', error);
});

// 参数第二种类型是一个thenable对象
// thenable对象指的是 这个对象定义了then()这个方法
// 如果参数是一个thenable对象，那么Promise.resolve()会直接运行这个对象的then方法，根据then方法的结果来决定所生成的Promise实例对象的状态
let thenable1 = {
    then: (resolve, reject) =>{
        resolve(42);
    }
};

let thenable2 = {
    then: (resolve, reject) =>{
        reject('Error');
    }
};

Promise.resolve(thenable1).then((result) => {
    console.log('thenable1', result);
}).catch((reason) => {
    console.log('thenable1', reason);
});
Promise.resolve(thenable2).then((result) => {
    console.log('thenable2', result);
}).catch((error) => {
    console.log('thanable2', error);
});

// 参数是不具有thenable方法的对象，或者说根本不是对象
// 例如基本数据类型，如果参数是基本数据类型，那么Promise.resolve() 所生成的Promise实例对象的状态直接就是fulfilled，所输出的值就是基本数据类型
// 并且这个因为对象没有then方法，所以不需要异步执行, 也就是说所返回的promise实例对象就直接执行了，而不会放入微任务队列中
Promise.resolve('basic data style').then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});

// 第四种 没有任何参数， 就直接返回一个resolve状态的Promise实例对象

// Promise.reject() 与Promise.resolve()类似 ，只不过返回的Promise实例对象的状态是 rejected


