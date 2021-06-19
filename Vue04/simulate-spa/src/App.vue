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
