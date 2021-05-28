//this file is abou the iterator in the javascript
let num = 1;
let obj = {};
console.log(num[Symbol.iterator]);
console.log(num[Symbol.iterator]);

let arr = [1,2,3];
let map = new Map([[2,3], [3,4]]);
let set = new Set([1,2,3]);
let str = "123";

// 得到默认的迭代器属性对应的值
console.log(arr[Symbol.iterator]);
console.log(map[Symbol.iterator]);
console.log(set[Symbol.iterator]);
console.log(str[Symbol.iterator]);

// gte the 迭代器对象
console.log(arr[Symbol.iterator]());
console.log(map[Symbol.iterator]());
console.log(set[Symbol.iterator]());
console.log(str[Symbol.iterator]());

// 有些结构会在后台默认调用可迭代对象的这个Symbol.iterator属性 从而获取对应的工厂函数， 从而生成该对象的迭代器
// let ... of ...  
let arr1 = ["bar", "zar", "car"];

// ... of ... 会自动调用可迭代对象的Symbole.iterator这个属性，从而获取到对应的函数，从而创建对应的迭代器对象 
for(let elem of arr1){
    console.log(elem);
}

// 数据解构也会自动调用对应的结构
let [a,b,c] = arr1;
console.log(a,b,c);

// 扩展操作符 
let arr2 = [...arr1];
console.log(arr2);

//set 构造函数
let set1 = new Set(arr);
console.log(set);

// map 构造函数
let paris = arr1.map((value, index) =>[index, value]);
console.log(paris);
let map2 = new Map(paris);
console.log(map2);

let arr3 = ["bar", "zar"];
let iterator1 = arr3[Symbol.iterator]();
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());

let iterator2 = arr3[Symbol.iterator]();
arr3.splice(1,0,"car");
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());

//自定义可迭代器
class Foo {
    [Symbol.iterator](){
        return {
            next(){
                return {done: false, value: "foo"}
            }
        }
    }
}
let f = new Foo();
let fIterator = f[Symbol.iterator]();
console.log(fIterator.next());


class Counter {
    constructor(limit) {
        this.limit = limit;
        this.count = 1;
    }
    next() {
        if(this.count < this.limit) {
            return { done: false, value: this.count++};
        }else{
            return { done: true, value: undefined};
        }
    }
    [Symbol.iterator](){
        return this;
    }
}

let counter = new Counter(5);
for(let elem of counter){
    console.log(elem);
}
// 将计数器放到闭包里面，这样每一次创建一个迭代器 就会从新开始计数
class Counter1 {
    constructor(limit) {
        this.limit  = limit;
    }
    [Symbol.iterator]() {
        let count = 1;
        let limit =  this.limit;
        return {
            next(){
                if(count <= limit) {
                    return { done: false, value: count++};
                }else{
                    return { done: true, value: undefined};
                }
            }
        };
    }
}
let counter1 = new Counter1(3);
for(let i of counter1){
    console.log(i);
}
// 每个迭代器也实现了可迭代接口 => 因此 我们也可以通过一个迭代器 去生成另一个迭代器 

// 提前返回， 即调用迭代器的return方法，会终止迭代的继续， 从而提前返回结果
// 什么情况下会调用这个return方法呢 
// for ... of... 通过break， continue，throw， return 提起退出时
// 或者结构操作并未消费所有值

class Counter2 {
    constructor(limit){
        this.limit = limit;
    }
    [Symbol.iterator](){
        let count = 1;
        let limit = this.limit;
        return {
            next(){
                if(count <= limit){
                    return {done: false, value: count++};
                }else{
                    return { done: true};
                }
            },
            return() {
                console.log("Execure have quit");
                return {done:true};
            }
        };
    }
}

let counter2 = new Counter2(4);
for(let i of counter2){
    if(i>2){
        break;
    }
    console.log(i);
}


let [e,g] = counter2;