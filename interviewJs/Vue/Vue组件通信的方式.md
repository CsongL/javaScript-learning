## Vue组件通信的方式
Vue组件将的通信主要分为两大类：
    * 父子组件间的通信
    * 非父子组件间的通信(例如兄弟组件间的通信，隔代组件间的通信)

## props/emit  父子组件间的通信
父组件通过props向子组件传递数据，子组件通过emit向父组件传递消息


## parent/children 父子组件间的通信
通过this.$parent可以在子组件中获取父组件对应的组件实例对象, 从而获取父组件实例对象上的数据或方法
而通过this.$children可以在父组件中获取子组件对应的组件实例对象, 从而获取子组件实例对象上的数据或方法
this.$children是一个数组，包含该组件的所有子组件的实例对象
// 父组件
```vue
<template>
    <div>
        <div>{{msg}}</div>
        <com-a></com-a>
        <button @click="changeA">点击改变子组件的值</button>
    </div>
</template>

<script>
import ComA from './comA,vue'
export default {
    name: 'parent',
    components: {
        ComA
    }
    data() {
        return {
            msg: 'Welcome'
        }
    },
    methods: {
        changeA() {
            this.children[0].messageA = '改变了';
        }
    }
}
</script>
```
子组件
```vue
// 子组件中
<template>
  <div class="com_a">
    <span>{{messageA}}</span>
    <p>获取父组件的值为:  {{parentVal}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageA: 'this is old'
    }
  },
  computed:{
    parentVal(){
      return this.$parent.msg;
    }
  }
}
</script>
```

## provide/inject 不仅可以用于父子组件也可以用于隔代组件通信
provide来提供变量，inject获取provide中的数据
不论组件嵌套多深，都能通过inject将provide中的数据提取出来
因此 不仅可以用于父子，还可以用于隔代组件间的通信，但是不能用于兄弟组件间的通信

eg: [provide/inject](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IENoaWxkIH0sXG4gIHByb3ZpZGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6ICdoZWxsbydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxDaGlsZCAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ2hpbGQudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBHcmFuZENoaWxkIGZyb20gJy4vR3JhbmRDaGlsZC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEdyYW5kQ2hpbGRcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmplY3Q6IFsnbWVzc2FnZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBNZXNzYWdlIHRvIGdyYW5kIGNoaWxkOiB7eyBtZXNzYWdlIH19XG4gIDwvcD5cbjwvdGVtcGxhdGU+In0=)

## ref/refs
ref: 如果在普通的dom元素上使用，那就是对普通dom元素的引用，如果是在组件上使用，那么就是对组件实例对象的引用，通过这个对组件实例对象的引用我们就可以获取组件上的data和方法
this.$refs就是存储这些引用的对象，通过设置的引用名，来获取对dom元素的引用或者是对组件实例对象的引用

```vue
// 子组件 A.vue

export default {
  data () {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      console.log('hello')
    }
  }
}
```
```vue
// 父组件 app.vue

<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA; //获取对组件实例对象的引用
      console.log(comA.name);  // Vue.js
      comA.sayHello();  // hello
    }
  }
</script>
```

## eventBus事件总线
eventBus就相当于是创建一个事件中心，每一个组件都可以通过`this.$emit`去触发一个事件，然后其他组件可以通过`this.$on`来监听这个事件,
从而实现父子组件或兄弟组件间的通信
```javascript
// 初始化一个事件公交
import Vue from 'vue'
const eventBus = new Vue()
```


```vue
// app vue
<template>
  <div>
    <show-num-com></show-num-com>
    <addition-num-com></addition-num-com>
  </div>
</template>

<script>
import showNumCom from './showNum.vue'
import additionNumCom from './additionNum.vue'
export default {
  components: { showNumCom, additionNumCom }
}
</script>
```


```vue
// additionNumCom组件发送事件
<template>
  <div>
    <button @click="additionHandle">+加法器</button>    
  </div>
</template>

<script>
import {EventBus} from './event-bus.js'
console.log(EventBus)
export default {
  data(){
    return{
      num:1
    }
  },

  methods:{
    additionHandle(){
        // 发送事件
      EventBus.$emit('addition', {
        num:this.num++
      })
    }
  }
}
</script>

```

```vue
// showNumCom组件监听事件
// showNum.vue 中接收事件

<template>
  <div>计算和: {{count}}</div>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  data() {
    return {
      count: 0
    }
  },

  mounted() {
      // 监听事件，并接收传递过来的参数
    EventBus.$on('addition', param => {
      this.count = this.count + param.num;
    })
  }
}
</script>
```

```javascript
// 移出事件
import { eventBus } from 'event-bus.js'
EventBus.$off('addition', {})
```


## Vuex状态管理实现组件通信
1. state：用于数据的存储，是store中的唯一数据源
2. getters：如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
3. mutations：类似函数，改变state数据的唯一途径，且不能用于处理异步事件
4. actions：类似于mutation，用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作
5. modules：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护
通过 `this.$store.state.xxx` 获取state中的数据
通过 `this.$store.commit('xxx', params)` 提交mutations中的方法

## 通过LocalStorage或sessionStroage来实现组件通信
存储在localStorage或sessionStroage来进行组件通信

## $attrs 与 $listeners
`$attrs`是一个对象，这个对象里面包含的是 fallthrough atrtributes
fallthrough attributes属性是指父组件传递下来的没有在子组件props中声明的属性或一个已经被子组件emit的事件
默认的情况下，`$attrs` 中的所有属性会自动被根元素继承，如果只有一个根元素。但如果一个组件有多个根元素，那么就不会发生根元素继承$attrs对象中的属性
我们也可以通过`inheritAttrrs:false` 来设置不让根元素继承$attrs中的属性
简单说 inheritAttrs：true 继承除props之外的所有属性；inheritAttrs：false 只继承父组件的class属性


`$listeners`：包含了父作用域中的 (不含 .native 修饰符) v-on 事件监听器。它可以通过 v-on=”$listeners” 传入子组件。它是一个对象，里面包含了作用在这个组件上的所有事件监听器，相当于子组件继承了父组件的事件。

[code](https://segmentfault.com/a/1190000022708579)



## 总结
* 父子组件通信： props/emit, provide/inject, `$parent/$children`, `$attrs/$listeners`
* 兄弟通信： eventBus, Vuex
* 隔代通信：eventBus, Vuex, provide/inject, `$attrs/$listeners`



