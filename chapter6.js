//  委托模式
let Task = {
	setID: function(ID) {
		this.id = ID
	},
	outputId: function() {
		console.log(this.id)
	}
}

let XYZ = Object.create(Task)

XYZ.prepareTask = function(ID, label) {
	this.setID(ID)
	this.label = label
}

XYZ.outputTaskDetail = function() {
	this.outputId()
	console.log(this.label)
}


//  对象关联风格代码
let Foo = {
	init: function(who) {
		this.me = who
	},
	identify: function() {
		return 'I am ' + this.me
	}
}

let Bar = Object.create(Foo)

Bar.speak = function() {
	console.log('Hello, ' + this.identify() + '!')
}

let bar1 = Object.create(Bar)
bar1.init('wx')
let bar2 = Object.create(Bar)
bar2.init('cm')
bar1.speak()
bar2.speak()