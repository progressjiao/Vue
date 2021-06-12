# 1. 单文件组件
**Single-File-Component** 将一个组件的视图、逻辑和样式都写在一个.vue的文件里，每一个Vue文件包含3个块`<template> <script> <style>`，还可以自己添加一些自定义块。下面是一个案例：

```html
<template>
  <div class="app">
    {{msg}}
    <button @click="count++"></button>
  <div>  
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      msg
    }
  },
}
</script>

<style>
  .app{
    color:red;
  }
</style>
```

这样做有什么好处？
- 有了高亮语法
- 组件作用域的CSS
但是浏览器并不能识别.vue文件，会解析失败，那么怎么去用呢？
- webpack
- **vue-cli**
# 2. 安装使用vue-cli
- 全局安装`npm install -g @vue/cli`
- 查看是否安装成功`vue -V`
- 创建一个项目`vue create project-name`
- 将项目跑起来`yarn serve`或者`npm run serve`
- 将项目打包`yarn build`或者`npm run build`生成dist
- 以可视化界面的形式查看或者运行项目`vue ui`
# 3. 项目的目录结构

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e34dcbede5d4a2c88e6aac5b36476e6~tplv-k3u1fbpfcp-watermark.image)
- `public`文件夹，存放一些公共的资源文件
- `src/assets`，也是存放一些资源文件，放自己添加的一些资源文件
- `src/components`，存放组件，默认自带一个helloworld组件
- `src/App.vue`，项目的根组件
- `src/main.js`，程序入口文件
其中main.js代码如下：

```js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```
可以看到，这里面有一个render函数，它的作用是用来渲染视图的，而我们以前都是通过template进行视图渲染的，这两者的区别是什么？
- 通过template渲染是这样的流程：template -> 编译成render函数 -> vnode -> 真实DOM -> 添加到根容器App内，可以看出template最终还是要以render这种方式进行编译。
- render里有一个函数h，这个h的作用是将单文件组件进行虚拟DOM的创建，然后再通过render进行解析。h就是createElement()方法：`createElement(标签名称,属性配置,children)`。
# demo: 使用vue-cli创建的项目完成一个todolist案例
## 效果展示

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f49b21b3a10f4024a8a2dd78283d4e32~tplv-k3u1fbpfcp-watermark.image)
- 在输入框里面加入待办事项会出现在下面的列表中
- 点击删除按钮，会在列表中删除对应事项
- 点击完成按钮，会改变格式（如todo2)
首先我们需要用vue-cli创建一个新的工程，然后将App.vue里面不相关的代码删掉，在components目录中注册我们需要的组件，然后添加到App根组件中。

App.vue

```html
<template>
  <div id="app">
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>
```
然后我们需要编写TodoList组件的逻辑，使用数据驱动视图的思想。这里将每一个列表项的逻辑抽取出来形成了TodoItem，开发的时候应该多注意这种组件化的思想。同时注意父子组件数据的传递。

TodoList.vue

```html
<template>
    <div>
        <h1>todos</h1>
        <input class="todos-input" placeholder="请输入代办事项" @keyup.enter="handleAdd" v-model="content"/>
        <div id="todos-content">
            <ul>
                <li v-for="item in todos" :key="item.id">
                    <TodoItem :item="item" @delete="handleDelete" @complete="handleComplete"></TodoItem>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
    export default {
        components: {
            TodoItem,
        },
        data() {
            return {
                content:"",
                currentID:3,
                todos: [
                    {
                        id:1,
                        title:"todo1",
                        state:"active"
                    },
                    {
                        id:2,
                        title:"todo2",
                        state:"completed"
                    },
                    {
                        id:3,
                        title:"todo3",
                        state:"active"
                    }
                ]
            }
        },
        methods: {
            handleAdd() {
                this.todos.push({
                    id: ++this.currentID,
                    title: this.content,
                    state:"active"
                })
                this.content = ""
            },
            handleDelete(id) {
                this.todos = this.todos.filter((item)=> item.id!==id)
            },
            handleComplete(item){
                item.state = "completed"
            }
        },
    }
</script>

<style>
ul{
    list-style-type: none;
    padding-inline-start: 0;
    border:1px solid #ccc;
    width: 400px;
    border-radius: 10px;
}
ul li{
    margin-top: 10px;
    margin-bottom: 10px;
}
.todos-input{
    width: 200px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #ccc;
    outline-style: none;
    border-radius: 5px;
}
#todos-content{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
```
TodoItem.vue

```html
<template>
    <div :class="classes">
        {{item.title}}
        <button @click="handleDelete">delete</button>
        <button @click="handleComplete">complete</button>
    </div>
</template>

<script>
    export default {
        props:["item"],
        computed: {
            classes() {
                return {
                    isCompleted: this.item.state === "completed"
                }
            }
        },
        methods: {
            handleDelete() {
                console.log("delete");
                this.$emit("delete", this.item.id);
            },
            handleComplete() {
                this.$emit("complete", this.item)
            }
        },

    }
</script>

<style>
.isCompleted{
    color:red;
    text-decoration: line-through;
}
</style>
```
一个todolist案例就完成了，在vue-cli的基础上进行开发为我们提供了很大的便利，并且vue-cli还提供了很多其他的配置如ESLint\Prettier等，具体可以参照[vue-cli官网](https://cli.vuejs.org/zh/)。

