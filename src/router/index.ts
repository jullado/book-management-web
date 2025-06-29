import { createWebHistory, createRouter } from "vue-router";
import Cookies from "js-cookie";

const routes = [
  {
    name: "Management",
    path: "/",
    component: import("../views/Manage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "Signin",
    path: "/signin",
    component: import("../views/Signin.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const cookie = Cookies.get("access_token");

  // ตรวจสอบเส้นทางที่ต้องการการยืนยันตัวตน
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!cookie) {
      next({ name: "Signin" });
    }
  }

  next();
});

export default router;
