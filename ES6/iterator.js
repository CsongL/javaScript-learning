// 迭代器本身的就是用来 一个个迭代数据结构里面的数据，迭代器本身与数据结构是分开的
// 迭代器对象其实就是一个指针对象，指向的就是数据结构，用来遍历数据结构中的数据

function makeIterator(array) {
    let pointIndex = 0;
    return {
        next() {
            return pointIndex < array.length ? 
            {value: array[pointIndex++], done: false}
            : { value: undefined, done: true};
        }
    };
}

let ownIt = makeIterator([1,2]);
console.log(ownIt.next());
console.log(ownIt.next());
console.log(ownIt.next());

// ES6规定 凡是定义了[Symbol.iterator]属性的对象, 就是可遍历对象
// 只要对象定义了[Symbol.Iterator]这个属性，那么这个对象就是一个可遍历对象，对象的这个属性[Symbol.iterator]所对应的值是一个函数
// 这个函数最终会返回一个包含next函数的对象，而这个所返回的对象就是遍历器对象
// eg
let iterableObj = {
    [Symbol.iterator] : function() {
        return { 
            next() {
                return {value: 1, done: false};
            }
        };
    }
};

// 具备[Symbol.iterator]属性的对象，可以被let..of..直接循环遍历
// let...of.. 默认的就是通过调用对象的[Symbol.iterator]属性来得到一个遍历器对象，从而实现对对象的遍历

// 一个对象声明了 [Symbol.iterator]属性那么这个对象就是一个可迭代对象，这个可迭代对象的[Symbol.iterator]属性对应的值是一个函数，这个函数返回的是一个迭代器对象，返回的这个迭代器对象必须要有next属性

class RangeIterator {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        let value = this.start;
        if(value <= this.end) {
            this.start++;
            return { value, done: false};
        } else {
            return { value: undefined, done: true};
        }
    }
} 

let rangeIt = new RangeIterator(1, 3);

for(let i of rangeIt) {
    console.log(i);
}


// 迭代器实现一个list 数据结构
function Obj(value) {
    this.value = value;
    this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
    let curr = this;
    return {
        next() {
            if(curr) {
                value = curr.value;
                curr = curr.next;
                return { value, done: false};
            } else {
                return {done: true};
            }
        }
    };
};

let obj1 = new Obj(4);
let obj2 = new Obj(5);
let obj3 = new Obj(6);

obj1.next = obj2;
obj2.next = obj3;
for(let val of obj1) {
    console.log(val);
}
