let array1 = [12, "foo", {name:"joe"}, -2458];
let array2 = ["Doe", 555, 100];
let array3 = [12, "foo", {name:"joe"}, -2458];

//  call方法传递参数是通过参数列表来传递的，
Array.prototype.push.call(array1, array2);
console.log(array1);

//  apply方法传递参数是通过一个参数数组来传递参数，数组中的元素为参数
Array.prototype.push.apply(array3, array2); 
console.log(array3);

function log(){
    console.log.apply(console, arguments);
}

log(1);
log(1,2,3);

function logapp(){
    let args = Array.prototype.slice.apply(arguments);
    console.log(args instanceof Array);
    args.unshift('(app)');
    console.log.apply(console, args);
}

logapp("hello world");

// bind与 apply, call最大的区别：
// bind根据调用的函数会创建一个新函数，并将这个新函数内部的this值绑定为指定的值
// 传递参数是以参数列表来传递的， 而apply, call不会创建一个新的函数，而是调用之前的函数，只不过改变了函数中this的指向

global.num = 9;
let mymoudle = {
    num: 81,
    getNum: function(){
        console.log(this.num);
    }
}

mymoudle.getNum();

let getNum = mymoudle.getNum;
getNum();
let bindGetNum = getNum.bind(mymoudle);
console.log(bindGetNum);
bindGetNum();

console.log(Function.prototype.call);

function test(){
    console.log(this.num);
}

test.apply(global);

function Bloomer(){
    this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

Bloomer.prototype.bloom = function(){
    setTimeout(this.decleare.bind(this), 100); //  通过bind()所创建的新的函数不论经过多少次执行，其函数内部的this的值永远都是我们所指定的值
};

Bloomer.prototype.decleare = function(){
    console.log(this);
    console.log('我有' + this.petalCount + '朵花瓣!');
};

let blom = new Bloomer();
blom.bloom();

function Point(x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function(){
    console.log(this.x + ',' + this.y);
}

let point = new Point(1,2);
point.toString();

let YAxisPoint = Point.bind({}, 0/*x*/);
let axisPoint = new YAxisPoint(5);

axisPoint.toString();

console.log(YAxisPoint);
