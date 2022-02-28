# CSS属性 overflow
overflow是用来定义当一个元素内的内容太大而导致该元素的内容溢出或者说该元素的块级上下文作用域无法适应时，该元素所采用的反应或样式

## overflow 属性值
visible: 溢出的元素的内容仍然溢出的状态, 没有什么改变
hidden: 溢出的元素的内容会被隐藏起来
scroll: 会给元素添加上滚动条
auto: 根据浏览器的设置来对溢出的内容进行处理

**overflow属性值想要生效, 那么必须设置元素的高度**

## 代码展示
[Code](https://codepen.io/csongl/pen/PoOyjYj)



## css 属性 word-break
word-break属性主要是用来指定如何单词如何断行
word-break: normal  正常断行
word-break: break-all 对于non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行
word-break: keep-all CJK 文本不断行。 Non-CJK 文本表现同 normal
word-break: break-word 当超出元素大小时，就会断行

## 画一个100 * 100 自动断行的盒子
```html
    <div class="box">
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
```

```css
    .box {
        height: 100px;
        width: 100px;
        overflow: scroll;
        word-break: break-word;
    }
```

