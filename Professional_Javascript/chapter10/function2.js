// 函数属性和方法
// 函数对象的apply方法和call方法的主要作用就是通过这两个方法的第一个参数设置其函数对象执行时的this指针的值
// 这两个方法会设置调用函数时，函数体内this指针的值，也就是说将this的指针值设置为我们想要的指向的那个实例对象
function sum(num1, num2){
    return num1 + num2;
}

function callSum(num1, num2){
    return sum.apply(this, arguments);
}

function callSum2(num1, num2){
    return sum.call()
}
console.log(callSum(10,10));



let o ={
    color:"blue"
};
let o1 = {
    color: "white"
}
function sayColor(){
    console.log(this.color);
}
// 分别将函数对象的函数体内的this指针设置为实例对象o 或实例对o1
sayColor.call(o);
sayColor.call(o1);
