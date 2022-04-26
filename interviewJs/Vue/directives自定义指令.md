## directives 自定指令
通过 directives 我们可以自定义一些指令(就像Vue中内置的一些指令 v-bind, v-model等)
directives有两种方式自定义指令
* 全局自定义指令，通过Vue.directive()方法进行注册，全局注册的指令可以在所有组件中使用
* 局部自定义指令，即在组件中自定义对应的指令，组件中的指令只能在组件自身中使用

### 全局自定义指令
```vue
<template>
    <div v-xxoo:title='name'></div>
</template>
Vue.directive('xx00', {
    // 如果想向指令传递参数例如 v-xxoo:title='name', 那么会把值传递到第二个参数中
    inserted(el, b) {
        console.log(el);
        el.setAttribute(b.name, b.value);
        console.log(b);
    },
    update(el) {
        console.log(el);
    }
})
```

### 局部注册自定义指令
在组件中注册自定义的指令
```vue
<template>
    <input type="text", placeholder="我是局部自定义指令" v-focus2>
</template>
<script>
export default {
    name:'component',
    directives : {
        focus2: {
            inserted(el) {
                el.focus();
            }
        }
    }

}
</script>
```

### 自定义指令具体的定义
自定义指令其实本质上就是一个对象，这个对象内部包含了一些生命周期钩子函数，当绑定的元素运行到这些钩子函数时，会执行对应的钩子函数内的代码。从而实现一些特定的操作
自定义指令对象内部包含的钩子函数主要有：
* inserted：当指令绑定的元素插入到DOM中时，会执行inserted(el)钩子函数,该函数的第一个参数是指令所绑定的元素
* created: 在绑定元素的属性以及相应的事件之前调用
* beforeMount: 在绑定的元素被插入到dom元素之前调用
* mounted: 在绑定的元素的父组件以及该父组件的所有孩子元素都被加载完成后调用
* beforeUpdate: 在绑定的元素的父组件被更新前
* updated: 父组件更新完成以及父组件的所有孩子元素也都更新完成
* beforeUnmount: 在父组件被卸载之前调用
* unounted: 父组件被卸载之后调用

#### 钩子函数中的参数
el: 自定义指令所绑定的element元素
binding：一个对象，包含以下属性 {
    value:传递给自定义指令的值
    oldValue: 原来的值，只在 beforeUpdate 和 updated中有用,
    arg:传递给自定义指令的参数，eg `v-example:foo` => arg: 'foo'
    modifiers: 
    instance: 自定义指令所绑定的组件的实例对象
    dir: 自定义指令的实例对象
}
vNode: 自定义指令所绑定的元素的虚拟节点
prevVNode: 更新前的虚拟节点，只能在beforeUpdate 和 updated中使用

