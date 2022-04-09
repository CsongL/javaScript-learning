# BFC(Block Formatting Context)块级格式化上下文
## 通俗理解
BFC块级格式化上下文就是页面布局上的一个容器，这个容器形成一个封闭的区域，这个区域内的元素的排列规则和样式不受外部的影响，也不会影响页面中其他元素的布局和样式，从而实现一些特殊的需求

## BFC特性
* BFC块级格式化上下文就相当于是一个容器，这个容器内部的元素的排列规则和样式不会受到外部的影响
* 每一个浮动元素就是一个BFC，每一个浮动元素内部的样式只会受到这个浮动元素的影响,而不会受到其他浮动元素的影响。因为每一个浮动元素就是一个BFC，因此浮动元素之间互不影响
* 在同一个BFC中的块级元素上下一个个排列时，元素的外边距会发生重叠
* 两个不同的BFC上下排列时，不会发生垂直方向外边距重叠

## 创建BFC
如何将一个元素变为BFC
* 根元素或者包含根元素的元素是BFC
* 绝对定位或固定定位的元素position: absolute | fixed,脱离原来的文档流
* 浮动元素 float=left | right 也是 脱离了原来的文档流
* 元素的overflow：hidden | auto 或 scroll
* 元素的display = inline-block | flex | inline-flex | table-cell 或 tab-caption

## BFC的作用
### 消除浮动
浮动元素因为脱离了文档流，所以计算页面高度时，不会计算浮动元素的高度，从而导致页面高度的塌陷, 而为了在计算页面高度时，将浮动元素的高度加入计算，可以将浮动元素放入一个BFC元素中，BFC内的元素不会影响外部元素的布局，外部元素的布局也不会影响内部，因此在计算高度时，可以将浮动元素的高度计算上

```html
    <div class="container">
        <div class="sibling"></div>
        <div class="sibling"></div>
    </div>
```
```css
    .container {
        overflow: hidden; /*将该块级元素变为了一个BFC*/
    }
    .sibling {
        float: left;
        margin: 10px;
    }
```

### BFC内垂直排列的块元素的外边距发生重叠
当BFC内部的两个块级元素垂直排列时，元素的上下边距会发生重叠
垂直边距重叠规则：
    * 当两个元素的上下外边距也就是margin属性的值同号时，取绝对值最大的那个值，作为两个元素间的外边距
    * 当两个元素的上下外边距也就时margin属性的值为一正一负时，外边距取这两个margin值的和 即 下面元素的margin-bottom + 下面元素的margin-top 

### 两个BFC元素之间的垂直外间距不会发生重叠


## Reference
[BFC面试](https://segmentfault.com/a/1190000013647777#:~:text=%E5%9D%97%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%B8%8A%E4%B8%8B%E6%96%87%EF%BC%88Block%20Formatting,Context%EF%BC%8CBFC%EF%BC%89%E6%98%AFWeb%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%8F%AF%E8%A7%86%E5%8C%96CSS%E6%B8%B2%E6%9F%93%E7%9A%84%E4%B8%80%E9%83%A8%E5%88%86%EF%BC%8C%E6%98%AF%E5%B8%83%E5%B1%80%E8%BF%87%E7%A8%8B%E4%B8%AD%E7%94%9F%E6%88%90%E5%9D%97%E7%BA%A7%E7%9B%92%E5%AD%90%E7%9A%84%E5%8C%BA%E5%9F%9F%EF%BC%8C%E4%B9%9F%E6%98%AF%E6%B5%AE%E5%8A%A8%E5%85%83%E7%B4%A0%E4%B8%8E%E5%85%B6%E4%BB%96%E5%85%83%E7%B4%A0%E7%9A%84%E4%BA%A4%E4%BA%92%E9%99%90%E5%AE%9A%E5%8C%BA%E5%9F%9F%E3%80%82%202.%E9%80%9A%E4%BF%97%E7%90%86%E8%A7%A3)

