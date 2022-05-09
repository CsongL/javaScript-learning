// apply在功能上与call相同，唯一的区别在于apply()函数除接收的参数 第一格是要绑定的this,第二个是一个参数数组
// 而不是像call一样的参数列表

Function.prototype.fakeApply = function(thisObj, args) {
    let fn = this;
    if(typeof fn !== 'function') throw new Error('must is a Error');
    let key = Symbol('tempKey');
    thisObj[key] = fn;
    let result = thisObj[key](...args);
    delete thisObj[key];
    return result;
};

function display(arg) {
    console.log('look up what will happen ' + this.name + ' ' + arg);
}

let person = {
    name: 'test'
};

display.fakeApply(person, ['args']);