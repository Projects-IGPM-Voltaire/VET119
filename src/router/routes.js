const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home-page',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login-page',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },

  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'register-page',
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard-page',
        component: () => import('pages/admin/DashboardPage.vue'),
        meta: {
          requiresAuth: true,
          level: 'admin',
        },
      },

      {
        path: 'health-center',
        name: 'superadmin-health-centers-page',
        component: () => import('pages/superadmin/HealthCenterPage.vue'),
        meta: {
          requiresAuth: true,
          level: 'superadmin',
        },
      },

      {
        path: 'user',
        name: 'admin-users-page',
        component: () => import('pages/admin/UserPage.vue'),
        meta: {
          requiresAuth: true,
          level: 'admin',
        },
      },

      {
        path: 'schedule',
        name: 'admin-schedules-page',
        component: () => import('pages/admin/SchedulePage.vue'),
        meta: {
          requiresAuth: true,
          level: 'admin',
        },
      },

      {
        path: 'system',
        name: 'admin-system-page',
        component: () => import('pages/admin/SystemPage.vue'),
        meta: {
          requiresAuth: true,
          level: 'admin',
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
