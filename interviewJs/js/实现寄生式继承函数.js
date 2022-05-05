// 寄生式组合继承函数
// 根据父构造函数的原型创建一个新的对象
// 修改这个对象的constructor属性，将这个新的对象的constructor属性指向子构造函数本身
// 在将这个新的对象赋值给子构造函数的prototype属性

function inherit(superType, subType) {
    const prototype = Object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function SuperType(friends) {
    this.friends = friends;
}

SuperType.prototype.getFriends = function() {
    return this.friends;
}

function SubType(name, friends) {
    this.name = name;
    SuperType.call(this, friends);
}

inherit(SuperType, SubType);


SubType.prototype.getName = function() {
    return this.name;
}

const superIns = new SuperType('Li');

console.log(superIns.getFriends());

const subIns= new SubType('Cai', 'Li');

console.log(subIns.__proto__);
console.log(Object.getPrototypeOf(subIns));
console.log(subIns.getName());
console.log(subIns.getFriends());
