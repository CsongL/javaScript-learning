## loader(预处理器)
loader其实就是根据rules中的test来匹配不同的文件, 如果匹配了就会调用use中的loader从后往前调用执行来将对应的文件类型转换为js文件类型
因为 webpack最终只能处理js文件


## Plugin

Webpack运行的生活周期中会广播许多事件，Plugin可以监听这些事件，在适当的时机通过Webpack提供的API改变输出结果。十分灵活

大致流程：Webpack启动后，在读取配置的过程中会先 new BasicPlugin(option), 初始化 Plugin 并获得其实例。在初始化 compiler 对象后，再通过调用 Plugin实例的 apply(compiler) 为插件传入 compiler对象，Plugin就能在webpack的生命周期里面添加回调函数、监听到webpack广播的事件，并可以通过compiler对象去操作webpack。

注：1.webpack大致分为 初始化阶段-编译阶段-输出阶段
2.compiler对象包含了webpack环境中所有的配置信息。在webpack启动时被实例化，简单的说，可以理解它为 Webpack的实例


## 总结
所以说 其实loader是在进行真正打包之前进行的一些列预处理动作，而plugin是在真正的打包过程中，通过监听广播事件来进行一些处理的
