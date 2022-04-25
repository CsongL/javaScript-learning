## Vue中的过滤器
vue中的过滤器分为两种  一种是全局注册，一种是局部注册

### 过滤器使用
vue中定义的过滤器可以用在两个地方：{{}} 和 v-bind表达式, 过滤器应该放到javascript表达式尾部，由“管道”符号表示：
花括号使用 {{message | filter}}(前面的message会作为过滤器的第一个参数)
v-bind使用 v-bind:test = "message | filter"

```vue
<template>
    {{message | change }}
    <div v-bind:text = "message | change"></div>
</template>

<script>
// 局部注册
export default {
    name: 'component',
    filters: {
        change(message) {
            console.log(message + 'have been changed');
        }
    }
}
</script>
```

### 局部注册
在组件中定义只有这个组件使用的过滤器
```js
export default {
    name: 'component',
    filters: {
        change(message) {
            console.log(message)
            return message + 'changed';
        }
    }
}
```

### 全局注册过滤器
如果是通用性的过滤器可以进行全局注册，全局注册过滤器应该在创建vue实例之前全局定义过滤器，可以在main.js中进行全局注册
```js
// main.js
import Vue from 'vue'

Vue.filter('change', function(message) {
    console.log(message);
    return 'changed' + message;
})


// 另一种方式将所有的全局filter抽出来放到一个js文件中
// filter.js
export function change(message) {
    return message + 'changed';
}

export function changeTo(message) {
    return message + 'to';
}

// 在 main.js中引入
import * as filters from './filter.js'
import Vue from 'vue'


Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
})
```



### Reference
[docs](https://www.jianshu.com/p/d689e6816fe9)