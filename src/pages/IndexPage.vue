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
        <h3 class="text-weight-bolder text-primary q-mb-md">
          Welcome to VET 119!
        </h3>
        <p class="text-body1 text-weight-medium text-italic text-accent text-center">
        Enhancing Pet Health Management through a<br/>Streamlined Digital Appointment System
        </p>
      </div>
      <AboutUsWindow />
    </template>
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
