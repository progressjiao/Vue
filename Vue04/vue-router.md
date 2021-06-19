# SPA
## 1. 概念
**single page application，单页面应用**，通俗一点说就是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源。

单页面应用的优点：
- 用户体验好，局部刷新而不是整页刷新，更新视图而不重新请求页面
- 前后端分离
单页面应用的缺点：
- 不利于SEO
- 不能使用导航
- 初次加载耗时长，页面复杂度高
## 2. 使用组件切换模拟实现单页面应用
涉及到组件的切换，也就是显示与隐藏，用到v-if。加一个组件状态判断。

App.vue

```html
<template>
  <div id="app">
    <a @click="showHome">Home</a>
    <a @click="showAbout">About</a>
    <HelloWorld v-if="state == 'home'" msg="Welcome to Your Vue.js App"/>
    <About v-if="state == 'about'"></About>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import About from './components/About.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    About
  },
  data() {
    return {
      state: "home"
    }
  },
  methods: {
    showHome() {
      this.state = "home"
    },
    showAbout() {
      this.state = "about"
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  margin: 0;
  padding: 0;
  margin-left: 20px;
}
a:hover{
  color: red;
  cursor: pointer;
  text-decoration: underline;
}
</style>
```
HelloWorld.vue

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
```
About.vue

```html
<template>
    <div>
        <h1>This is about.</h1>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
</style>
```

![1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db5c79bb44a64d2e89a0b4b8cdbe5932~tplv-k3u1fbpfcp-watermark.image)

这样做起来当组件很多的时候会很麻烦，所以vue专门提供了路由vue-router给我们使用，实现单页面应用内的组件切换。
## 3. 使用vue-router构建SPA
在使用vue-cli创建了一个项目之后，进到项目里面使用`vue add router`添加路由，或者直接在vue-cli创建项目的时候勾选上Router选项，然后启动项目（当然也可以自己写一遍），这样就是一个用vue-router构建的单页面应用了。可以看到，第一次加载的时候会去请求资源，而在切换路由并没有去重新请求页面，达到更好的体验效果。

![Untitled3.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82c24bb8c3164013a8311769b6bc9f46~tplv-k3u1fbpfcp-watermark.image)
# vue-router
## 1. 介绍
通过上面这个例子对vue-router有了初步的感知，类似于页面之间的跳转，但这里是组件的切换。vue-router的
[官方文档](https://router.vuejs.org/zh/)， Vue.js官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。路由的本质其实是**建立起URL和视图（即组件）之间的映射关系**。
## 2. 具体使用
总的来说，就是将组件注册到路由，并告诉vue router在哪里渲染组件。首先，在router/index.js里面写入路由和组件的映射关系。

```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }，
  {
    path: '/about',
    name: 'About',
    component: About
  }，
  {
    path: '/user',
    name: 'User',
    component: User
  }
]
```
### router-view
路由的出口，在要显示组件的地方写入`<router-view></router-view>`，路由匹配到的组件将会显示在这里。例如，现在匹配到的路由是"/"，根据路由和组件的映射关系，应当显示的是Home组件，那么Home组件就会被显示在router-view标签里面。同理，如果匹配到的路由是"/about"，就会在router-view标签里面显示About组件。

App.vue

```html
  <div id="app">
    <div id="nav">
      <router-view></router-view>
    </div>
  </div>
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2502d05a1e043a49f9804ccd81ed6b3~tplv-k3u1fbpfcp-watermark.image)
### 动态路由
有时候我们需要对路由参数的变化做出响应，这时候就需要使用到动态路由。使用方法，将routes里面的路由改成动态路由，例如"user/:id"，那么在路由匹配的时候，只要匹配到了这个路由，就可以展示相应的内容。并且我们可以通过`$route`对象拿到后面的动态参数。除此之外，还可以使用`$route.query`获取queryString,`$route.hash`获取哈希里面的内容。

router/index.js

```js
const routes = [
  {
    path: "/user/:id",
    name:"User",
    component: User
  }
];
```
User.vue

```html
 <template>
  <div class="user">
    <h1>user {{$route.params.id}} {{$route.query.age}} {{$route.hash}}</h1>
  </div>
</template>
```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd4763482ab844f1a51fcc10d50f2639~tplv-k3u1fbpfcp-watermark.image)

