<template>
  <q-page class="row q-py-xl" style="background: rgba(251,255,254,70);">
    <div style="margin-left: 30vw;" class="column justify-start items-start text-left">
      <h4 class="q-mt-md q-mb-lg q-pl-md text-weight-bold text-capitalize text-primary">Services</h4>
      <ul class="q-ml-none text-body1">
        <li class="q-mb-md" v-for="(v,k) in services" v-bind:key="k">
          {{ v.desc }}
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "ServicesPage",
  });
</script>
<script setup>
  const services = [
    { desc: 'consultation and pharmacy'},
    { desc: 'vaccination and deworming'},
    { desc: 'laboratory pharmacy'},
    { desc: 'CBC, blood profile, test kits, etc.'},
    { desc: 'x-ray and ultrasound'},
    { desc: 'surgeries and confinement'},
  ];
</script>
