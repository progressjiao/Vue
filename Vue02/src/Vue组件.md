# 1. 如何注册一个组件？
## （1）全局注册Vue.component

```html
<div id="app"></div>
<script>
    // 1. 全局注册
    Vue.component("Foo",{
        template:`<div>Foo</div>`
    })
    const app = new Vue({
        el:"#app",
        data:{
            msg:'hello vue!'
        },
        template:`<div>
            123{{msg}}
            <Foo></Foo>
        </div>` 
    })
</script>
```

## （2）局部注册，components属性

```html
<div id="app"></div>
<script>
    const Foo = {
        template:`<div>Foo</div>`
    }
    const app = new Vue({
        el:"#app",
        data:{
            msg:'hello vue!'
        },
        components: {
            Foo,
        },
        template:`<div>
            123{{msg}}
            <Foo></Foo>
        </div>` 
    })
</script>
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdc0122cb96943ea88ae1b1096eea4da~tplv-k3u1fbpfcp-watermark.image)

**注意：**
- 组件的template属性里面可以写入组件的视图
- 全局注册的组件在哪里都可以直接以标签引入的方式直接使用，而局部注册的组件只能在注册了该组件的组件里面使用，在其他组件里面使用会报错（未注册）
- 在一个组件里面，只能有一个根节点，（Vue3允许有多个）
- **组件里面的data属性必须是一个函数**，返回一个对象，而不是直接的一个对象。原因是，组件是可以复用的，而对象是一个引用类型，如果不返回一个全新的对象，如果在某一个组件里面data被修改了，可能会影响到别的组件也发生改变，将data写成函数的形式，每次返回一个全新的对象，那么组件之间的data就不是同一个data，就隔离开了。
# 2. 组件的生命周期
Vue 一共有8个生命阶段，分别是创建前、创建后、加载前、加载后、更新前、更新后、销毁前和销毁后，每个阶段对应了一个生命周期的钩子函数。
- `beforeCreate` 钩子函数，在实例初始化之后，在数据监听和事件配置之前触发。因此在这个事件中我们是获取不到 data 数据的。
- `created` 钩子函数，在实例创建完成后触发，此时可以访问 data、methods 等属性。但这个时候组件还没有被挂载到页面中去，所以这个时候访问不到 $el 属性。一般我们可以在这个函数中进行一些页面初始化的工作，比如通过 ajax 请求数据来对页面进行初始化。
- `beforeMount` 钩子函数，在组件被挂载到页面之前触发。在 beforeMount 之前，会找到对应的 template，并编译成 render 函数。
- `mounted` 钩子函数，在组件挂载到页面之后触发。此时可以通过 DOM API 获取到页面中的 DOM 元素。
- `beforeUpdate` 钩子函数，在响应式数据更新时触发，发生在虚拟 DOM 重新渲染和打补丁之前，这个时候我们可以对可能会被移除的元素做一些操作，比如移除事件监听器。
- `updated` 钩子函数，虚拟 DOM 重新渲染和打补丁之后调用。
- `beforeDestroy` 钩子函数，在实例销毁之前调用。一般在这一步我们可以销毁定时器、解绑全局事件等。
- `destroyed` 钩子函数，在实例销毁之后调用，调用后，Vue 实例中的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

```js
// 子组件的子组件
const Bar = {
    template:`<div>bar</div>`
}

// 局部注册的子组件
const Foo = {
    data() {
        return {
            msg: "Foo",
            count:1
        }
    },
    components: {
        Bar,
    },
    beforeCreate () {
        // 创建之前调用，一般很少用到
        console.log('beforeCreate');;
    },
    created () {
        // 用于请求后端接口来获取数据
        // 可以结合async和await来使用
        console.log('created');
        console.log(this.$el); // undefined
    },
    beforeMount () {
        // 挂载之前
        console.log('beforeMounted');
    },
    mounted () {
        // 渲染完成了
        console.log('mounted');
        console.log(this.$el); // Vue 实例使用的根 DOM 元素。
    },
    beforeUpdate () {
        // 更新之前
        console.log('beforeUpdate');
    },
    updated () {
        // 更新完成了
        console.log('updated');
    },
    beforeDestroy () {
        // 销毁之前
        console.log('beforeDestory');
    },
    destroyed () {
        // 销毁完成，移除一些事件的监听
        console.log('destoryed');
    },
    template:`<div>{{msg}} --- {{count}}
        <button @click="count++">click</button>
        <Bar></Bar></div>`
}

