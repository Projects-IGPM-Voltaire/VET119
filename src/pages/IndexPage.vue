<template>
  <q-page padding>
    <HomeLandingBanner />
    <HomeServicesBanner />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import HomeLandingBanner from "components/HomeLandingBanner.vue";
import HomeServicesBanner from "components/HomeServicesCard.vue";

export default defineComponent({
  name: "IndexPage",
  components: { HomeServicesBanner, HomeLandingBanner },
});
</script>
