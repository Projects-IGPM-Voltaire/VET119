<template>
  <div class="row q-mb-xl q-col-gutter-md">
    <div class="col-7">
      <div class="q-py-sm">
        <p class="text-subtitle1 text-bold q-mb-xs">WELCOME</p>
        <h1 class="text-h4 text-bold text-primary q-mt-none q-mb-xs">
          Welcome to Mediqueue
        </h1>
        <h1 class="text-h4 text-bold q-mt-none q-mb-xl">
          Healthcare App You can Trust.
        </h1>
        <p class="q-mt-none q-mb-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
          architecto facere iste neque nobis odio perferendis perspiciatis sint
          suscipit voluptates?
        </p>
        <div class="flex justify-start">
          <q-btn color="primary" class="text-capitalize q-mr-sm" unelevated
            >Book <span class="text-lowercase q-pl-xs">now</span></q-btn
          >
          <q-btn color="primary" outline class="text-capitalize"
            >More info</q-btn
          >
        </div>
      </div>
    </div>
    <div class="col-5">
      <div class="">
        <q-card>
          <q-carousel swipeable animated v-model="slide" infinite>
            <q-carousel-slide :name="1" :img-src="DoctorWithPatientImage" />
          </q-carousel>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeLandingBanner",
});
</script>

<script setup>
import DoctorWithPatientImage from "../assets/doctor-with-patient.jpg";
import { ref } from "vue";

const slide = ref(1);
</script>
