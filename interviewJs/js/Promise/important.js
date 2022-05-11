// 对于 Promise 的 resolve(X)函数, 如果 X是一个Promise实例对象，那么在执行之后的then()执行，会多添加两个microTask
// 并且这两个MicroTask是分开执行的
// 第一个微任务是更具PromiseA+的规范 
// 即 如果resolve()函数的参数是一个promise实例对象，那么需要进行一个同步状态的操作
// 代码如下， 其中X表示的就是resolve()函数中作为参数的promise实例对象,
// 其中this指向的就是 我们遇到then()方法时所创建的那个处于pending状态的实例对象
function resolveWithPromise(x) {
    x.then((result) => {
        return this.resolve(result)
    }, (error) => {
        return this.reject(error);
    })
}
// 在这个微任务后，由于v8与PromiseA+规范的差异，所以导致V8引擎又加了一个微任务，用于将 resolveWithPromise => resolveWithThenableObject



// 具体的例子
new Promise((resolve, reject) => {
    console.log(0);
    resolve(Promise.resolve(2))
}).then((result) => {
    console.log(result);
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(3) // 3比2先输出
})

// 微任务队列转态
// [] => [新增的第一个microTask] => [新增的第一个microTask, 1] => 执行第一个新增后, [1, 新增第二个] 
// => 1输出后，[新增第二个，3] => 新增的第二个执行后 [3, 2] => 输出3， [2] => 输出2

// 另外一种 也是导致新增两个的微任务到微任务队列中的
// 如果返回一个Promise实例对象也会导致 进行同步状态 和 变为thenableObj对象的操作
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4); // 这一步也会导致新增两个操作
  })
  .then((res) => {
    console.log(res);
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
  });