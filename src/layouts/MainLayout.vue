<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'login-page' }"
            class="text-white text-bold"
            >MediQueue</router-link
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

          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="onLogout">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <template v-else>
          <q-btn
            dense
            color="primary"
            unelevated
            class="q-mr-md text-capitalize"
            :to="{ name: 'login-page' }"
            >Login</q-btn
          >
          <q-btn
            dense
            color="primary"
            unelevated
            class="q-mr-md text-capitalize"
            :to="{ name: 'register-page' }"
            >Register</q-btn
          >
        </template>
      </q-toolbar>
    </q-header>

    <q-page-container>
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});
const user = computed(() => {
  return authStore.user;
});

const onLogout = () => {
  router.push({ name: 'login-page' });
  authStore.destroySession();
};
</script>
