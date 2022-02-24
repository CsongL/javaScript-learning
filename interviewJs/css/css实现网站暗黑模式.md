# CSS实现网站暗黑模式
## 通过使用css中的filter属性来实现
实现方式：
```css
    html[theme="dark-model"] {
        filter: invert(1) hue-rotate(180);
        transition: color 300ms, background-color 300ms; /*过渡动画*/
    }
```

解释：
  css 的 filter属性 是将用于图片上的过滤，颜色变化等图形效果应用与元素上，
  上面所使用到的 invert 可以用来反转应用程序的颜色; hue-rotate 是用来改变图像上的应用色颜色
  通过invert(1)将白色变成黑色，那么为了适配颜色的变化，网页上的图像的颜色应该也做一个改变，这个改变就是通过hue-rotate(180edg)来实现的
  filter属性 其他著名的应用还有:
    * blur() 模糊图像
    * opacity() 图像透明程度
    * drop-shadow() 对图像应用阴影效果
    * ...

## Reference 
[MDN Docs](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
[如何实现网页dark-model](https://segmentfault.com/a/1190000023598551)