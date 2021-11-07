//  扩展运算符 
let x = -1;
const a = [
    ...(x > 0 ? [1] : [0]),
    1 
];
console.log('a',a);

//  赋值数组，克隆一个一模一样的数组， 但这是浅拷贝， 即如果数组中某一个数组元素是对象，那么只会拷贝指向该对象的指针，而不会又生成一个对象
let b = [...a];
console.log('b',b);
console.log(b == a); // 因为变量a 和变量b指向不同的内存地址，所以其指针并不相同

// 扩展运算符用于数组赋值，只能放在最后一位，否则报错
let [begin, ...latest] = [1, 2, 3, 4, 5, 6];
console.log(begin);
console.log(latest);

// js 会将四个字节的Unicode字符识别为两个字符，从而导致得出错误的长度，而通过扩展运算符则会正确识别字符，得到正确的长度
let uString= 'x\uD83D\uDE80y'; 
console.log('uString length', uString.length); // x 被识别为两个字符
let uArr = [...uString];
console.log(uArr.length);
// 凡是设计4字节的unicode字符 最后都用下面的方法求字符长度
function uLength(uString){
    return [...uString].length;
}

console.log('uLength function', uLength(uString));


// 扩展运算符内部调用的是数据结构的Iterator接口，因此凡是具有Iterator接口的，都可以被扩展运算符调用
// Array.from
// Array.from 能够将两种对象转换为数组： 一种是类数组对象，类数组对象的定义就是 对象里面有length属性，会根据length属性来确定生成的数组中数据的个数
// 另一种对象是：可迭代对象，即这个对象实现了iterator接口，从而能够遍历对象中的元素，将其转换为一个数组
// Array.from 第二个参数是一个map函数，用于对新生成的数组中的每一个对象做一定的处理
// Array.from 第三个参数是一个对象，用来绑定map函数中的this的值，如果map函数中用到this

// 转换类数组对象，即对象中含有length 属性
console.log(Array.from({length: 3}));
// 转换一个类数组对象/或者也可以说是可迭代对象为数组
console.log(Array.from("testing"));

// Array.from()第二个参数， map函数
console.log(Array.from({length: 3}, () => 'Jack'));

// Array.of的作用 返回由参数所组成的数组
console.log(Array.of(1,2,3));
console.log(Array.of());
console.log(Array.of('123', 12));

// Array.copyWithin() 用数组内部的元素 覆盖数组其他位置的元素
// 第一个参数 覆盖开始的位置
// 第二个参数 数组截取的开始的位置
// 第三个参数 数组截取的用于覆盖的结束位置，不包含第三个参数指定的位置
console.log('copyWithin', [1,2,3,4,5].copyWithin(0, 3,5)); 
// 从数组下标为3的地方截取的数据，覆盖到数组下位为0的地方
 

// Array.flat()方法是用来将数组拉平，默认只能拉平一层，如果指定参数值，那么就会拉平指定层数的数组，
// 如果参数为infinity,那么不论数组有多少层，都会被拉平为一维的
// Array.flatMap()方法时先对原数组中的每一个元素进行一定的操作相当于map，之后对于新形成的数组进行拉平，但只能拉平一层
console.log('flat 1',[[1,2],3,4].flat(1));
console.log('flat 2', [[1,2,[3]],4,5].flat(2));
console.log('flat infinity', [[1,2,[3,[4,5],6],7]].flat(Infinity));

console.log('flatMap', [1,2,3].flatMap((x) => [x, x*x]));
console.log('flatMap 只能拉平一层', [1,2,3].flatMap((x) => [[x]]));
