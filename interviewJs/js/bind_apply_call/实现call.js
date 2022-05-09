// 如果不给call函数传递参数，那么call里面的this将默认指向window/ global
Function.prototype.myCall = function(thisArg , ...restArgs) {
    const thisPoint = thisArg || global;
    return this.apply(thisPoint, restArgs);
}

function display(name) {
    console.log('look up what will happen ' + this.name + ' ' + name);
}

let person = {
    name: 'test'
};

display.myCall(person, 'args');


// 不依赖apply实现call
Function.prototype.fakeCall = function(ctx, ...args) {
    let fn = this;
    if(typeof fn !== 'function') throw new Error("must is function");
    let key = Symbol('tempKey');
    ctx[key] = fn;
    let result = ctx[key](...args);
    delete ctx[key];
    return result;
}

display.fakeCall(person, 'args');