注意：
- 当使用了动态路由，必须携带路由参数，否则匹配不到
- 关于路由的匹配规则，参考[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
- 当多个路由同时匹配上时，以先定义的为准，忽略后面的.
### 路由组件传参
在组件中使用`$route`会使之与其对应的理由形成高度耦合，从而使组件只能在某些特定的URL上使用，限制了其灵活性。使用 props 可以将组件和路由对象解耦，在组件内部不用到`$route`。

router/index.js
```js
const routes = [
  {
    path: "/user/:id",
    name:"User",
    component: User,
    props:true
  }
];
```
User.vue

```html
<template>
  <div class="user">
    <h1>user {{id}}</h1>
  </div>
</template>

<script>
export default {
  props: ["id"],
};
</script>
```
### 嵌套路由
显示生活中的页面通常是很多层组件嵌套而成的，URL中各段动态路径按某种结构对应嵌套的各层组件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4512c7a471e42deb388b76414150340~tplv-k3u1fbpfcp-watermark.image)
vue-router也提供了动态路由的配置

router/index.js

```js
const routes = [
  {
    path: "/user",
    name:"User",
    component: User,
    children:[
      {
        path:"foo",
        component: Foo
      },
      {
        path:"bar",
        component:Bar
      }
    ]
  }
];
```
User.vue

```html
<template>
  <div class="user">
    <h1>User</h1>
    <router-view></router-view><!--显示匹配到的嵌套组件-->
  </div>
</template>
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3045d73823f34cf6b777e8f0285f79ce~tplv-k3u1fbpfcp-watermark.image)
### 命名视图
类似于具名插槽，在`router-view`中设置`name`，根据名字将匹配到的组件进行显示。

router/index.js

```js
const routes = [
  {
    path: "/",
    components: {
      default : Home,
      foo : Foo,
      bar : Bar
    }
  }
];
```
App.vue

```html
<div id="app">
    <div id="nav">
      <router-view></router-view><!--没有设置就是default-->
      <router-view name="foo"></router-view>
      <router-view name="bar"></router-view>
    </div>
</div>
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58aa016507d7463a9d1a847e5ecc0125~tplv-k3u1fbpfcp-watermark.image)
### 重定向和别名

```js
const routes = [
  {
    path:"/home",
    // 重定向
    redirect:"/"
  },
  {
    path: "/",
    name: "Home",
    // 别名
    alias: '/root',
    component: Home,
  }
}
```
两者的区别：重定向URL会改变，别名不会
### router-link声明式导航
在router-link的to属性里面写上路由，通过创建a标签来定义导航链接，点击链接就会显示该路由所绑定的组件。

App.vue
```html
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/user">User</router-link>
    </div>
    <router-view />
  </div>
```

![2.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/231dca1a6950459088e1f29b5059f71c~tplv-k3u1fbpfcp-watermark.image)

### 编程式导航
上面使用到的router-link实际上是通过创建a标签来定义导航链接，除此之外，我们还可以使用编程式导航。用`$router`对象来控制，提供了很多方法
- push 添加组件
- replace 替换组件
- back 回退

Home.vue

```html
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="handleClick">to foo</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    handleClick() {
      this.$router.push(
        {
          path:"/user/foo"
        }
      )
    }
  },
};
</script>
```
Foo.vue

```html
<template>
    <div>
        Foo
        <button @click="handleBack">back</button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleBack() {
                this.$router.back();
            }
        },
    }
</script>
```

![Jun-19-2021 19-43-21.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/052f0ca192524f33b841e6cfcf1af699~tplv-k3u1fbpfcp-watermark.image)
### 命名路由
通过路由名称进行导航，例如上面的

```js
this.$router.push(
    {
      path:"/user/foo"
    }
)
```
可以改成
```js
this.$router.push(
    {
      name:"Foo"
    }
)
```
但是要给`"/user/foo"`这个路由命名为`"Foo"`，跟上面是一样的效果，命名路由的好处，name一旦定义就不会更改，而path是有可能会更改的，并且path有时候会很长。
## 3.两种模式
### hash模式
- 使用URL的hash来模拟一个完整的URL,于是当URL改变的时候,页面不会重新加载,也就是单页应用了,当#后面的hash发生变化,不会导致浏览器向服务器发出请求,浏览器不发出请求就不会刷新页面,并且会触发hasChange这个事件,通过监听hash值的变化来实现更新页面部分内容的操作
- 缺点：丑
### history模式
主要使用HTML5的pushState()和replaceState()这两个api来实现的,pushState()可以改变url地址且不会发送请求,replaceState()可以读取历史记录栈,还可以对浏览器记录进行修改
- window.history.pushState(stateObject, title, URL)
- window.history.replaceState(stateObject, title, URL)
- 需要后端配置
