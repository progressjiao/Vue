import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import User from "../views/User.vue";
import Foo from "../views/Foo.vue";
import Bar from "../views/Bar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/",
    // name: "Home",
    // component: Home,
    alias: "/root",
    components: {
      default : Home,
      foo : Foo,
      bar : Bar
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    children: [
      {
        path: "foo",
        name: "Foo",
        component: Foo
      },
      {
        path: "bar",
        component: Bar
      }
    ]
  },
  // 动态路由
  {
    path: "/user/:id",
    name: "User",
    component: User,
    // props: true,
    props: (route) => {
      return {
        id: route.params.id + "----------",
        msg: "haha"
      }
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
