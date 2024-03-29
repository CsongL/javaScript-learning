## Tree-shaking 实现原理
Tree-shaking的实现时基于ES6 module进行静态分析，通过AST将用不到的函数进行移出，从而减小打包体积

Tree-shaking所做的工作其实就是基于ES6 module的静态分析，然后标记那些在源文件中声明了，但是并没有使用的函数，之后再压缩的这个步骤中，将这些标记的函数清除掉，从而减小打包的体积

为什么是基于ES6 module 而不是CommonJS?
因为 ES6 module构建模块之间的依赖关系是在代码编译阶段而不是运行时，所以在编译阶段其实已经建立好了模块之间的依赖关系，因此webpack就可以检测代码中哪些函数是没有被使用到的，从而对这些没有使用到的函数进行标记，以便在之后的压缩阶段对这些函数进行删除
因此 如果项目中的模块是通过Commonjs实现引入其他模块的话，那么tree-shaking将不会有任何作用
另外 压缩阶段以般只存在于生产环境下，因此只有在生产环境下会将没有被使用的函数进行删除，而在开发环境下，我们还是能看到这些没有被使用函数


