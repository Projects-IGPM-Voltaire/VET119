import { route } from 'quasar/wrappers';
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'stores/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const authStore = useAuthStore();
  Router.beforeEach((to, from, next) => {
    authStore.validateSession();
    const { isAuthenticated, user } = authStore;
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (
        !isAuthenticated ||
        !to.matched.some((record) => record.meta.level === user.level)
      ) {
        next({ name: 'login-page' });
      } else {
        next();
      }
    } else {
      if (isAuthenticated) {
        if (isAuthenticated) {
          if (to.name === 'home-page') {
            if (user.level === 'admin') {
              next({ name: 'admin-users-page' });
            } else if (user.level === 'guest') {
              next({ name: 'dashboard-page' });
            } else {
              next();
            }
          } else if (to.name === 'login-page' || to.name === 'register-page') {
            if (user.level === 'admin') {
              next({ name: 'admin-dashboard-page' });
            } else if (user.level === 'guest') {
              next({ name: 'dashboard-page' });
            } else {
              next();
            }
          } else {
            next();
          }
        } else {
          next();
        }
      }
    }
    next();
  });

  return Router;
});
