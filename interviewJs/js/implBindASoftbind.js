// 实现bind函数
// bind()的本质，返回一个新的函数，这个函数内部的this指针指向是我们所绑定的值
// 所以最终 我们要返回的是一个函数

// 最简单的实现 一行实现
Function.prototype.fakeBind = function(obj, ...rest) {
    return (...args) => this.call(obj, ...rest, ...args);
};

function fakeFoo() {
    console.log(this.a, 'arguments: ' + Array.from(arguments));
}

const fakeFoo1 =fakeFoo.fakeBind({a : 'fake bind'}, 1);
fakeFoo1(2);

// 另一种复杂的实现
Function.prototype.fakeBindComplex = function(obj, ...rest) {
    const self = this;
    return function() {
        let args = [].concat(rest, Array.from(arguments));
        return self.apply(obj, args);
    };
};

const fakeFoo2 = fakeFoo.fakeBindComplex({a : 'fake bind complex'}, 1);
fakeFoo2(2);



function foo() {
    console.log(this.a);
}
// 通过bind()方法创建的新函数，不论调用多少次，内部的this指针总是指向第一次绑定的函数
// 而softbind() 方法创建的函数, 内部的this的指向是这样规定的 
// 如果这个方法是直接在顶级作用域被调用或时, 那么函数内部的this指向的就是调用softbind()方法时所指定的参数
// 如果这个方法是通过其他对象引用,那么这个函数内部的this指针指向的就是该对象
let bind1 = foo.bind({a : 2});
let obj = {
    a : 'obj'
}
// 通过bind生成的函数,内部的this只会指向生成函数时指定的对象
obj.bind1 = bind1;
obj.bind1();
bind1.call({a :4});
bind1.apply({a: 5});

Function.prototype.softBind = function(obj, ...rest) {
    let fn = this; // 这个this指向的是调用这个方法的函数
    const bound = function() {
        const o = !this || (typeof window !== "undefined" && this === window) || (typeof global !=='undefined' && this === global) ? obj : this; // 如果调用这个方法的this没有指定或者是在顶级作用域调用那么this绑定为obj
        return fn.apply(o, [...rest, ...arguments]); 
    }

    bound.prototype = Object.create(fn.prototype);
    return bound;
};

let softBind = foo.softBind({a: 'default this point'});
softBind(); // 因为是在全局调用 所以this指向的是创建这个函数时传递的参数
obj.softBind = softBind;
obj.softBind(); // 此时这个函数内部的this指向的是obj, 而不是创建这个函数时指定的softBInd
