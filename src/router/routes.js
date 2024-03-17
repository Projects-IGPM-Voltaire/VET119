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
      {
        path: 'services',
        name: 'services-page',
        component: () => import('pages/ServicesPage.vue'),
      }
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
    path: '/forgot-password',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'enter-email',
        name: 'forgot-email-page',
        component: () => import('pages/ForgotPasswordPage.vue'),
      },
      {
        path: 'enter-otp',
        name: 'forgot-otp-page',
        component: () => import('pages/ForgotPasswordOTPPage.vue'),
      },
      {
        path: 'enter-new-password',
        name: 'forgot-newpass-page',
        component: () => import('pages/ForgotPasswordNewPassPage.vue'),
      },
    ],
  },
  {
    path: '/about-us',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'about-us-page',
        component: () => import('pages/AboutUs.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard-page',
        component: () => import('pages/UserDashboardPage.vue'),
      },
      {
        path: 'profile',
        name: 'user-profile-page',
        component: () => import('pages/UserProfilePage.vue'),
      },
      {
        path: 'appointments',
        name: 'check-appointments-page',
        component: () => import('pages/CheckAppointmentsPage.vue'),
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
          requiresAuth: false,
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
