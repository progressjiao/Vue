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
          // path:"/user/foo"
          name: "Foo"
        }
      )
    }
  },
};
</script>
