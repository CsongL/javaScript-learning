// async(异步)函数基本的知识点
// 异步函数是Generator函数的语法糖，也是表名一个函数内部的操作时异步执行的，函数的执行权会在执行的过程中发生变化
// 异步函数 用 async 代替了 Generator函数的 *, 用await 代替了 yield
// 异步函数对Generator函数的改进
// async函数会自动执行，而不像Generator函数需要通过返回的迭代器对象的next()方法来执行
// async函数返回的是一个promise对象，可以通过返回的promise对象的then()方法来进行后续的操作，而Generator函数返回的一个迭代器对象
// await表达式 可以是一个promise对象，也可以是一个基本的数据类型
// async 函数 执行到await表达式后，会退出async异步函数的执行，当await后面的异步操作完成之后，在继续从上次暂停的地方继续执行async函数
// en
function timeOut(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}
async function asyncPrint(value, time) {
    await timeOut(time);
    console.log(value + "time: "+ time + "ms");
}

asyncPrint('hello', 50);

// 牢记一点 async函数返回的是一个promise实例对象， 
// async函数语句返回的值就是返回的promise对象then方法所要处理的值
// async函数内部抛出的错误 会导致async函数返回的promise状态变为rejected, 并且会被async函数所返回的promise实例对象的catch()方法所捕获
async function returnFunction(){
    return 'hello world';
}

returnFunction().then((value) => console.log('returnAsyncFunction: ' + value));

// async函数所返回的promise实例对象状态的变化
// 如果async函数内部没有return值，或者抛出错误 
// 那么async函数所返回的promise实例对象的状态必须等到async函数内部所有的await后面的异步操作都完成后，
// async函数所返回的promise实例对象的状态才会发生变化

// await 后面跟的是一个promise实例对象时需要注意的点
// await 后面的promise实例对象如果抛出一个错误会被async函数所返回的promise实例对象的catch()方法捕获
// await 后面的promise实例对象的状态如果是rejected，那么这个async函数就会被中断运行

async function errorFunction() {
    await Promise.reject('error');
}

errorFunction().catch((e) => {
    console.log('errorFucntion ' + e);
});

async function interFunction() {
    await Promise.reject('error');
    await new Promise((resolve, reject) => {
        console.log('this function will not run');
        resolve('value');
    });
}

interFunction().then((value) => {
    console.log('interFucntion' + value);
}).catch((e) => {
    console.log('interFucntion error: ' + e);
});

// async函数是Generator函数的语法糖 其实就是 Generator函数加上自动执行器
// 自动执行器 因为async函数最终返回的是一个promise对象
function autoExecutor(generatorFun) {
    return new Promise((resolve, reject) => {
        let gen = generatorFun();
        function step(genFun) {
            let next;
            try {
                next = genFun();
            } catch(e) {
                return reject(e);
            }
            if(next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then((v) => {
                step(function() {return gen.next(v); });
            }, (e) => {
                step(function() {return gen.throw(e);});
            });
        }
        step(function() { gen.next(undefined);});
    });
}