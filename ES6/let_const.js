var a = [];
for(var i =0; i < 10; i++){
    a[i] = function(){
        console.log(i);
    }
} 
a[6]();

var b = [];
for(let j=0; j<10; j++){
    b[j] = function(){
        console.log(j);
    }
}
b[6]();

// 设置循环变量的那部分相当于是在父级作用域，而循环体重的部分是子集作用域
for(let j=0; j<3; j++){
    let j = "abc";
    console.log(j);
}


//  var所导致的变量提升，是将变量提升到全局作用域或函数作用域的头部， 而不是只提升到块级作用域的头部
// let, const的引入加入了块级作用域的概念，但是之前只有全局作用域和函数作用域的概念，
//  因此var变量的提升提升到的是全局作用域或函数作用域
function f1(){
    let n = 1;
    if(true){
        let n = 10;
    }
    console.log(n);
}
f1();
function f2(){
    let n =1;
    if(true){
        n = 10;
    }
    console.log(n);
}
f2(); //  输出的是10， 因为此时n的作用域范围不再是块级，而是函数级作用域， 因为n是通过var声明的

//  其实每个作用域中的变量或函数都已经声明好了
// 但对于let， const声明的变量必须要等到执行完声明语句之后才能调用该变量
// 作用域只能从内向外寻找对应的变量

//  ES6规定上来说将块级作用内的函数声明设置为let
//  但是为了不兼容的问题，还是进行了一下的规定：
//  允许在块级作用域内声明函数。
//  函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
//  同时，函数声明还会提升到所在的块级作用域的头部
//  对于自己俩说需要明白的就是  函数相当于是用var来声明的，
//  var声明的变量和函数会被提升到全局作用域的头部或函数的头部，具体取决于该函数或变量声明的位置


//  const 声明，
//  const 本质要求的是该变量的所保存的值不变， 对于基本数据类型来说 值就直接被保存在变量的所对应的地址中，所以就相当于是常量
//  而对于对象数据来说， 变量所对应的内存空间所保存的值 是该对象在内存空间的地址，所以该常量所对应的内存空间的地址不能变，但是对象中的数据是可以变得

var constantize = (obj) =>{
    Object.freeze(obj);
    Object.keys(obj).forEach((key, index) =>{
        if(typeof obj[key] === 'object'){
            constantize(obj[key]);
        }
    });
}

console.log(globalThis);