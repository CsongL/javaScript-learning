// 从一个数组或对象中提取值，为一个变量赋值，这就被称为是解构

//  只要一个对象实现了Iterator接口那么该对象就是可以被解构的

// 默认值 只有当一个成员严格等于undefined时， 默认值才会生效

let [x2 = 1] = [undefined]; // => x2 = 1
let [x3 = 1] = [null]; // => x3 = null

// 默认值可以引用其他解构赋值的其他变量，前提是这个变量必须是已经声明了
let [x=1, y=x] = [];
console.log(x, y);

let [x1=1, y1=x1] = [undefined, 2];
console.log(x1, y1);

// 对象解构
// 基本用法：  对象的解构要求变量名要与对象的属性名相同，而数组的解构则必须要求变量的位置与数组中值对应的位置相同
//  对象时根据对象的属性名来进行迭代的，而数组是根据数组的下标位置来迭代的
let {foo, bar} = {foo: 'aaa', bar:'zzz'}
console.log(foo);
console.log(bar);

// 对象真正的解构赋值的写法应该是:
// 前面是要匹配的属性，后面才是存储对象中这个属性的值的变量
let {foo: objProp1, bar: objPorp2} = {
    foo: 'zz',
    bar: 'tt'
}
console.log(objProp1);
console.log(objPorp2);



// 数值和布尔值的解构， 会先将数值和布尔值转换为对象，然后在进行解构
//  解构赋值的规则： 只要等号右边不是对象，那么会先将其转换为对象
let {toString: numToString} = 123;
console.log(numToString === Number.prototype.toString);
console.log(Object.toString);


//  函数参数也可以解构赋值
function add([num1, num2]){
    console.log(num1+num2);
}
add([1,2]);

let arr = [[1,2], [3,4]].map(([a,b]) => a+b);
console.log(arr);

const node = {
    loc:{
        start: {
            line:1,
            column: 5
        }
    }
}

let {loc, loc:{start}, loc:{start:{line}}} = node;
console.log(loc, start, line);


//  两种不同的赋值默认值的方式
// 这个是给变量赋值默认值
function move({move1=0, move2=0} = {}){
    console.log([move1, move2]);
}
move({move1: 2, move2: 3});
move({move1: 1}); 
move({});
// 下面是给对象参数赋值默认值
function movef({move1, move2} = {move1:1, move2:1}){
    console.log([move1, move2]);
}

movef({move1: 1, move2: 2});
movef({move1: 1});
movef();