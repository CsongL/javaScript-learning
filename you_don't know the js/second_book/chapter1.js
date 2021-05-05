//  类型
console.log(typeof undefined === 'undefined')
console.log(typeof true === 'boolean')
console.log(typeof 42 === 'number')
console.log(typeof '43' === 'string')
console.log(typeof {life: 42} === 'object')
console.log(typeof Symbol() === 'symbol')
console.log(typeof null === 'object')

//  函数的length属性 是 其声明的参数的个数
function functionLength(a, b, c, d) {
	console.log(a, b, c, d)
}
console.log(functionLength.length)

//  变量本身是么有类型的，当它持有值的时候才会具有值的类型 
//  也就是说 只声明一个变量而没有让其持有值时，就是undefined，
//  变量的类型会根据持有的值，发生变化
let testVary
console.log(typeof testVary)
let testVary2 = 43
console.log(typeof testVary2)
testVary2 = testVary
console.log(typeof testVary2)
