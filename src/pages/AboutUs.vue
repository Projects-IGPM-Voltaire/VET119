<template>
  <q-page>
    <AboutUsWindow />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AboutUsPage',
  components: {},
});
</script>

<script setup>
import AboutUsWindow from 'components/AboutUsWindow.vue';
</script>
