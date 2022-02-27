#如何避免CSS样式冲突
## BEM式 domainName-subName-eleName
```css
.home-page {
    .home-page-btn {

    }
}
```

## Css Scoped
scoped css 会对当前组件下的所有元素生成唯一的属性或类型，对css规则将携带唯一属性实现作用域保护
```css
/*编译前*/
.root{

}

/*编译后 携带有唯一的标识*/
.root .jsx-123123 {

}
```

## Css module 
将css文件当做module来使用，在js文件中以module的形式来引入和应用
```css
/*style.css*/
.className {
    color: red;
}
```

```javascript
import { style } from 'style.css'

element.innerHtml = '<div class="style.className"></div>'

```