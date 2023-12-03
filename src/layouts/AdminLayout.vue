<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary container">
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'login-page' }"
            class="text-white text-bold"
            >MediQueue Admin</router-link
          >
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn
          dense
          color="primary"
          unelevated
          class="q-mr-md text-capitalize"
          v-if="isAuthenticated"
        >
          <q-icon name="account_circle" class="q-mr-xs" />
          <span>{{ user.first_name }}</span>
        </q-btn>
      </q-toolbar>
      <q-toolbar>
        <template
          v-for="(navigation, index) in filteredNavigations"
          :key="index"
        >
          <q-btn
            dense
            color="primary"
            unelevated
            class="q-mr-md text-capitalize"
            :to="navigation.to"
          >
            <q-icon :name="navigation.icon" class="q-mr-xs" />
            <span>{{ navigation.label }}</span>
          </q-btn>
        </template>
      </q-toolbar>
    </q-header>

    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from 'stores/auth';

const authStore = useAuthStore();

const navigations = ref([
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: { name: 'admin-dashboard-page' },
    level: 'admin',
  },
  {
    label: 'Health Centers',
    icon: 'local_hospital',
    to: { name: 'superadmin-health-centers-page' },
    level: 'superadmin',
  },
  {
    label: 'Users',
    icon: 'group',
    to: { name: 'admin-users-page' },
    level: 'admin',
  },
  {
    label: 'Schedules',
    icon: 'calendar_month',
    to: { name: 'admin-schedules-page' },
    level: 'admin',
  },
  {
    label: 'System',
    icon: 'settings',
    to: { name: 'admin-system-page' },
    level: 'admin',
  },
]);

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});
const user = computed(() => {
  return authStore.user;
});
const filteredNavigations = computed(() => {
  if (!isAuthenticated.value) {
    return [];
  }
  return navigations.value.filter(
    (navigation) => navigation.level === user.value.level
  );
});
</script>
