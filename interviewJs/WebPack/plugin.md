## loader(预处理器)
loader其实就是根据rules中的test来匹配不同的文件, 如果匹配了就会调用use中的loader从后往前调用执行来将对应的文件类型转换为js文件类型
因为 webpack最终只能处理js文件


## Plugin

Webpack运行的生活周期中会广播许多事件，Plugin可以监听这些事件，在适当的时机通过Webpack提供的API改变输出结果。十分灵活

大致流程：Webpack启动后，在读取配置的过程中会先 new xxxPlugin(option), 初始化 Plugin 并获得其实例。在初始化 compiler 对象后，再通过调用 Plugin实例d对象的 apply(compiler)(xxxPlugin.apply(compiler)) 为插件传入 compiler对象，之后Plugin就能通过complier.plugin('事件名', 回调函数)方法, 在webpack的生命周期里面添加回调函数、监听到webpack广播的事件，并可以通过compiler对象去操作webpack。
网上自定义的一个简单plugin代码
```javascript
// webpack.config.js   
plugins: [    
  new MyTestPlugin({       
    msg: '你好我是梨花酱' // 传入的插件配置    
  })
]

// MyTestPlugin.js
const { ConcatSource } = require("webpack-sources") // 用来写入
class MyBannerPlugin {  
    constructor(options) { 
        // 获取传入的option信息    
        this.msg = options.msg  
    },  // 我们需要一个apply方法(为了获取compiler)，接收compiler作为参数表示这次打包的上下文。  
    apply (compiler) {    
        const msg = this. msg    // 指定挂载的 webpack 钩子函数    
        // 使用compiler钩子compilation，即编译（compilation）创建之后，执行插件。    
        compiler.hooks.compilation.tap("MyTestPlugin", compilation => {      
        // compilation的 optimizeChunkAssets 钩子，可以利用这个钩子实现为每个文件插入信息      
            compilation.hooks.optimizeChunkAssets.tap("MyTestPlugin", chunks => {        
                for (const chunk of chunks) {          
                    for (const file of chunk.files) {            
                        compilation.updateAsset(file, old => {                       
                            return new ConcatSource(msg,"\n", old);            
                        });          
                    }        
                }      
            })    
        })  
    }
}
module.exports = MyTestPlugin

```



注：1.webpack大致分为 初始化阶段-编译阶段-输出阶段
2.compiler对象包含了webpack环境中所有的配置信息。在webpack启动时被实例化，简单的说，可以理解它为 Webpack的实例


## 总结
形象的比喻就是 webpack就是一条生产线，loader就是生长线上的一道道工序最终将不同了类型的文件都转换为js文件, 而plugin就是在生产线上的在一个特定的时机或环节时所对资源进行的处理
loader可以理解成webpack的横向宽度，即可以处理多少种不同类型的文件，而plugin则是webpack的纵向高度，在webpack生命周期的不同时机执行不同的操作扩展更多的能力，使得webpack更加灵活

## Reference
[https://www.webpackjs.com/api/compilation-hooks/#optimizechunkassets](https://www.webpackjs.com/api/compilation-hooks/#optimizechunkassets)

