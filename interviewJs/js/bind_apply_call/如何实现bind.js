// Function.prototype.bind()  bind(obj)会返回一个新的函数,并且将函数的内部的this绑定为第一个参数
Function.prototype.fakeBindCall = function(obj, ...args) {
    return (...ret) => this.call(obj, ...args, ...ret);
}


Function.prototype.fakeBind = function(o) {
    const self = this, boundBinds = arguments;
    return function() {
        let args = [];
        for(let i =1; i < boundBinds.length; i++) {
            args.push(boundBinds[i]);
        }
        for(let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return self.apply(o, args);
    };
};