//根组件
const app = new Vue({
    el:"#app",
    data:{
        msg:'hello vue!',
        showFoo:true
    },
    components: {
        Foo
    },
    methods: {
        handleShowfoo() {
            this.showFoo = !this.showFoo;
        }
    },
    template:`<div>
        {{msg}}
        <button @click="handleShowfoo">showFoo</button>
        <Foo v-if="showFoo"></Foo>
    </div>` 
})
```
- 初始情况下，触发前4个钩子函数，组件处于挂载完成的阶段，如果有多个组件的顺序：父组件beforeCreate->父组件created->父组件beforeMounted->子组件beforeCreate->子组件created->子组件beforeMounted->子组件mounted->父组件mounted，销毁的时候依次触发父组件beforeDestory->子组件beforeDestory->子组件destoryed->父组件destoryed
- 当数据发生改变的时候（点击按钮click），触发beforeUpdate和updated，每次改变都会触发，更新的操作是在updated里面完成的，beforeUpdate这个时候的视图还是更新之前的
- 当通过v-if设置为false的时候，触发beforeDestory和destoryed，涉及到组件的销毁

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e44002403de6487391e3bef2330a8452~tplv-k3u1fbpfcp-watermark.image)
# 3. Props给组件传参
- props相当于组件的输入
- 定义类型 `type`指定传参的类型，如果类型不对会报错；`:message = '1'`传入的是数值类型的1
- 定义默认值 `default`当没有传参数的时候取得这个默认值；
- 可定义必须值 `required:true`表明这个参数是必传的；
- 可自定义校验规则validator
- props是**单向数据流**，传过来的数据是不能被修改的

```js
// 在Foo组件中定义props
props: {
    message: {
        type: String,
        default: "hello"
    },
}

// 使用props，以属性的形式传入
<Foo message = 'hhh'></Foo>
```
# 4. emit发出事件（自定义事件）
- 相当于组件的输出
- 这里的需求是：Bar能够控制自己的关闭，但是控制Bar是否关闭的showBar在父组件Foo里面，所以Bar要发出事件close然后在父组件Foo中处理

```js
const Bar = {
    methods: {
        handleClick() {
            // 发出事件并可以传参数
            this.$emit('hello', 1, 3);
        },
        handleClose() {
            this.$emit('close');
        }
    },
    template:`<div>Bar
        <button @click="handleClick">to Foo</button>    
        <button @click="handleClose">close</button>
    </div>`
}

const Foo = {
    data() {
        return {
            msg: "Foo",
            showBar: true
        }
    },
    components: {
        Bar,
    },
    methods: {
        handleHello(a, b) {
            // 这里可以接收参数
            console.log('hello', a, b)
        },
        handleClose() {
            this.showBar = false;
        },
        handleShowBar() {
            this.showBar = true;
        }
    },
    // 在Bar里处理发出的事件hello和close
    template:`<div>{{msg}}
        <button @click="handleShowBar">show bar</button>
        <Bar v-show="showBar" @hello="handleHello" @close="handleClose"></Bar></div>`
}

//根组件
const app = new Vue({
    el:"#app",
    data:{
        msg:'hello vue!',
        showFoo:true
    },
    components: {
        Foo
    },
    methods: {
        handleShowfoo() {
            this.showFoo = !this.showFoo;
        }
    },
    template:`<div>
        {{msg}}
        <Foo></Foo>
    </div>` 
})
```
# 5. 自定义组件的v-model
- 利用v-model的双向绑定机制
- [自定义组件的v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

```js
const Bar = {
    model: {
        prop: "visible",
        event: "close"
    },
    props:["visible"],
    template:`<div v-show="visible">Bar   
        <button @click="$emit('close',false)">close</button>
    </div>`
}

const Foo = {
    data() {
        return {
            msg: "Foo",
            showBar: true
        }
    },
    components: {
        Bar,
    },
    methods: {
        handleShowBar() {
            this.showBar = true;
        }
    },
    // v-model自动把值传给visible
    template:`<div>{{msg}}
        <button @click="handleShowBar">show bar</button>
        <Bar v-model="showBar"></Bar></div>`
}
```
- showBar控制Bar的显示和隐藏，一开始为true，在Bar里面点击close按钮之后，修改visible的值为false，通过v-model的双向绑定将visible的值自动绑定到showBar，实现Bar的隐藏。
- 可以用sync代替，将Bar的template里面的emit事件改成`"$emit('update:visible',false)"`，在使用Bar组件的地方改成`<Bar :visible.sync="showBar"></Bar>`
# 6. 插槽——内容分发
可以在自定义的组件中添加模板代码，并在注册组件的时候在template里面加入<slot>元素，这样的话组件渲染的时候，`<slot></slot>`里面的内容会被替换成添加的代码模板。但是当该组件的template里面没有slot元素时，该组件起始标签和结束标签的任何内容就会被抛弃。

```js
const Foo = {
    data() {
        return {
            msg: "Foo"
        }
    },
    components: {
        Bar,
    },
    // 在slot中可以加入后备内容，当组件标签中没有写入内容时显示这个
    template:`<div>{{msg}}<slot>default</slot>
        <Bar></Bar></div>`
}

