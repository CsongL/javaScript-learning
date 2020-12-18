//  存储history。listen的回调函数
let listeners: Listener[] = [];
function listen(fn: Listtener) {
	listeners.push(fn);
	return function() {
		listeners  = listeners.filter(listener => listener !== fn)
	}
}

function push(to: string, state?: State) {
	//  解析用户传入的url
	//  分解成pathname, search等信息
	location = getNextLocation(to, state);
	//  调用原生的history的方法改变路由
	window.history.pushState(state, '', to);
	//  执行用户传入的监听函数
	listeners.forEach(fn => fn(location));
	//  用于处理浏览器前进后退操作
	window.aaddEventListener('popstate', () => {
		location = getLocation();
		listeners.forEach(fn => fn(location))
	})
}

