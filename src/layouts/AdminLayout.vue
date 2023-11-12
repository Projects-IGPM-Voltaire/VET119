<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary container">
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'admin-login-page' }"
            class="text-white text-bold"
            >MediQueue Admin</router-link
          >
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn dense color="primary" unelevated class="q-mr-md text-capitalize">
          <q-icon name="account_circle" class="q-mr-xs" />
          <span>Sebastian</span>
        </q-btn>
      </q-toolbar>
      <q-toolbar>
        <template v-for="(navigation, index) in navigations" :key="index">
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<script setup>
import { ref } from "vue";

const navigations = ref([
  {
    label: "Dashboard",
    icon: "dashboard",
    to: { name: "admin-dashboard-page" },
  },
  {
    label: "Health Centers",
    icon: "local_hospital",
    to: { name: "superadmin-health-centers-page" },
  },
  {
    label: "Users",
    icon: "group",
    to: { name: "admin-users-page" },
  },
  {
    label: "Schedules",
    icon: "calendar_month",
    to: { name: "admin-schedules-page" },
  },
  {
    label: "System",
    icon: "settings",
    to: { name: "admin-system-page" },
  },
]);
</script>
