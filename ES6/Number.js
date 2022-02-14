// ES6 在 Number上提供了Number.isFinite() 和 Number.isNaN()方法  这两个方法只对数值有效
console.log(Number.isFinite(12));

console.log(Number.isNaN(NaN));

// Number.EPSILON 是西新增的一个极小的常量 可以用来表示一个可以接受的误差范围
// 浮点数的计算是不准确的
console.log(0.1 + 0.2 === 0.3);

function withinErrorMargin(left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

console.log(withinErrorMargin(0.1 + 0.2, 0.3));


// Js所能准确表示的整数的范围是在 -2^53 到 2^53之间 不包含两个端点
// Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER;
console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1);
console.log(Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER);

// Number.isSafeInteger()是用来判断一个数是否在js所能表达的数值范围内
console.log(Number.isSafeInteger(12));
// 手写Number.isSafeInteger()函数的实现
function isSafeInterger(n) {
    return (typeof n === 'number' // 判断是否是数字类型
            && Math.round(n) === n // 判断是否是整数   Math.round(number) 求number四舍五入后的结果
            && Number.MAX_SAFE_INTEGER >= n // 小于等于最大的数
            && Number.MIN_SAFE_INTEGER <= n // 大于等于最大的数
    )
}

