# 什么是Vue

一套构建用户界面的**渐进式框架**，那么什么是渐进式？

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32a46487ac534a30a90d606682b5b501~tplv-k3u1fbpfcp-watermark.image)

一层一层，一步步来做事情，剥洋葱的形式来，例如一开始只需要用到声明式渲染，而后面随着业务变得越来越复杂会用到Vue的其他部分，一层层向外拓展，相当于一种组合的思想。
# 安装
直接使用`<script>`标签引入

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
通过npm安装，安装在了node_modules里面

```
npm i vue
```
# 实现Hello World
- View层，使用类HTML，用到了{{ }}这个语法糖，将要显示的视图内容写在这个双大括号里面

```html
<div id="app">{{msg}}</div>
```
- 逻辑层，写入处理逻辑和展示的数据

```js
const app = new Vue({
    el:'#app',//建立视图层和逻辑层的联系
    data:{
        msg:'hello world'
    }
})
```
# MVVM框架
刚刚提到了View层和逻辑层（model层），那么什么是MVVM框架呢？

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12749c4f614d4abaaac87f025aaada25~tplv-k3u1fbpfcp-watermark.image)

MVVM框架分为三层，也就是View层，Model层，ViewModel层，View层就是我们写的DOM元素，也就是展现出来的视图，Model层是我们写入的JavaScript对象，也就是一些数据处理的逻辑在里面，那么ViewModel这一层其实上就是Vue，Vue帮我们做了一个视图和数据的双向绑定，当我们去修改数据的时候，视图也会发生改变，同样的，当视图发生改变的时候数据也发生改变了，这是Vue内部去帮我们实现的。这也就决定了，我们以后都是去操作数据，通过数据的变更去驱动视图的变更。
# 基础语法
## v-bind属性插值
```html
<div id="app">
    {{msg}}
    <div v-bind:test-id="testId"></div>
</div>
<script>
    const app = new Vue({
        el:'#app',
        data:{
            msg:'hello world',
            testId:1
        }
    })
</script>
```

其中`v-bind:test-id="testId"`可以简写成`:test-id="testId"`

注意：无论是{{}}文本插值还是v-bind属性插值，都支持js表达式
## v-on事件处理
```html
<div id="app">
    {{msg}}
    <button v-on:click="handleClick(1, $event)">click</button>
</div>
<script>
    const app = new Vue({
        el:'#app',
        data:{
            msg:'hello world'
        },
        methods:{
            handleClick(type, e){
                console.log(type, e);
            }
        }
    })
</script>
```
其中`v-on:click="handleClick"`可以简写成`@click="handleClick"`
并且函数支持调用，在`v-on:click="handleClick(1)"`中的参数可以在函数里面接收到，并且还可以通过`$event`获取到当前的事件对象。

**修饰符：**
- .stop - 调用 event.stopPropagation()，可以阻止当前事件向祖辈元素的冒泡传递。
- .prevent - 调用 event.preventDefault()，取消事件的默认动作。
- .capture - 添加事件侦听器时使用 capture 模式。
- .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
- .native - 监听组件根元素的原生事件。
- .once - 只触发一次回调。
- .left - (2.2.0) 只当点击鼠标左键时触发。
- .right - (2.2.0) 只当点击鼠标右键时触发。
- .middle - (2.2.0) 只当点击鼠标中键时触发。
- .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
## 计算属性computed
通过命名表达程序的意图，和方法的区别：（1）在调用的时候不需要加括号（2）计算属性是有**缓存**的，避免了重复计算，在调用方法时每次调用都会计算一次，而计算属性只有在依赖的属性发生变化时改变

计算属性的特点：
- 可读性
- 缓存
- 多对一，一个计算属性可以依赖多个关系

```html
<div id="app">
    {{ message }}
    <p>调用计算属性{{reverseMsg + reverseMsg}}</p>
    <p>调用方法{{handleClick()}}</p>
    <button type="button" @click="handleClick()">click</button>
</div>

<script>
    const app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!',
        count:1
      },
      computed: {
            reverseMsg() {
                    console.log('调用计算属性');
                    return this.message.split('').reverse().join('') + this.count; 
            }
      },
      methods:{
              handleClick(){
                    console.log('调用方法');
                    return this.message.split('').reverse().join('') + this.count; 
              }
      }
    })
</script>
```
上面的代码调用两次计算属性reverseMsg，但控制台只打印了一次输出，因为有缓存，而方法每次调用的时候都会在控制台打印消息
## Watch
Vue提供的侦听数据的功能，用于在数据发生变化的时候驱动特定的操作，vue官方文档解释当需要在数据变化时执行异步或开销较大的操作时，推荐使用该方法。
```js
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    count:1
  },
  methods: {
    handleClick() {
        this.count++;
    }
  },
  watch: {
    count(newValue, oldValue) {//当count发生改变的时候，执行下面的操作，可以获取改变前后的值
        console.log('oldValue', oldValue);
        console.log('newValue', newValue);
        console.log('count is changed');
        // 在这里可以做一些一部操作请求后端。
    }
  }
})
```
当有多个属性依赖某一个属性时（例如foo和bar都依赖于count），也可以用watch

