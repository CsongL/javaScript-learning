# CSS画各种形状

## 圆形

```css
.circle {
    width: 100px;
    height: 100px;
    background: red;
    border-radius: 50%;
}
```

## 三角形

```css
.triangle-to-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}

.triangle-to-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-right: 100px solid red;
}

.triangle-top-left {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}
.triangle-bottom-right {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
}
```



## 梯形

```css
.trapezoid-shape {
    width: 100px;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
}
```





## 参考链接

https://css-tricks.com/the-shapes-of-css/