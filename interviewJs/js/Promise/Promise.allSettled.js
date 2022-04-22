// Promise.allSettled([promise])方法 就是只有当数组中的所有promise的状态都发生了变化(不论promise是成功还是失败)
// Promise.allSettled()方法才会返回另一个状态为fulfilled的promise实例对象
// Promise.all([]) 要求只有当所有的promise都成功，才会变为fulfilled，只要有一个失败，那就会中断其他promise执行，并且会返回一个rejected状态的promise
// Promise.race([]) 只要有一个promise对象的状态发生改变，那么promise.race所返回的promise实例对象的状态也会随之发生变化，如果那个最快的那个promise失败，则返回一个rejected的promise实例对象
// Promise.any([])  只要有一个promise变为fulfilled状态，那么就会返回一个fulfilled状态的实例对象，只有当所有的promise都失败了，any()所返回的实例对象也就全都失败了


// Promise.allSettled()返回的promise对象的状态只会是fulfilled，
// 返回的结果是一个数组，数组成员是一个对象，对应于每一个promise的运行结果
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 }, 对应的promise成功执行
//    { status: 'rejected', reason: -1 }  对应promise执行失败
// ]

const mySettledPromise = (items) => {
    const onResolved = (value) => ({"value": value, "status": "fulfilled"});
    const onRejected = (reason) => ({reason, "status": "rejected"});
    return Promise.all(
        items.map((item) => Promise.resolve(item).then(onResolved, onRejected))
    );
};

Promise.allSettled([Promise.resolve('123'), Promise.reject('456')]).then((result) => {
  console.log(result);
})