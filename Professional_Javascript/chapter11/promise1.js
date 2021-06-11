//  期约
function double(value){
    setTimeout(()=>setTimeout(console.log, 0, value *2), 1000);
}

// double(3);

function double2(value, sucess, failure){
    setTimeout(() => {
        try {
            if(typeof value != "number"){
                throw "Must provide number as first argument";
            }
            sucess(value * 2);
        } catch(e){
            failure(e);
        }
    }, 1000);
}

const successCallback = (x) => console.log(`Success: ${x}`);
const failureCallback = (x) => console.log(`Failure: ${x}`);

// double2(3, successCallback, failureCallback);
// double2('x', successCallback, failureCallback);

//  promise 三种状态
//  pending 状态
let p1 = new Promise(()=>{});
setTimeout(console.log, 0, p1);

// fulfilled状态
let p2 = new Promise((resolve, reject)=> resolve());
setTimeout(console.log, 0, p2);

// rejected状态
let p3 = new Promise((reslve, reject) => reject(3));
p3.catch((e) => console.log("zz"+e));
setTimeout(console.log, 0, p3);

// Promise.resolve创建一个已解决的实例化期约，将第一个参数作为这个以解决的实例化期约对象的值
let p2_1 = Promise.resolve("test");
setTimeout(console.log, 0 , p2_1);
// 杜宇的参数会被忽略
setTimeout(console.log, 0, Promise.resolve(1,2,3));
let p2_2 = Promise.resolve(7);

//  如果传入的第一个参数的值是一个期约，那么新创建的实例化期约会保留作为第一个参数的期约的状态
let p2_3 = Promise.resolve(p2_2);
setTimeout(console.log, 0, p2_2 === p2_3);
let p2_4 = Promise.resolve(p3);
setTimeout(console.log, 0, p2_4);

//  Promise.reject与Promise.resolve()类似，只不过这个Promise.reject()创建的是一个拒绝的实例化期约对象
let p3_1 = Promise.reject(4);
p3_1.catch((e) => console.log("handle the rejected promise: " + e));
setTimeout(console.log, 0, p3_1);

//  Promise.prototype.then() 这个方法主要的作用就是，根据期约的状态的转变来执行相应的方法， 
//  就是当期约的转台从depending状态转为fulfilled状态后，会执行then()方法中的第一个函数参数，通常将第一个函数参数叫为OnResolved()
// 当期约函数的状态从depending状态转为rejected状态后，会执行then()方法中的第二个函数参数，通常将第二个函数参数默认叫做OnRejected();
// 这两个参数都是可选的， 如果提供的话，那么会在状态会在pending转态发生改变之后，执行相应的函数，
// 就是相当于，状态改变之后执行不同的操作， 例如我们通过promise向后台请求数据，后台返回的请求的状态码为200~299,
// 那么这个promise的状态就变为了fulfilled，之后就会执行promise.then()方法中的第一个函数参数，从而进行一些数据赋值，数据读取的操作
// 因为状态要么是变为fulfilled状态，要么就是变为rejected()状态，所以这两个函数参数是互斥的，只会执行一个
function OnResolved(value) {
    setTimeout(console.log, 0, value, "Resolved");
}
function OnRejected(value) {
    setTimeout(console.log, 0, value, "Rejected");
}

let p4 = new Promise((resolve, reject) => setTimeout(resolve(), 3000));
let p5 = new Promise((resovle, reject) => setTimeout(reject(), 3000));

p4.then(
    () => OnResolved("p4"),
    () => OnRejected("p4"));
p5.then(
    () => OnResolved("p5"),
    () => OnRejected("p5")
);

// Promise.prototype.then()方法会返回一个新的期约实例对象，这个期约实例对象基于OnResolved处理程序的返回值构建。
//  OnResolved处理程序的返回值会被Promise.resolve()方法包装成一个新的期约实例对象，如果没有提供OnResolved处理程序，那么包装的就是调用这个then()方法的那个已解决的期约对象
// 如果没有显示的返回语句，那么Promise.resolve()会包装默认的返回值undefined
let p6 = Promise.resolve("foo");
let p7 = p6.then();
setTimeout(console.log, 0, p7, "p7");
// 无显示的返回值
let p7_1 = p6.then(()=>undefined, null);
let p7_2 = p6.then(()=>{}, null);
setTimeout(console.log, 0, p7_1, "p7_1");
setTimeout(console.log, 0, p7_2, "p7_2");

// 有显示的返回值
let p7_3 = p6.then(() => "bar");
let p7_4 = p6.then(()=>Promise.resolve("bar"));
setTimeout(console.log, 0, p7_3, "p7_3");
setTimeout(console.log, 0, p7_4, "p7_4");

// 抛出异常会返回拒绝的期约
let p7_5 = p6.then(() => {throw "bar";});
setTimeout(console.log, 0, p7_5, "p7_5");

//OnReject()处理程序与OnResolve()处理程序类似
let p8 = Promise.reject("foo");
let p9 = p8.then(null, ()=>{});
setTimeout(console.log, 0, p8, "p8");

// Promise.ptototype.catch()方法的主要作用就是给期约添加拒绝处理程序 其实就是相当于Promise.prototype.then(null, OnRejected);
// catch()方法也会返回一个新的期约实例，与OnRejected处理程序是一样的

// Promise.prototype.finally()方法 是不论Promise实例的状态变为fulfilled状态还是rejected状态都会执行其中的代码
// 但finally()方法是没有办法知道promise的状态
let p10 = Promise.resolve();
let p11 = Promise.reject();

let OnFinally = function() {
    setTimeout(console.log, 0, "Finally");
}

p10.finally(OnFinally);
p11.finally(OnFinally);

setTimeout(console.log, 0, p10);
setTimeout(console.log, 0, p11);
                                
// finally()方法也会返回一个新的实例期约，只不过在大多数情况下它将表现为父期约的继承
let p22 = Promise.resolve("p22");
let p22_1 = p22.finally();
let p22_2 = p22.finally(()=>{});
let p22_3 = p22.finally(() => Promise.resolve());
let p22_4 = p22.finally(() => "bar");

setTimeout(console.log, 0, p22_1);
setTimeout(console.log, 0, p22_2);
setTimeout(console.log, 0, p22_3);
setTimeout(console.log, 0, p22_4);

// 如果返回的是一个待定的期约，或者是onFinally处理程序抛出了错误，则会返回相应的期约
let p22_5 = p22.finally(()=> new Promise(()=>{}));
let p22_6 = p22.finally(Promise.reject());
let p22_7 = p22.finally(() => {throw "bar";});

setTimeout(console.log, 0, p22_5,"p22_5");
setTimeout(console.log, 0, p22_6,"p22_6");
setTimeout(console.log, 0, p22_7,"p22_7");
