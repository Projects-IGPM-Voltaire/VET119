<template>
  <ScheduleAppointmentDialog v-model:open="schedOpen"/>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary-50">
      <q-toolbar>
        <div class="row items-center">
          <q-toolbar-title class="row inline">
            <router-link
              class="row inline"
              style="text-decoration: none"
              :to="{ name: 'home-page' }"
            >
              <q-avatar class="q-avatar-right q-mr-md" square size="3rem"
                ><q-img
                  :fit="scale - down"
                  style="max-width: 3rem; height: 3rem; width: 2.5rem"
                  :src="LogoSmall"
              /></q-avatar>
              <span class="text-weight-bolder text-h4 text-primary"
                >VET 119</span
              ></router-link
            >
          </q-toolbar-title>
          <template v-if="isAuthenticated">
            <q-btn
              dense
              color="primary-50"
              unelevated
              class="q-mx-lg q-my-md q-pa-md text-weight-bold text-uppercase text-base"
              :to="{ name: 'dashboard-page' }"
              >Dashboard</q-btn
            >
            <q-btn
              dense
              color="primary-50"
              unelevated
              class="q-mx-lg q-my-md q-pa-md text-weight-bold text-uppercase text-base"
              :to="{ name: 'user-profile-page' }"
              >Our Services</q-btn
            >
            <q-btn
              dense
              color="primary-50"
              unelevated
              class="q-mx-lg q-my-md q-pa-md text-weight-bold text-uppercase text-base"
              :to="{ name: 'home-page' }"
              >About Us</q-btn
            >
          </template>
          <template v-else>
            <q-btn
              dense
              color="light"
              unelevated
              class="q-mx-lg q-my-md q-pa-md text-weight-bold text-uppercase text-base"
              :to="{ name: 'home-page' }"
              >Home</q-btn
            >
            <q-btn
              dense
              color="primary-50"
              unelevated
              class="q-mx-lg q-my-md q-pa-md text-weight-bold text-uppercase text-base"
              :to="{ name: 'home-page' }"
              >Services</q-btn
            >
          </template>
        </div>
        <q-space></q-space>
        <template v-if="isAuthenticated">
          <q-btn
            dense
            color="light"
            unelevated
            class="q-mr-md q-pa-sm text-capitalize"
            :to="{ name: 'user-profile-page' }"
          >
            <q-icon name="person" color="base" size="2rem" />
          </q-btn>
        </template>
        <template v-else>
          <q-btn
            dense
            color="primary-50"
            unelevated
            class="q-mx-md q-my-md q-pa-md text-weight-bold text-uppercase text-base"
            :to="{ name: 'login-page' }"
            >Login</q-btn
          >
          <q-btn
            dense
            color="primary-50"
            unelevated
            class="q-mr-md q-my-md q-pa-md text-weight-bold text-uppercase text-base"
            :to="{ name: 'register-page' }"
            >Register</q-btn
          >
        </template>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view @sched="schedOpen=true"/>
    </q-page-container>

    <q-footer
      class="bg-primary q-py-lg q-px-lg"
      style="position: absolute !important"
    >
      <div
        class="row justify-around items-start content-stretch q-gutter-lg q-py-lg"
      >
        <div class="q-col-gutter-lg column flex-center">
          <router-link
            class="column flex-center"
            style="text-decoration: none"
            :to="{ name: 'home-page' }"
          >
            <q-img :src="LogoSmall" :fit="scale - down" />
            <span class="text-weight-bolder text-h4 text-white"> VET 119 </span>
          </router-link>
        </div>
        <div class="q-col-gutter-xl column">
          <div class="q-col-gutter-md column">
            <router-link
              style="text-decoration: none"
              :to="{ name: 'dashboard-page' }"
            >
              <span class="text-weight-bold text-subtitle2 text-white">
                Dashboard
              </span>
            </router-link>
            <router-link
              style="text-decoration: none"
              :to="{ name: 'home-page' }"
            >
              <span class="text-weight-bold text-subtitle2 text-white">
                Services
              </span>
            </router-link>
          </div>
          <div class="q-col-gutter-md column">
            <template v-if="isAuthenticated"> </template>
            <template v-else>
              <router-link
                style="text-decoration: none"
                :to="{ name: 'register-page' }"
              >
                <span class="text-weight-bold text-subtitle2 text-white">
                  Create an Account
                </span>
              </router-link>
              <router-link
                style="text-decoration: none"
                :to="{ name: 'login-page' }"
              >
                <span class="text-weight-bold text-subtitle2 text-white">
                  Login
                </span>
              </router-link>
            </template>
          </div>
        </div>
        <div class="q-col-gutter-lg column">
          <span
            style="text-transform: none; cursor: pointer;"
            @click="schedOpen=true"
            class="text-weight-bold text-subtitle2 text-white">
            Book an Appointment
          </span>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'check-appointments-page' }"
          >
            <span class="text-weight-bold text-subtitle2 text-white">
              Your Appointments
            </span>
          </router-link>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'home-page' }"
          >
            <span class="text-weight-bold text-subtitle2 text-white">
              View Clinic Location
            </span>
          </router-link>
        </div>
        <div class="q-col-gutter-lg column col-2">
          <span class="text-weight-bold text-h5 text-white"> Contact Us </span>
          <div class="column">
            <span
              class="text-weight-bold text-subtitle2 text-white text-italic"
            >
              Name of Clinic
            </span>
            <span class="text-subtitle2 text-white text-italic">
              +63 901 234 5678
            </span>
            <span class="text-subtitle2 text-white text-italic">
              email of clinic
            </span>
          </div>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'home-page' }"
          >
            <span class="text-weight-bold text-subtitle2 text-white">
              Proponents
            </span>
          </router-link>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'home-page' }"
          >
            <span class="text-weight-bold text-subtitle2 text-white">
              Developers
            </span>
          </router-link>
        </div>
      </div>
      <!--
      <div class="q-mt-md text-center">
        <p class="q-my-none text-white">
          @2024 VET 119. All rights reserved.
        </p>
      </div>
      -->
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import ScheduleAppointmentDialog from 'components/ScheduleAppointmentDialog.vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';
import LogoSmall from '../assets/vet119-logo-medium.png';

const authStore = useAuthStore();
const router = useRouter();
const schedOpen = ref(false);

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
