const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home-page",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "login",
        name: "login-page",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register",
        name: "register-page",
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
