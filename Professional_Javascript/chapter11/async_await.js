//  异步函数始终返回的是一个期约对象
async function foo() {
    console.log(1);
    return 3;
}

foo().then(console.log);
console.log(2);

async function foo1() {
    console.log(4);
    return Promise.resolve(6);
}

foo1().then(console.log);
console.log(5);


//  异步函数的返回值期待一个实现thenable接口的对象，但常规值也可以。
async function baz(){
    const thenable = {
        then(callback){
            callback('baz');
        }
    };
    return thenable;
}

baz().then(console.log);

//  异步函数中抛出的错误会返回拒绝的期约
async function foo2() {
    console.log("foo2");
    throw "foo2 error";
}

foo2().catch(console.log);

// 对于Promise.reject()所创建的新的拒绝期约对象一定要显示返回
async function foo3() {
    console.log("foo3");
    return Promise.reject("foo3 error");
}

//  await只能用于async 异步函数
//  await用来暂停异步函数后面的代码的执行，转而继续执行其他的同步代码，
//  await会在消息队列中创建相应的任务，当同步代码执行结束后，会调用消息队列中的任务，然后从所暂停的地方继续开始执行
//  await会尝试"解包"对象的值，然后将这个值传递给表达式，再在异步恢复异步函数的执行
async function foo4() {
    let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
    console.log(await p);
}

foo4();

// await 也是期待一个实现thenable接口的对象，但常规的值也可以
// await 会抛出错误的同步操作，会返回拒绝的期约
async function foo5() {
    console.log(1);
    await (() => {throw "foo5 error";})();
}
foo5().catch(console.log);

async function foo6() {
    console.log("foo6 1");
    await Promise.reject("foo6 3");
    console.log("foo6 4");
}

foo6().catch(console.log);
console.log("foo6 2");

async function foo7() {
    console.log("foo7 1");
    await Promise.resolve("foo7 3");
    console.log("foo7 4");
}

foo7().then(console.log);
console.log("foo7 2");

// 停止与恢复执行
async function stop1() {
    console.log(await Promise.resolve("stop1"));
}
async function stop2() {
    console.log(await "stop2");
}
async function stop3() {
    console.log("stop3");
}

stop1();
stop2();
stop3();

//实现sleep
async function sleep(delay){
    return new Promise((resolve, reject) => setTimeout(resolve, delay));
}

async function sleep1(){
    const t = Date.now();
    await sleep(1000);
    console.log(Date.now() - t);
}
sleep1();

// 顺序执行
async function randomDelay(id) {
    const delay = Math.random() * 10000;
    return new Promise((resolve) => setTimeout(() => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}

async function test(){
    const t0 = Date.now();
    await randomDelay(0);
    await randomDelay(1);
    await randomDelay(2);
    await randomDelay(3);
    console.log(`${Date.now() - t0}ms elapsed`);
}
test();



