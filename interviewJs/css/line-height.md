# CSS 属性 line-height属性
line-height 属性是用来指定元素内线性文本的行间距大小, line-height 的值是一个相对值，是相对于元素自身字体的大小来计算行间距

## line-height的
    * normal 所对应的值就取决于浏览器或其他设备的设置，通常来说是1.2
    * <number> 没有单位的数字值，例如 line-height: 1.2的意思就是该元素的行间距的大小的值 = 1.2 X 该元素的font-size的值，子元素的line-height属性不会继承该值
    * <percentage> 设置为百分比值，例如 line-height: 120%的意思就是 该元素的行间距的大小值 = 120% X 该元素的font-size的值，但子元素的line-height属性会继承父元素的line-height的值，从而导致出现非预期的样式问题
    * <length> 设置为有单位的值，单位必须是em，因为是要相对该元素的字体大小设置值，与<percentage>一样，存在被子元素继承从而导致出现预期之外的样式

[code](https://codepen.io/csongl/pen/OJOrQry)

