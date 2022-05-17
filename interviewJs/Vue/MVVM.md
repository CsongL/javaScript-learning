## MVVM model
M: model 表示的其实就是 数据
V: view 表示的其实就是 视图
VM: view-model 表示的其实就是 model 和 view中间的那一层， view-model的作用就是连接view和model，通过双向绑定实现view层和model层之间的同步

### MVVM在Vue中的具体体现
Vue框架主要就是关注于 view-model层

每一个Vue的实例对象 就相当于是view-model层，这个vue的实例对象通过双向绑定实现view层和model层数据之间的同步
vm.$data 就相当于是model层，也就是数据层
而 vm.$el 就相当于是 view层，这个vm.$el表示的就是挂载在vue实例对象上的根元素，通过遍历根元素下的每一个孩子节点，将vm.$data中的数据与对应的dom元素进行双向绑定，从而实现view层和model层数据之间的同步

而具体的实现view层和model层之间的数据同步的方式就是通过数据的双向绑定，通过监听dom事件来监听dom元素的变化来实现view层到model层, 通过directives(指令)来实现model层到view层的数据同步。

这里面还涉及到观察者涉及模式
以一个对象a上面的b属性为例，观察者会观察a.b属性
当调用a.b属性时，会收集相应的依赖，
当a.b属性发生变化时，会触发依赖，并且会通知给观察者，观察者接到通知后会去通知使用到这个a.b这个属性的dom元素, 从而完成view层和model层数据的同步



Vue中观察者模式的具体体现(也就view层和model层之间数据双向绑定的具体体现)：
1. 实现一个compile(就是vue中的compile-core部分)，对每个元素节点进行扫描和解析，根据指令模板替换数据，以及绑定相应的函数
2. 实现一个数据监听器Observer(感觉就是vue中的reactivity部分，就是响应式对象)，监听数据是否发生变化，当数据发生变化时，就可以将最新的数据通知给订阅者Dep(感觉就是触发依赖，更新数据)
3. 还需要实现一个Watcher(),作为连接Observer和Compile的桥梁，当数据发生变化时，可以通过执行相应的函数来更新View，
4. MVVM入口函数，整合以上三者


[Vue docs](https://012.vuejs.org/guide/)
[image](https://juejin.cn/post/6844903929298288647)
