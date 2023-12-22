<template>
  <q-page padding>
    <HomeLandingBanner v-if="!isAuthenticated" />
    <HomeServicesBanner v-if="isAuthenticated" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HomeLandingBanner from 'components/HomeLandingBanner.vue';
import HomeServicesBanner from 'components/HomeServicesCard.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { HomeServicesBanner, HomeLandingBanner },
});
</script>

<script setup>
import { useAuthStore } from 'stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>
