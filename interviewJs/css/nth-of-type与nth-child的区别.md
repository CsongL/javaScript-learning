## nth-of-type 与 nth-child的区别

nth-of-type 和 nth-child都可以用来选择父元素下的子元素
eg:
```html
<div>
  <p>first</p>
  <p>Second</p>
</div>
```html

```css
p:nth-child(2) {
  color: red;
}
p:nth-of-type(2) {
  color: green;
}
```
但 nth-child和nth-of-type在匹配子元素时是有一定的区别：
nth-child的匹配规则：
    * 是p元素
    * 并且是父元素的第二个元素

nth-of-type的匹配规则：
    * 是父元素下的第二个p元素

区别就在于 一个是父元素下的第二个元素要是p元素，一个是父元素的第二个p元素
具体看代码
新增了一个div元素
```html
<div>
  <div>test</div>
  <p>first</p> // 红色
  <p>Second</p> // 绿色
</div>
```
```css
p:nth-child(2){
  color: red;
}

p:nth-of-type(2) {
  color: green;
}
```

nth-of-type还是选择的是父元素下第二个p元素，而nth-child是选择父元素下的第二个元素是p元素

## 区别
nth-of-type的选择规则就是父元素下的第几个某元素，
而 nth-child的选择规则是有两条的首先要是父元素的第几个元素，之后要判断是否是对应的这个元素是否是对应的元素
nth-of-type 是父元素内**某元素的第几个**
nth-child 是父元素的**第几个的是不是某元素**