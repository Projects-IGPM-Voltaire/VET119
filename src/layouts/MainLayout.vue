<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'home-page' }"
          >
            <q-avatar> <img :src="LogoSmall" /> </q-avatar>
            <span class="text-weight-bold text-white"
              >MediQueue</span
            ></router-link
          >
        </q-toolbar-title>
        <q-space></q-space>
        <template v-if="isAuthenticated">
          <q-btn
            dense
            color="primary"
            unelevated
            class="q-mr-md text-capitalize"
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
          <q-btn
            dense
            color="primary"
            unelevated
            class="q-mr-md text-capitalize"
            :to="{ name: 'about-us-page' }"
            >About Us</q-btn
          >
        </template>
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

    <q-footer
      class="bg-primary q-py-lg q-px-lg"
      style="position: absolute !important"
    >
      <div class="row q-col-gutter">
        <div class="col-12 col-md-4">
          <div>
            <router-link
              style="text-decoration: none"
              :to="{ name: 'home-page' }"
            >
              <q-avatar> <img :src="LogoSmall" /> </q-avatar>
              <span class="text-weight-bold text-h6 text-white"
                >MediQueue</span
              ></router-link
            >
          </div>
          <div class="row q-col-gutter">
            <div class="col-4">
              <router-link
                style="text-decoration: none"
                :to="{ name: 'home-page' }"
              >
                <span class="text-weight-bold text-white"
                  >Home</span
                ></router-link
              >
            </div>
            <div class="col-4">
              <router-link
                style="text-decoration: none"
                :to="{ name: 'login-page' }"
              >
                <span class="text-weight-bold text-white"
                  >Login</span
                ></router-link
              >
            </div>
            <div class="col-4">
              <router-link
                style="text-decoration: none"
                :to="{ name: 'register-page' }"
              >
                <span class="text-weight-bold text-white"
                  >Register</span
                ></router-link
              >
            </div>
          </div>
          <div class="q-py-lg text-body2">
            <div class="q-mb-sm">
              EMAIL:
              <span class="text-weight-bold">mediqueue.pr2@gmail.com</span>
            </div>
            <div>
              TELEPHONE:
              <div class="text-weight-bold">0927-134-1205 (Isaac Melgar)</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8"></div>
      </div>
      <div class="text-center">
        <p class="q-my-none text-white">
          @2024 MediQueue. All rights reserved.
        </p>
      </div>
    </q-footer>
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
import LogoSmall from '../assets/mediqueue-small-logo.png';

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
