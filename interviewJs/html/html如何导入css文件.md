## html文件如何导入css文件
## html导入css文件
html 导入css文件的两种方式
1. head标签对中的link标签
2. 通过@import导入css文件
### 通过head标签对中的link标签来引入css文件
link标签只能出现在head部分，不过在head部分可以出现很多次
通过link标签引入css文件的方式，会在网页主题装载前就加载css样式，因此网页一显示出来的时候从一开始就是带样式效果的
它不会像导入样式那样，一开始是一个没有样式的页面，然后再显示有样式的页面

```html
<head>
    <link rel="stylesheet" type="text/css" href="css路径">
</head>
```

### 通过@import方式导入css文件
在head标签对中的style标签内 通过@import引入css文件
但是每多一个通过@import引入css文件，就会对服务器增加一次连接请求

```html
<head>
    <style>
        @import url(css路径);
    </style>
</head>
```

```css
@import url(css路径);
```
