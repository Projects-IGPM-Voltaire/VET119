<template>
  <q-page>
    <template v-if="isAuthenticated">
      <div class="q-pa-sm">
        <h3 class="text-primary q-mb-none">
          Hi, {{ user.first_name }} {{ user.last_name }}
        </h3>
      </div>
    </template>
    <template v-if="!isAuthenticated">
      <div class="text-center">
        <h3 class="text-weight-medium q-mb-md">
          Welcome to
          <span class="text-weight-bold text-primary"
            >MediQueue
            <q-avatar class="q-ml-xs" size="5rem">
              <img :src="LogoSmall" /> </q-avatar
          ></span>
        </h3>
        <q-btn
          color="primary"
          class="text-weight-bold text-capitalize"
          size="lg"
          unelevated
          :to="{ name: 'login-page' }"
          >Schedule a Meeting</q-btn
        >
      </div>
      <AboutUsWindow />
    </template>
    <HomeServicesBanner v-if="isAuthenticated" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>

<script setup>
import { useAuthStore } from 'stores/auth';
import { computed } from 'vue';
import AboutUsWindow from 'components/AboutUsWindow.vue';
import HomeServicesBanner from 'components/HomeServicesCard.vue';
import LogoSmall from '../assets/mediqueue-small-logo.png';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
</script>
