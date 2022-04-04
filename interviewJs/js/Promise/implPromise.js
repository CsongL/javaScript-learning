// 最简单的实现
// 将then中的回调函数都先存储到callBack数组中，但调用resolve方法时，一个个调用callBack数组中的函数
// 此时的resolve需要通过setTimeout函数来延迟调用

const { resolve } = require("path");

class FakePromise {
    callBack = [];
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        this.callBack.push(onFulfilled);
        return this; // 实现then返回的是一个promise对象
    }
    _resolve(value) {
        this.callBack.forEach(fn => fn(value));
    }
}

const p = new FakePromise(resolve => {
    setTimeout(() => {
        console.log('inner setTimeout');
        resolve('value');
    });
}).then((value) => {
    console.log('then body', value);
}).then((value) => {
    console.log('then body two', value);
});

//FakePromise的构造函数的函数参数内部必须使用setTimeout()来调用resolve(), 不像真实的resolve()可以不放在setTimeout内也能调用成功
// 解决传给构造函数的函数参数需要在setTimeout()中运行的问题
class FakePromise2 {
    callBack = [];
    state = 'pending';
    value = null;
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        if(this.state === 'pending') {
            this.callBack.push(onFulfilled);
        } else if(this.state === 'fulfilled') {
            onFulfilled(this.value);
        }
        return this;
    }
    _resolve(value) {
        this.state = 'fulfilled';
        this.value = value;
        this.callBack.forEach((fn) => fn(value));
    }
}

const p2 = new FakePromise2(resolve => {
    console.log('FakePromise 2');
}).then((value) => {
    console.log('then 1', value);
}).then((value) => {
    console.log('then 2', value);
})

setTimeout(() => {
    p2._resolve(2);
});
p2.then((value) => {
    console.log('then 3', value);
});



// 但目前then()返回的总是同一个



