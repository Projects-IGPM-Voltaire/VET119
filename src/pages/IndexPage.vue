<template>
  <q-page>
    <template v-if="isAuthenticated">
      <h3 class="text-primary q-mb-none">
        Hi, {{ user.first_name }} {{ user.last_name }}
      </h3>
    </template>
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
import { computed, onMounted, ref } from 'vue';
import AboutUsWindow from 'components/AboutUsWindow.vue';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
</script>
