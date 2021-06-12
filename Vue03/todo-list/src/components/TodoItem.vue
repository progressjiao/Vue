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