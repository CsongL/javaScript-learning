// 可以把代理理解为c++的指针，但在本质上代理和c++的指针还是不一样的
//  代理就是可以代理目标对象，可以通过代理对象获取目标对象的属性，可以通过代理对象设置目标对象的属性值
// 那么为什么不直接用目标对象还要用代理呢？  代理对象更快，可以定制一些操作
let target = {
    id: "target"
}

let handler = {};

let proxy = new Proxy(target, handler); // 代理构造函数的两个参数必须全都赋值，否则报错， 第一个参数是目标对象，第二个参数是处理程序对象，定义捕获器的地方

console.log(proxy.id);
console.log(target.id);

proxy.id = "foo";

console.log(proxy.id);
console.log(target.id);

proxy.name = "cai";
console.log(target.name);

console.log(Proxy.prototype);


// 捕获器  代理对象在进行某些基本操作时，捕获器会在这些基本操作传递到目标对象之前先调用捕获器从而拦截和修改相应的行为
// 捕获器 是定义在处理程序对象中的方法

let handler1 = {
    get() {
        return "hhh";
    }
}
let proxy1 = new Proxy(target, handler1);
console.log(proxy1.id);
console.log(target.id);

// 捕获器都可以访问相应的参数， 例如get就有三个参数， 目标对象，要获取的属性，代理对象三个参数
let handle2 = {
    get(target, property, proxy){
        return target[property] + "!!!!";
    }
}

let proxy2 = new Proxy(target, handle2);
console.log(proxy2.id);

// 反射API, Reflect对象是一个全局对象，可以直接通过Reflect来调用其中的方法， 
// 处理程序对象中所有可以捕获的方法都有对应的反射API方法
//  通过反射API中的方法，可以方便的重建和自定义捕获器方法

let handler3 = {
    get(){
        return Reflect.get(...arguments);
    }
}

let proxy3 = new Proxy(target, handler3);
console.log(proxy3.id);

let proxy4 = new Proxy(target, Reflect);
console.log(proxy4.id);

console.log(target);

//  通过捕获器 + Reflect方法来对返回的结果来进行修饰
let handler5 = {
    get(target, property, proxy){
        let description = "";
        if (property == "name"){
            description = "meng";
        }
        return Reflect.get(...arguments) + description;
    }
}

let proxy5 = new Proxy(target, handler5);

console.log(proxy5.id);
console.log(target.id);

console.log(proxy5.name);
console.log(target.name);

//捕获器必须遵守捕获器不变式， 捕获器不变式用来防止出现过于反常的行为，例如这个属性是一个不可写的数据属性，但还是要修改其值，那么就会出错
let target2 = {};
Object.defineProperty(target2, "foo", {
    configurable: false,
    writable: false,
    value: "zoo"
});

let handler6 = {
    get(){
        return "quz";
    }
}

let proxy6 = new Proxy(target2, handler6);
// console.log(proxy6.foo);  这个会报错，因为目标对象的foo属性是不可更改的，而proxy的get捕获器返回的值与目标对象属性的值不相同，再加上目标对象属性不可更改，因此返回一个错误

// 代理对象与目标对象之间的关系是可以撤销的, 但是要通过Proxy.revocable()方法来定义代理对象和撤销方法
let target3={
    id: 11,
    name: "ss"
};
let handler7 = {
    get() {
        return "Intercepted";
    }
};
let {proxy7, revoke} = Proxy.revocable(target3, handler7);
// console.log(proxy7.id);
console.log(target3.name);

//反射API， 部分反射API中的方法会返回一个布尔值，来表示意图执行的操作，是否执行成功，
let o ={}
if(Reflect.defineProperty(o, "id", {value: "test"})){
    console.log("success");
}else{
    console.log("failer");
}

// 多重代理

let firstHandler = {
    get(){
        console.log("firstHandler");
        return Reflect.get(...arguments);
    }
};
let secondHandler = {
    get() {
        console.log("secondHandler");
        return Reflect.get(...arguments);
    }
}
let firstProxy = new Proxy(target, firstHandler);
let secondProxy = new Proxy(firstProxy, secondHandler);

console.log(secondProxy.id);