```js
watch: {
    count(newValue, oldValue) {
        console.log('oldValue', oldValue);
        console.log('newValue', newValue);
        console.log('count is changed');
        this.foo = 'foo' + newValue;
        this.bar = 'bar' + newValue;
    }
}
```
对象形式的写法，写在handler函数中

```js
watch:{
    count:{
        handler(newValue, oldValue){
            console.log('oldValue', oldValue);
            console.log('newValue', newValue);
            console.log('count is changed');
            this.foo = 'foo' + newValue;
            this.bar = 'bar' + newValue;
        },
        immediate:true // 将立即以表达式的当前值触发回调
    }
}
```
对象的侦听及深度侦听（deep），如果不是深度侦听，只能侦听到整个对象的改变，对于对象里面某个属性的改变没法侦听到。

```js
const app = new Vue({
    el:'#app',
    data:{
        user:{
            name:'hjj',
            age:18
        }
    },
    watch:{
        user:{
            handler(newVal, oldVal){
                console.log(newVal);
            },
            deep:true // 深度侦听，当对象里面的某个属性发生改变时也能侦听到
        }
        // 也可以侦听对象的某一个属性
        'user.name':{
            handler(newVal, oldVal){
                console.log('user.name is changed');
                console.log(newVal);
            }
        }
    }
})
```
## 条件渲染
- v-if
- v-else-if
- v-else

```html
<div id="app">
    <div v-if="age<18">未成年</div>
    <div v-else-if="age=18">18岁</div>
    <div v-else>成年了</div>
</div>

<script>
    const app = new Vue({
      el: '#app',
      data: {
        age:18
      }
    })
</script>
```
**v-if** vs **v-show**
如果是v-if，当不满足条件的时候都不会渲染；而v-show是通过style样式去控制的
## 列表渲染
数组的列表渲染

```html
<div id="app">
    <ul>
        <li v-for="(item, index) in users">{{index}} -- {{item.name}} -- {{item.age}}</li>
    </ul>
</div>

<script>
const app = new Vue({
  el: '#app',
  data: {
    users:[
        {
            id:1,
            name:'hhh',
            age:18
        },
        {
            id:2,
            name:'jjj',
            age:30
        }
    ]
  }
})
</script>
```
对象的列表渲染

```html
<div id="app">
    <ul>
        <li v-for="(val, key, index) in userInfo">{{index}} -- {{key}} -- {{val.name}} -- {{val.age}}</li>
    </ul>
</div>

<script>
const app = new Vue({
  el: '#app',
  data: {
    userInfo:{
        1:{
            id:1,
            name:'hhh',
            age:18
        },
        2:{
            id:2,
            name:'jjj',
            age:30
        }
    }
  }
})
</script>
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c64c4640d134447f8006b9a0a5626714~tplv-k3u1fbpfcp-watermark.image)
## class & style
class
```HTML
<style>
    .red{
        color: red;
    }

    .fontSize{
        font-size: 60px;
    }
</style>

<div id="app">
    {{msg}}
    <div :class="classes">foo</div>
</div>
<script>
    const app = new Vue({
        el:'#app',
        data:{
            msg:'hello Vue',
            count:1,
            // 1.对象形式
            // classes:{
            //     red:false
            // },
            // 2.数组形式
            // classes:['red']
            // 3.联合使用
            // classes:['red', {fontSize:true}]
        },
        // 4.计算属性
        computed: {
            classes() {
                return ['red',
                    {
                        fontSize:this.count == 1
                    }
                ]
            }
        },
    })
</script>
```
style

```js
<div id="app">
    {{msg}}
    <div :style="styleInfo">foo</div>
</div>
<script>
    const app = new Vue({
        el:'#app',
        data:{
            msg:'hello Vue',
            count:1,
            styleInfo:{
                color:"blue",
                fontSize:"100px"
            }
        }
    })
</script>
```
## 表单输入绑定
v-model

```HTML
<div id="app">
    <input v-model="inputVal"/>{{inputVal}}
</div>
<script>
    const app = new Vue({
        el:'#app',
        data:{
            inputVal:''
        }
    })
</script>
```
