let s = new String('Hello World!')
console.log(s)
console.log(typeof s)
console.log( s instanceof String)

//  内部属性[class]
Object.prototype.toString.call('rqwe')
Object.prototype.toString.call([1,2,3])
Object.prototype.toString.call(null)
Object.prototype.toString.call(undefined)
Object.prototype.toString.call(42)
Object.prototype.toString.call(true)


let testfalse = new Boolean(false)
if(!testfalse) {
	console.log('this is a error')
}
console.log(testfalse)

//  模拟join函数  
function fakeJoin(arr, connector) {
	let str = ''
	for(let i = 0; i< arr.length; i++) {
		if(i > 0) {
			str += connector
		}
		if(arr[i] !== undefined) {
			str += connector
		}
	}
	return str
}
let fakeJoinA = new Array(3)
console.log(fakeJoin(fakeJoinA, '-'))

//  Array.apply()方法
let testApply = Array.apply(null, {length: 3})
console.log(testApply)

//  symbol 
let testSymbol = Symbol('aaaa')
console.log(testSymbol)
console.log(testSymbol.toString())
console.log(typeof testSymbol)

let testSymbolObject = {}
testSymbolObject[testSymbol] = 'abc'
console.log(testSymbolObject)