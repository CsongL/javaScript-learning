const { ReadPreferenceMode } = require("mongodb");


// 下列输出顺序  0, 1, 2, 3, 4, 5, 6
Promise.resolve()
    .then(() => {
        console.log(0);
        return Promise.resolve(4);
    })
    .then((result) => {
        console.log(result);
    });

Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });

// 原因： 如果是 resolve(Number), 那么就直接将后面then()方法内的代码放入微任务队列中，
// 如果是 resolve(Promise对象)， 那么在调用后面then()方法之前，会先要运行两个微任务，第一个微任务是用来同步状态，第二个微任务是因为V8和promiseA+规范的差异
// 因此 在执行 then()方法内的代码之前，先要运行这两个微任务，所以then()方法内的代码相当于是第三个微任务
// 参考知乎上的一篇文章： https://www.zhihu.com/question/453677175

new Promise((resolve) => {
    let resolvedPromise = Promise.resolve();
    resolve(resolvedPromise);
}).then(() => {
    console.log('Resolved promise');
});

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
    })
    .then(() => {
        console.log('Promise 2');  // Resolved Promise 会在 Promise 2前面出现
    })
    .then(() => {
        console.log('Promise 3');
    })