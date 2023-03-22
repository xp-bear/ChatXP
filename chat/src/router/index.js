import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";

import { Message } from "element-ui";

Vue.prototype.$mg = Message;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 解决路由守卫重定向跳转问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

// 路由守卫
router.beforeEach((to, from, next) => {
  // 此处进行鉴权操作
  let cipher;
  if (localStorage.getItem("cipher") != undefined) {
    cipher = localStorage.getItem("cipher");
  } else {
    cipher = "";
  }

  if (!cipher) {
    if (to.path === "/") {
      next(); // 系统根路由
    } else {
      Vue.prototype.$mg({
        showClose: true,
        message: "您还没有核对暗号,请先核对暗号!",
        duration: 2000,
        type: "error",
      });
      setTimeout(() => {
        next("/");
      }, 2000);
    }
  } else {
    next();
  }
});

export default router;
