# CSS选择器

## 选择器种类

明确一点： 目前没有任何选择器能获取到元素的父元素，父元素的同级元素，以及父级元素的同级元素的子元素

### 基本选择器

* 通用选择器(*), 匹配所有元素
* 标签选择器(eg: P)，匹配所有该标签元素
* 类选择器(.class)，按照元素的class属性的值来匹配
* 属性选择器([attr = value]), 按照元素的某一属性的值来匹配
* ID选择器(#id), 按照元素的id属性的值来匹配

### 组合器

* 直接子组合器(>), eg A > B 只能选择A元素后代中直接子元素B
* 后代组合器(空格)， eg A B 选择A的后代中所有的B元素
* 一般兄弟组合器(~), eg A ~ B B在A的后面且B与A都在同一个父节点下的所有B元素
* 紧邻兄弟组合器(+), eg A + B B紧跟在A的后面，且A与B同在一个父节点下，但是只选紧邻的那一个B元素

```html
<div class="container">
  <p class="p-text">sub<p>
  <div clas="subContainer">
    <p class="p-text">second-sub</p>
    <p class="p-sub-text">sub sub text</p>
  </div>
    <p class="p-sub-text">sub second text</p>
  <p class="p-sub-text">sub third text</p>
</div>
<p class="p-sub-text">do not in same parent element</p>
```

```css
/*父元素内的所有子元素*/
.container .p-text {
  color: red;
}

/*父元素的直接子元素*/
.container > .p-text {
  color: green;
}

/*一般兄弟组合器*/
.p-text ~ .p-sub-text {
  color: pink;
}
/*紧邻兄弟组合器*/
.p-text + .p-sub-text {
  color: blue;
}
```
### 伪选择器

* 伪类选择器(:hover)
* 伪元素选择器(::before)

## 选择器优先级

最需要明确的是：离元素越近优先级越高，样式的指向性越明确优先级越高

**优先级排序**

1. 内联样式优先级最高
2. id选择器
3. 类选择器，属性选择器，伪类选择器优先级相同
4. 标签选择器，伪元素优先级相同

通用选择器，组合选择器，否定伪类选择器对优先级没有影响



## Reference

Docs: https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors