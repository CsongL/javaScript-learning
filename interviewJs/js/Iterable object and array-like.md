## Iterable object and array-like 

## Iterable object
可迭代对象是指对象实现了[Symbol.iterator]属性，这个属性对应的值是一个函数，这个函数最终返回的是一个迭代器对象，这个迭代器对象实现了next()方法，而这个next()方法最终返回的是一个对象 {value: 当前迭代的值，done: 是否迭代结束}
for...of 可以迭代可迭代对象，即想要通过for...of迭代，那么该对象必须是一个可迭代对象
for...of 底层运行原理：
1. for...of调用这个可迭代对象的[Symbol.iterator]属性，得到一个迭代器对象，
2. 通过调用这个迭代器对象的next()方法，得到一个对象，通过这个对象的value获取迭代的值，通过done属性来判断迭代是否结束

### array-like对象
一个对象是类数组对象必须要满足两个条件：
1. 可以通过索引访问元素(即属性名为数字)
2. 存在length属性

类数组对象和真正的数组的区别在于，没有built-in的数组方法


类数组对象 和 可迭代对象是毫不相干的两个不同类型的对象定义

可迭代对象 是指实现了 [Symbol.iterator]属性的对象

类数组对象 是指可以通过索引访问元素 以及 存在length属性的对象


### 如何将iterable object 和 array-like对象转换为数组
通过 Array.from() 方法可以将类数组对象和可迭代对象变为真正的数组

### Reference
[Iterables]https://javascript.info/iterable#calling-an-iterator-explicitly