## MVVM model
M: model 表示的其实就是 数据
V: view 表示的其实就是 视图
VM: view-model 表示的其实就是 model 和 view中间的那一层， view-model其实就是实现view和model双向绑定的那一层

Vue框架其实就可以看成是中间的这个 view-model层
Vue就是将负责视图的html代码 与 负责数据的js代码分隔开， 并且在html和js代码之间建立起了双向绑定的机制

而Vue要实现在view和model之间实现这种双向绑定，就必须实现以下四点：
1. 实现一个compile(就是vue中的compile-core部分)，对每个元素节点进行扫描和解析，根据指令模板替换数据，以及绑定相应的函数
2. 实现一个数据监听器Observer(感觉就是vue中的reactivity部分，就是响应式对象)，监听数据是否发生变化，当数据发生变化时，就可以将最新的数据通知给订阅者Dep(感觉就是触发依赖，更新数据)
3. 还需要实现一个Watcher(),作为连接Observer和Compile的桥梁，当数据发生变化时，可以通过执行相应的函数来更新View，
4. MVVM入口函数，整合以上三者

[image](https://juejin.cn/post/6844903929298288647)
