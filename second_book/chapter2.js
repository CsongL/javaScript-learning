//  声明数组后即可加入值， 不需要预先设定大小
let a = [1, '2', [3]]

console.log(a.length)

function foo() {
	let arr = Array.prototype.slice.call(arguments)
	arr.push('arr')
	console.log(arr)
}

foo('zzzz', 'dddd')

//  借用Array的方法来对字符串进行操作
let testArray = 'foo'
testArrayc = Array.prototype.join.call(a, '-')
console.log('testArray', testArrayc)

//  Number
let numberA = 5E10
console.log(numberA);
console.log(numberA.toExponential())
//  tofixed() 指定
numberA = 42.563
console.log(numberA.toFixed(0))
console.log(numberA.toFixed(1))
console.log(numberA.toFixed(2))
console.log(numberA.toFixed(4))
console.log(typeof numberA.toFixed(4))

//  使用Number.EPSILON来比较两个数字是否相等
function numberCloseEnoughToEqual(n1, n2) {
	return Math.abs(n1, n2) < Number.EPSILON
}
let testEpsion = 0.1 + 0.2
let testEpsionB = 0.3
console.log('EPSILON')
console.log(Number.EPSILON)
console.log(testEpsion, testEpsionB)
console.log(numberCloseEnoughToEqual(testEpsion, testEpsionB))
console.log(0.0000001, 0.0000002)
console.log(numberCloseEnoughToEqual(0.00000001, 0.0000002))

//  javaScript 运算结果溢出是，结果可能为Infinity 或者 -Infinity
let infinityA = Number.MAX_VALUE
let infinityB = Number.MIN_VALUE

console.log(infinityA + infinityA)
console.log(infinityB + infinityB)

//  判断是不是-0
function isNegZero(n) {
	n = Number(n)
	return (n===0 && 1/n === -Infinity)
}
console.log(isNegZero(-0))
console.log(isNegZero(0))

// vue 
let testCopyA = 2
function testCopyFunction1() {
	testCopyA = 3
	console.log(testCopyA)
}
function testCopyFunction2(testCopy) {
	testCopy = 5
	console.log(test)
	console.log(testCopyA)
}

testCopyFunction1()
testCopyFunction2(testCopyA)


