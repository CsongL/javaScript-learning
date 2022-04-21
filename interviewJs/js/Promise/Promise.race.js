// Promise.race([promise])  promise.race()返回的promise实例对象的状态取决于数组中最快执行的那个promise实例对象状态的变化，
// 如果数组中最先执行完毕的promise的状态为 fulfilled状态，那么这个promise.race()所返回的promise实例对象的状态也就是fulfilled 
// 如果数组中最先执行完毕的promise状态为 rejected, 那么这个promise.race()所返回的promise实例对象的状态也就是rejected
// Promise.race()所返回的promise实例对象的状态取决于 数组中哪一个promise最先发生变化

const fakePromiseRace = (promiseArr) => {
    return new Promise((resolve, reject) => {
        promiseArr.forEach((item) => {
            Promise.resolve(item).then((value) => {
                resolve(value);
            }, (reason) => {
                reject(reason);
            });
        });
    });
};



// Promise.resolve() 如果参数是一个promie对象，那么Promie.resolve()不会改变promise对象的状态、
// 而是将作为参数的promise的状态延续下去，并且将作为参数的promise返回的值也作为返回值使用， 而不是将promise实例对象作为返回值
Promise.resolve(Promise.reject('123')).then((value) => {
    console.log('value' + value);
}, (error) => {
    console.log('error' + error);
}); // => error 123

Promise.resolve(Promise.resolve('123')).then((value)=> {
    console.log('value' + value);
}, (error) => {
    console.log('error' + error);
});


Promise.reject(Promise.resolve('123')).then((value)=> {
    console.log('value' + 123);
}, (reason) => {
    console.log('error');
    // reason 是一个project
    reason.then((value) => {
        console.log(value);
    }, (reason) => {
        console.log(reason);
    });
});

Promise.reject(Promise.reject('123')).then((value)=> {
    console.log('value' + 123);
}, (reason) => {
    console.log('error');
    // reason 是一个project
    reason.then((value) => {
        console.log(value);
    }, (reason) => {
        console.log('reason' + reason);
    });
});

