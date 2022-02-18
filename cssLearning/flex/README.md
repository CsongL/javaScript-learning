参考资料：
http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool%EF%BC%88%E8%AF%AD%E6%B3%95%E7%AF%87%EF%BC%89

flex布局分为两个部分： flex容器， flex项目  flex容器中包含着flex项目


容器属性，元素（项目）属性：
容器属性：
flex-direction： row | row-reverse | column | column-reverse （主轴排列的方式）
flex-wrap: nowrap(默认) | wrap | wrap-reverse  (元素是否换行)
flex-flow: <flex-direction> || <flex-wrap>;

justify-content: flex-start | flex-end | center | space-around |space-between  沿主轴的对齐方式

align-items: flex-start | felx-end | center | stretch | baseline  沿交叉轴（纵轴的对齐方式）

定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用
align-content: flex-start | flex-end | center | space-between | space-around | stretch
(flex-start: 从交叉轴起点开始对齐)

元素(项目)属性：
order: 默认为0， 元素的order越大，元素排的越靠后
flex-grow: 默认为1，定义项目的放大比例，
flex-shrink: 默认为1，定义项目的缩小比例；
flex-basis: 默认值为auto，项目占据的主轴空间

单个项目的对齐方式，默认继承的是容器的align-item属性的值
align-self: auto | flex-start | flex-end | center | baseline | stretch