//根组件
const app = new Vue({
    el:"#app",
    data:{
        msg:'hello vue!',
    },
    components: {
        Foo
    },
    template:`<div>
        {{msg}}
        <Foo>这里是插槽内容</Foo>
    </div>` 
})
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01d9dedd92bd4d2a966262ee77ba839f~tplv-k3u1fbpfcp-watermark.image)
## 具名插槽

```js
const Foo = {
    data() {
        return {
            msg: "Foo"
        }
    },
    components: {
        Bar,
    },
    template:`<div>{{msg}}
        <h1>
            <slot name = "h1"></slot>    
        </h1>
        <slot>default</slot>
        <Bar></Bar></div>`
}

//根组件
const app = new Vue({
    el:"#app",
    data:{
        msg:'hello vue!',
    },
    components: {
        Foo
    },
    template:`<div>
        {{msg}}
        <Foo>
            <template v-slot:h1>
                这里是插入的h1
            </template>
            haha
        </Foo>
    </div>` 
})
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/630c0f9f9602427799cfc747eafd59f6~tplv-k3u1fbpfcp-watermark.image)

可以给插槽指定名字，对应的内容插在对应的插槽里，如果没有指定就是默认插槽，“haha”被插在没有指定名称的插槽里。其中`v-slot:h1`可以简写成`#h1`
## 作用域插槽

```js
const Foo = {
    data() {
        return {
            msg_foo: "Foo", 
            count: 1
        }
    },
    components: {
        Bar,
    },
    template:`<div>{{msg_foo}}
        <h1>
            <slot name = "h1" :msg_foo="msg_foo" :count = "count"></slot>    
        </h1>
        <slot>default</slot>
        <Bar></Bar></div>`
}

//根组件
const app = new Vue({
    el:"#app",
    data:{
        msg:'hello vue!',
    },
    components: {
        Foo
    },
    template:`<div>
        {{msg}}
        <Foo>
            <template v-slot:h1="data" >
                这里是插入的h1 {{data}}
            </template>
            haha
        </Foo>
    </div>` 
})
```
如果在插槽中使用子组件的数据，例如要访问Foo中的msg_foo，直接在根组件里面是访问不到的，那么可以在子组件的slot元素中绑定属性，注意属性可以绑定多个，然后在父组件中通过一个对象去进行接收，（上例中的data），也可以通过解构拿到Foo中特定属性的值。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e61658be78b4c9a926b6826bf516d35~tplv-k3u1fbpfcp-watermark.image)
# 7. 复用性
通过mixin将复用逻辑抽离出来，可以在多个组件内使用，这个例子是：实现多个组件都能显示当前鼠标所在的坐标

```js
const mousemoveMixin = {
    data() {
        return {
            x:0,
            y:0
        }
    },
    methods: {
        handleMousemove(e) {
            this.x = e.pageX;
            this.y = e.pageY;
        }
    },
    created () {
        window.addEventListener("mousemove", this.handleMousemove);
    },
    destroyed() {
        window.removeEventListener("mousemove", this.handleMousemove);
    },
}

const Bar = {
    mixins:[mousemoveMixin],
    template:`<div>
        Bar {{x}} -- {{y}}  
    </div>`
}

const Foo = {
    data() {
        return {
            msg_foo: "Foo", 
        }
    },
    components: {
        Bar,
    },
    mixins: [mousemoveMixin],
    template:`<div>Foo {{x}} -- {{y}}
        <Bar></Bar></div>`
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08ff8eec750b4049b1715e0014c3d250~tplv-k3u1fbpfcp-watermark.image)
- mixins是一个数组，能够包含多个mixin
- 多个mixin会造成来源不清晰和命名冲突问题，假设还有一个mixin里面还有属性x和y，那么我们就不清楚到底是哪个mixin提供给我们的x和y了

