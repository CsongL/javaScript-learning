# display:inline元素设置padding 和 margin 是否生效

## 结论
内联元素设置padding 和 margin会生效，但是只有水平方向的padding 和 margin 会产生实际的效果(也就是与其他元素产生间隔), 而垂直方向的padding和margin没有产生实际的效果(也就是不会与其他元素产生间隔)
```css
:root {
    --distance: 1rem;
}

.item-padding {
    border: 1px solid black;
    padding-left: var(--distance);
    padding-right: var(--distance);
    /*垂直方向不产生实际效果*/
    padding-top: var(--distance);
    padding-bottom: var(--distance);
}

.item-margin {
    border: 1px solid black;
    margin-left: var(--distance);
    margin-right: var(--distance);
    /*垂直方向的设置 不产生实际效果*/
    margin-top: var(--distance);
    margin-bottom: var(--distance);
}
```

```html
<div class="container">
  我是<span class="item">行内元素</span>白日依山尽，黄河入海流。欲穷千里目，更上一层楼。白日依山尽，黄河入海流。欲穷千里目，更上一层楼。白日依山尽，黄河入海流。欲穷千里目，更上一层楼。白日依山尽，黄河入海流。欲穷千里目，更上一层楼。
</div>
```

### Reference
CSDN: https://blog.csdn.net/qq_21901233/article/details/79465048
Code: https://codepen.io/csongl/pen/NWwMyoV
