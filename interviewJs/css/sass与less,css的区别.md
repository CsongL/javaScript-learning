## sass, less, css
sass, less 都是css的预处理语言，
在我们开发的时候可以使用预处理语言来进行开发，
在打包上线时，我们可以通过webpack来对这些预处理语言进行处理，从而变为css语言供浏览器使用

### sass
sass版本3.0之前都是使用的是.sass作为后缀名，而版本3.0之后，是使用.scss作为文件的后缀名
sass文件没有{} 和 ; 它有严格的缩进规范；
scss 和 css 的缩进规范是一致的
#### scss文件的基本语法
##### 使用$来声明变量
```scss
$highlight-color: red;
$basic-border: 1px solid black;

#app {
    background-color: $highlight-color;
    border: $basic-border;
}
```
css文件声明和使用变量的方式
```css
/*在根伪类下声明变量，这样可以html文档的任何地方访问到它*/
:root {
    --highlight-color: red;
    --basic-border: 1px solid black;
}

#app {
    background-color: var(--highlight-color);
    border: var(--basic-border);
}
```

##### 嵌套语法
```html
<div id="app">
    <div class="container"></div>
</div>
```

```scss
$highlight-color: #f90;
$basic-border: 1px solid black;

#app{
  background-color:  $highlight-color;
  border:$basic-border;
  .container{
    font-size:30px;
  }
}
```

##### 父类选择器(&)
```scss
$highlight-color: #f90;
$basic-border: 1px solid black;

#app{
  background-color:  $highlight-color;
  border:$basic-border;
  .container{
    font-size:30px;
  }
  a{
    color:blue;
    &:hover{
      color: red;
    }
  }
}
```

##### 支持模块化，
可以将需要的变量定义到一个新的文件中，需要使用的样式文件可以直接引入
```scss
@import './base.scss';
$highlight-color: #f90;
$basic-border: 1px solid black;
#app{
  background-color:  $base-color;
  border:$basic-border;
  .container{
    font-size:30px;
  }
  a{
    color:blue;
    &:hover{
      color: red;
    }
  }
}
```


### less 与 scss(sass)的区别
1. less 与 scss 都是css的预处理语言，less是基于js实现的，scss是基于Ruby语言实现的
2. less的错误报告更准确，例如less可以报告错误的具体位置等
3. scss的混入 @mixin, @include
```scss
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}

// => css file
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}

//带参数
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}

// CSS OUTPUT
.sidebar {
  float: left;
}
[dir=rtl] .sidebar {
  float: right;
}

```

less的mixin
```less
.round-borders {
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}

#menu {
  color: gray;
  .round-borders; //混入
}

// Output
.round-borders {
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}

#menu {
  color: gray;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}

//带参数
.round-borders (@radius) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

header {
  .round-borders(4px);
}

.button {
  .round-borders(6px);
}
```

