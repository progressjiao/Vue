<template>
    <div>
        <!-- User {{$route.params.id}} -->
        User {{id}}
        msg: {{msg}}
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        props:["id", "msg"]
    }
</script>

<style scoped>

</style>