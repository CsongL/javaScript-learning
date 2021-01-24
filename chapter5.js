function Foo(name) {
	this.name = name;
}

Foo.prototype.myName = function() {
	return this.name;
}

function Bar(name, label) {
	Foo.call(this, name);
	this.label = label
}
//  创建一个新的Bar.prototype 对象并关联到Foo.prototype
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.myLabel = function() {
	return this.label
}

var a  = new Bar('a', 'Object a');
console.log(a.myName())
console.log(a.myLabel())

//  ._proto_的实现
Object.defineProperty(Object.prototype, '_proto_', {
	get: function() {
		return Object.getPrototypeOf();
	},
	set: function(o) {
		return Object.setPrototypeOf(this, o);
		return o;
	}
});


let bar = {
	something: function() {
		console.log('Tell me the reason!')
	}
}

let foo = Object.create(bar)
foo.something()

let anotherObject = {
	a: 2
}

let createdObject = Object.create(anotherObject, {
	b: {
		enumerable: false,
		wirtable: true,
		configable: false,
		value: 3
	},
	c : {
		enumberable: false,
		wirtable: true,
		configable: false,
		value: 4
	}
})

console.log(createdObject.hasOwnProperty('a'))
console.log(createdObject.hasOwnProperty('b'))
console.log(createdObject.hasOwnProperty('c'))

console.log(createdObject.a)
console.log(createdObject.b)
console.log(createdObject.c)

let fromCreatedObject = Object.create(createdObject)
console.log(fromCreatedObject.hasOwnProperty('b'))

//  create a own Object.create() named creatAndLinkObject(o)
function creatAndLinkObject(o) {
	function F() {}
	F.prototype = o
	return new F()
}

let ownObject  = {
	a: '2'
}

let ownCreatedObject = creatAndLinkObject(ownObject)

console.log(ownCreatedObject.a)

//  内部委托
let nbwtObject = {
	cool: function() {
		console.log('This is so cool!')
	}
}

let createnbwtObject = Object.create(nbwtObject)

createnbwtObject.doCool = function() {
	 this.cool()
}

console.log(createnbwtObject.doCool())