function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval)
    })
}

async function changeColor(color, duration) {
    console.log('当前颜色', color)
    await sleep(duration)
}
async function one2FiveInAsync() {
    await changeColor('red', 2000)
    await changeColor('orange', 1000)
    await changeColor('green', 3000)
}

one2FiveInAsync()

let myArray = [1, 2, 3]
for(let item of myArray) {
	console.log(item)
}

for(let key in myArray) {
	console.log(myArray[key])
}

let myObject = {
	a: 2,
	b: 3
}

Object.defineProperty(myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {
		let o = this
		let idx = 0
		let ks = Object.keys(o)
		return {
			next: function() {
				return {
					value: o[ks[idx++]],
					done: (idx > ks.length)
				}
			}
		}
	}
})

let it = myObject[Symbol.iterator]()
 console.log(it.next())
console.log(it.next())
console.log(it.next())

for(let v of myObject) {
	console.log(v)
}

for(let key in myObject) {
	console.log(key)
	console.log(myObject.key)
	console.log(myObject[key])
}
console.log(Object.keys(myObject))

// 一个无限的迭代器
let randoms = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				return {
					value: Math.random()
				}
			}
		}
	}
}

let random_pool = []
for(let v of randoms) {
	random_pool.push(v)
	console.log(random_pool)
	//  阻断无限循环
	if (random_pool.length === 5) break
}

// Charter 4  混合对象'类'
function mixin (sourceObj, targetObj) {
	for(let key in sourceObj) {
		if(!(key in targetObj)) {
			targetObj[key] = sourceObj[key]
		}
	}
	return targetObj
}

let Vehicle = {
	engines: 1,
	
	ignition: function() {
		console.log('Turning on my engine')
	},
	
	drive: function() {
		this.ignition()
		console.log('Steering and moving forward!')
	}
}

let car = mixin(Vehicle, {
	wheels: 4,
	
	drive: function() {
		Vehicle.drive.call(this)
		console.log('Rolling on all ' + this.wheels + ' wheels')
	}
})

console.log(car)
console.log(car.drive())