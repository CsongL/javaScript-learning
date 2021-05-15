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

//  使用对象关联风格去实现一个注册，登录
let loginController = {
	error: [],
	getUser: function() {
		return document.getElementById('login_usename').value
	},
	getPassword: function() {
		return document.getElementById('login_password').value
	},
	validateEntry: function(user, pw) {
		user = user || this.getUser()
		pw = pw || this.getPassword()
		if(!(user && pw)) {
			return this.failure(
			'Please enter a username & password!')
		}
		else if(user.length > 5) {
			return this.failure(
			'Password must be 5+ characters!')
		}
		return true
	},
	showDialog: function(title, msg) {
		console.log(title + msg)
	},
	failure: function(err) {
		this.error.push(err)
		console.log('Error', 'Login invaild: ' + err)
	}
}
let AuthController = Object.create(loginController)

AuthController.errors = []
AuthController.checkAuth = function() {
	let user = this.getUser()
	let pw =  this.getPassword()
	
	if(this.validateEntry(user, pw)) {
		this.server('/check-auth', {
			user: user,
			pw: pw
		}).then(this.accepted.bind(this))
		.fail(this.rejected.bind(this))
	}
}
AuthController.server = function(url, data) {
	return $.ajax({
		url: url,
		data: data
	})
}
AuthController.accepted = function() {
	this.showDialog('success', 'Authenticated!')
}
AuthController.rejected = function(err) {
	this.failure('Auth Failed: ' + err);
}

//  附录的 类代码
class C {
	constructor() {
	    this.num = Math.random()
	}
	rand() {
		console.log(this.num)
	}
}

let c1 = new C()
c1.rand()
C.prototype.rand = function() {
	console.log(Math.round(this.num * 1000))
}
let c2 = new C()
c2.rand()

c1.rand()