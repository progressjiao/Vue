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