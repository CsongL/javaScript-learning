# Css实现方格布局
通过视同line-gradient 线性渐变来实现方格布局

## line-gradient语法
line-gradient: [<angle> | to <side-or-corner>], <color-stop-list>

**angle**: 表明线性变化的角度，0edg是从下网上，90edg是从左往右， 180edg是从上往下，270edg是从右往左
**side-or-corner**: 包含两个关键值， 一个是水平方向： left, right; 一个是垂直方向: top, bottom；such as to left, to left top等
**color-stop-list**：颜色变化列表 
eg: 
    linear-gradient(red, orange, yellow, green, blue); 省略了长度值
    linear-gradient(red 0%, orange 25%, yellow 50%, green 75%, blue 100%)
    用百分比表示了长度值
    linear-gradient(red 0, orange 20px, yellow 50px, green 75px, blue 100px)
    用具体的长度表示


通过line-gradient来制作一个方格布局
[code](https://codepen.io/csongl/pen/JjOmPdw)


## Reference
[Docs](https://www.atjiang.com/create-grids-via-css-linear-gradient/)

