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