// 非重入期约方法
//  期约方法后相邻的同步代码，会先于期约的处理程序先执行，
// 这是因为期约的处理程序是异步执行的，会先把处理程序放到消息队列中，然后等到该处理程序执行时，才会执行这个处理程序
let p = new Promise((resolve, reject) => resolve("p"));

p.then((x) => console.log(x));
console.log("p blow code");
console.log("p blow code");
console.log("p blow code");
console.log("p blow code");

// 即使期约的状态变化在期约添加处理程序之后，处理程序也得等到消息队列让它出列才会执行
let synResolve;

let p1 = new Promise((resolve) =>{
    synResolve = function(){
        console.log("1: invoking resolve()");
        resolve();
        console.log("2: resolve() returns");
    };
});

p1.then(()=> {
    console.log("4: then() handler executes");
});
console.log(p1);
synResolve();
console.log("3: synResolve() returns");

// 邻近处理程序的执行顺序， 邻近处理程序的执行顺序取决于添加这些处理程序的顺序
//  哪一个处理程序先被添加，哪一个处理程序就先执行
let p2 = new Promise((resovle, reject) => resovle());
let p2_1 = new Promise((resolve, reject) => reject());

p2.then(()=>setTimeout(console.log, 0, 1));
p2.then(() => setTimeout(console.log, 0, 2));

p2_1.then(null, ()=> setTimeout(console.log, 0, 3));
p2_1.then(null, ()=> setTimeout(console.log, 0, 4));

p2_1.catch(() => setTimeout(console.log, 0, 5));
p2_1.catch(() => setTimeout(console.log, 0, 6));

p2.finally(() => setTimeout(console.log, 0, 7));
p2_1.finally(() => setTimeout(console.log, 0, 8));

// 传递解决值和拒绝理由
// 通过Promise.resovlve() 和 Proimse.reject()分别来传递解决值和拒绝理由， 
// OnResolve()处理程序会接收到相应的解决值， OnReject()会收到相应的拒绝理由
let p3 = Promise.resolve("P3 resolve()");
let p3_1 = Promise.reject("p3_1 reject()");
p3.then((x)=> console.log(x));
p3_1.then(null, (x) => console.log(x));

//  拒绝期约与拒绝错误处理
//  在执行函数或处理程序中抛出错误会导致拒绝，对应的错误对象即为拒绝理由
//  OnRejected处理程序的任务应该是在捕获异常错误之后返回一个解决的期约
let p4 = new Promise((resolve, reject) => reject(Error("foo")));
let p4_1 = new Promise((resolve, reject) =>{throw Error('foo')});
let p4_2 = new Promise((resolve, reject) => resolve());

p4.catch((x)=> console.log("p4 error"));
p4_1.catch((x) => console.log("p4_1 error"));
p4_2.then(() => {throw Error('p4_2 Error')}).catch((x)=>console.log("p4_2 error"));
// 可以使用try/catch语句在执行函数中捕获错误
let p4_3 = new Promise((resolve, reject) => {
    try{
        throw Error("p4_3");
    }catch(e){
        console.log("p4_3");
    }
    resolve();
});
setTimeout(console.log, 0, p4_3);

// 期约连锁与期约组合
// 将一个一个期约拼合起来执行，就时期约连锁
// 将一个个期约组合起来执行，就时期约组合
let p5 = new Promise((resolve, reject) => {
    console.log("first");
    resolve();
});
p5.then(()=> console.log("second")).then(() => console.log("third")).then(console.log("fourth"));

function delayedResolve(str){
    return new Promise((resolve, reject) => {
        console.log(str);
        setTimeout(resolve(), 1000);
    });
}

delayedResolve('first executor').then(() => delayedResolve('second executor')).then(() => delayedResolve('third executor'));

let p5_2 = new Promise((resolve, reject) => {
    console.log("initial promise rejects");
    reject();
});

p5_2.catch(()=> console.log("reject handler")).then(() => console.log("resolve handler")).finally(()=> console.log("finally handler"));

//  Pormise.all() 和 Promise.race() 是Promise组合
//  这两个方法必须接受一个可迭代对象作为参数，否则会报错
//  Promise.all() 是所有的Promise的状态都变为解决状态才会返回一个新的期约，这个新的期约的解决值是一个数组，这个数组包含了所有期约的解决值
//  Promise.all() 中有一个Promise的状态变为拒绝状态，那么Promise.all()就会返回一个新的拒绝期约，是promise.all()中的那个拒绝期约的镜像，但Promise.all()中的后面的期约仍然会完成执行
//  Promise.race() 与 Promise.all()不同， Promise.race() 的期约中，有一个期约的状态发生变化，那就返回一个新的期约，这个新的promise的就是集合中那个最先解决或最先拒绝的期约的镜像，之后的期约仍然会继续执行
let p6 = Promise.all([
    Promise.resolve(4),
    Promise.resolve(3)
]);
p6.then((x) => console.log(x));

let p6_1 = Promise.all([
    Promise.resolve(5),
    Promise.reject(7),
    Promise.resolve(6)
]);

p6_1.catch((x) => console.log(x));

let p6_2 = Promise.all([
    Promise.reject(8),
    new Promise((resolve, reject)=>{
        setTimeout(console.log, 0, "test");
        resolve();
    })
])
p6_2.catch((x) => console.log(x));

let p6_3 = Promise.race([
    Promise.reject(9),
    Promise.reject(6),
    new Promise((resolve, reject) => {console.log("p6_3")}),
]);

p6_3.catch((x) => console.log(x));

function addTwo(x) { return x + 2;}
function addThree(x) { return x + 3;}

function compose(...fns){
    return (x) => fns.reduce((promise, fn)=> promise.then(fn), Promise.resolve(x));
}
let p6_4 = compose(addTwo, addThree);
p6_4(8).then((x) => console.log(x));
