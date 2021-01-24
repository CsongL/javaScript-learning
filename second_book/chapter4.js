//  自定义toJSON()方法
let o = {}
let a = {
	b: 43,
	c: function() {},
	d: o
}
o.e = a

JSON.toString(a)

//  仅仅返回对象a中的属性b
a.toJSON = function () {
	return {b: this.b}
}
JSON.toString(a)


//  toJSON应该返回一个能够被字符串化的安全的值，而不是直接返回字符串
let testJSON = {
	val: [1, 2, 3],
	toJSON: function() {
		return this.val.slice(1)
	}
}
let testJSONb = {
	val: [1, 2, 3],
	toJSON: function() {
		return '[' + this.val.slice(1).join() + ']'
	}
}
console.log(JSON.stringify(testJSON))
console.log(JSON.stringify(testJSONb))

//  JSON.stringfy()  可以传递其他参数
//  传递的参数是字符串数组，只返回数据中所有的字符的项
let testJSONParams = {
	a: '32',
	b: 43,
	c: '222'
}
console.log(JSON.stringify(testJSONParams, ['b', 'c']))
console.log(JSON.stringify(testJSONParams, function(k, v) {
	if(k !== 'c') return v
}))
// 第二个参数，用来指定缩进的格式
let testJSONParamsSecond = {
	a: '43',
	b: '22',
	c: 'zdddd'
}
console.log('Second Params')
console.log(JSON.stringify(testJSONParamsSecond))
console.log(JSON.stringify(testJSONParamsSecond, null, 3))
console.log(JSON.stringify(testJSONParamsSecond, null, '------'))

// toNumber()
console.log(Number(true))
console.log(Number(false))
console.log(Number(undefined))
console.log(Number(null))

//valueof()  toString()  功能
let testValueOf = {
     valueOf: function() {
		 return '43'
	 }
}
let testToString = {
	toString: function() {
		return '44'
	}
}
let testArrayToString = [1, 2]
testArrayToString.valueOf = function() {
	return this.join('')
}
console.log(Number(testValueOf))
console.log(Number(testToString))
console.log(Number(testArrayToString))

//  假值 falsy
console.log(Boolean(undefined))
console.log(Boolean(null))
console.log(Boolean(NaN))
console.log(Boolean(''))
console.log(Boolean(0))
console.log(Boolean(false))

//  获取时间戳
let testTimeStamp = new Date()
console.log(testTimeStamp)
console.log(+testTimeStamp)


//  布尔值到数字的转换
function onlyOne() {
	let sum = 0
	for(let i = 0; i < arguments.length; i++) {
		if(arguments[i]) {
			sum += arguments[i]
		}
	}
	return sum === 1
}
let testOnlyOneA = true
let testOnlyOneB = false
console.log(onlyOne(testOnlyOneA, testOnlyOneB))
console.log(onlyOne(testOnlyOneA, testOnlyOneB, testOnlyOneB))
console.log(onlyOne(testOnlyOneA, testOnlyOneB, testOnlyOneA))

console.log('falsy')
console.log(!!0)
console.log(!!null)
console.log(!!undefined)
console.log(!!'')
console.log(!!false)
console.log(!!NaN)

//  宽松相等， 严格相等
//  宽松相等会进行强制类型转换， 而严格相等不会进行强制类型转换
let looseEqualsA = 43
let looseEqualsB = '43'
console.log(looseEqualsA == looseEqualsB) //  == 宽松相等会进行强制类型转换，因此只需要值相等就能判断等
console.log(looseEqualsA === looseEqualsB)  //  === 严格相等不会进行强制类型转换，因此不能仅仅是值相等既能判断其相等，还要判断其是否类型相等。

