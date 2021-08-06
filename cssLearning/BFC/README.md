BFC(Block formatting content) 块级格式化区域

BFC的作用主要是能够将BFC内的元素与BFC外部的元素相隔离开
BFC内部的元素的定位方式 不会受到外部元素的影响

哪些元素是一个BFC：
根元素(html)
浮动元素(display: float)
绝对定位元素(position: absolute)
行内块(display: inline-block)
表格单元格(display: table-cell)
overflow的值不为visible的元素
弹性盒(display:flex)

参考资料：https://juejin.cn/post/6844903495108132877#heading-2