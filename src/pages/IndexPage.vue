<template>
  <q-page>
    <template v-if="isAuthenticated">
      <div class="q-pa-sm">
        <h3 class="text-primary q-mb-none">
          Hi, {{ user.first_name }} {{ user.last_name }}
        </h3>
      </div>
    </template>
    <div class="row justify-evenly q-mb-xl q-mx-lg items-center"
                style="height: 70vh;">
      <div class="col-5 q-pa-none bg-grey-5 q-mr-md" style="height: 40vh;">
        <q-img :src="DLSAUImage" fit="contain" />
      </div>
      <div class="col-6 column justify-start text-left">
        <h3 class="text-weight-bold text-primary q-mb-md q-pl-md">
          Welcome to VET 119!
        </h3>
        <p class="text-body1 q-pl-md text-weight-medium text-italic text-accent">
        Enhancing Pet Health Management through a<br/>Streamlined Digital
        Appointment System
        </p>
        <p class="text-body1 q-pl-md q-mt-xl">
          This website aims to implement a new digital queuing system in veterinary clinics, with features aimed at streamlining
          reservation, reception and appointment management with the goal of enhancing convenience for pet owners and clinical staff.
        </p>
      </div>
    </div>
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
import DLSAUImage from '../assets/dlsau-bg.png';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
</script>
