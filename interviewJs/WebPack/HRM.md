## HRM(Hot Module Replacement) 热模块替换
不需要刷新整个页面，只需要更新某一个改变的模块即可，可以提高效率

webpack的热更新原理：
首先webpack中是通过 `__webpack__modules`这个数组来保存所有的模块
而热更新的原理 说的简单一点就是, 通过chunk的方式加载最新的model(其实也就是我们改变源文件后，打包好的model)， 然后去 `__webpack__modules`中找到对应的模块，然后用新的模块去替换，并删除其缓存的上下文

具体的流程如下：
1. webpack将打包好的文件，放到内存中，
2. 每次当源文件发生变更后，webpack将会重新进行打包，webpack-dev-server将会坚挺到文件的变化，并且找到新打包好的那个变化之后的module
3. 找到这个变更后的module，webpack-dev-server会把这个最新的module通知到浏览器端，此时使用的是websocket与浏览器进行交流
4. 浏览器根据从dev-server接收到的hash值，以jsonp的方式向服务器端发送请求更新模块的chunk，这个hash值是通过对资源内容的计算而得到的
5. 浏览器加载chunk，并且使用新的模块对旧模块进行热替换，并删除其缓存。


资源hash
每次打包的过程中对资源的内容计算一次hash值，并作为版本号放在文件名中，如bundle@e123124asdrasdadfa, 前面是文件本身的名字，@后面就是文件内容的hash值，代码发生变化时，相应的hash值也会发生变化。

### Reference
[Docs](https://q.shanyue.tech/fe/webpack/79.html)