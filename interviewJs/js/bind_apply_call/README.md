this bind call apply

参考资料：https://juejin.cn/post/6844903496253177863
更加详细的参考资料: https://segmentfault.com/a/1190000018270750
ES5中 this永远指向最后调用它的那个对象


改变this的指向的方法：
使用ES6的箭头函数  
箭头函数内的this始终指向的是箭头函数定义时的this, 而不是箭头函数执行时的this
“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined


在函数内部使用_this = this;
将调用该方法或变量的对象先保存在_this中，之后再使用


使用apply, call, bind方法
apply和call的用法相同，惟一的区别在于传递参数的形式不同
apply传递参数的方式是，传递一个数组，这个数组包含了所有的参数  super.apply(_this,[arg1, arg2])
而call传递参数的方式是，传递一个参数列表，super.call(_this, arg1, arg2);

bind 和 apply, call的区别：
bind是创建了一个新的函数，当新的函数被调用时，将新的函数的this值设置为提供的值，参数传递还是以参数列表的方式进行传递，所以需要收到调用新创建的函数
function a(){
    console.log(this.name)
}.bind(b)();   
而apply, call都是只是调用原函数，修改原函数内的this的值

当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
apply 、 call 、bind 三者都可以利用后续参数传参；
bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

