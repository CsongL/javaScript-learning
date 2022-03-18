//class的一些基本的知识
// ES6引入的类本质上就是一个函数, 所以类的很多行为都与构造函数相似
// 类的prototype属性指向的是一个原型对象，原型对象的constructor属性指向的是这个类函数本身
// 类中的普通方法本质上都是定义在prototype原型对象上，所以类的实例对象调用对应的方法时，调用的其实也就是类的原型对象上的方法
// constructor构造函数内的this指针指向的是新创建的实例对象

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }
}

console.log(typeof Point);
console.log(Point.prototype.constructor === Point);
let p = new Point(1, 2);
console.log(p.toString());

// 类中只有明确表名是定义在类的实例对象上的属性时，这个属性才是直接定义在实例对象上，否则都是定义在类的原型属性所对应的原型对象上
// 写在类函数最顶层的属性 就是实例对象的属性，最顶层的属性不需要使用this指针
class TopPropClass {
    _count = 2;
    get value() {
        return this._count;
    }
    set value(val) {
        this._count =val; 
    }

}

let topPropClass = new TopPropClass();
console.log(topPropClass.value);
topPropClass.value = 4;
console.log(topPropClass._count);

// 定义在类中的静态方法不能通过实例对象调用, 只能通过类本身来调用, 其实也就是说static声明的方法时定义在类本身上的，而不是定义在类的prototype属性所对应的原型对象上的
// 静态方法中的this指的是类而不是实例对象
// 类上的静态方法可以被子类继承，但是也只能通过子类本身来调用，而不能通过子类的实例对象来调用
class Foo {
    static count = 2;

    static hello() {
        console.log('hello');
    }
    hello() {
        console.log('hello ordinary');
    }
    static speak() {
        this.hello();
    }
}

Foo.speak();
let foo = new Foo();
foo.hello();
console.log('类的静态属性', Foo.count);

// 继承
// 子类本身的__proto__指针指向的是父类本省
// 子类的prototype属性所对应的原型对象的__proto__指针指向的是父类的prototype属性所对应的原型对象
// 子类的原型对象相当于就是父类原型对象的实例对象
class A {

}

class B extends A{

}

console.log(B.__proto__ === A);
console.log(B.prototype.__proto__ === A.prototype);


//Mixins
function mixin(...mixins) {
    class Mixin {
        constructor() {
            for(let mixin of mixins) {
                copyProperties(this, new mixin());
            }
        }
    }

    for(let mixin of mixins) {
        copyProperties(Mixin, mixin); // 复制静态属性
        copyProperties(Mixin.prototype, mixin.prototype); // 复制原型对象上的属性
    }
    return Mixin;
}

function copyProperties(target, source) {
    for(let key of Reflect.ownKeys(source)) {
        if(key !== 'constructor' && key !== 'name' && key !== 'prototype'){
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}