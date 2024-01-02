<template>
  <div>
    <!--
    <div class="row q-mb-xl q-col-gutter-md">
      <div class="col-7">
        <div class="q-py-sm">
          <p class="text-subtitle1 text-bold q-mb-xs">WELCOME TO</p>
          <h1 class="text-h4 text-bold text-primary q-mt-none q-mb-xs">
            MediQueue
          </h1>
          <h1 class="text-h4 text-bold q-mt-none q-mb-xl">
            Healthcare platform You can Trust.
          </h1>
          <p class="q-mt-none q-mb-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            architecto facere iste neque nobis odio perferendis perspiciatis
            sint suscipit voluptates?
          </p>
          <div class="flex justify-start">
            <q-btn
              color="primary"
              class="text-capitalize q-mr-sm"
              :to="{ name: 'login-page' }"
              >Login <span class="text-lowercase q-pl-xs q-pr-sm">now</span
              ><q-icon name="arrow_right_alt"></q-icon
            ></q-btn>
            <q-btn
              color="primary"
              outline
              class="text-capitalize"
              :to="{ name: 'register-page' }"
              >Register
              <span class="text-lowercase q-pl-xs q-pr-sm">here</span></q-btn
            >
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="">
          <q-card flat>
            <q-carousel swipeable animated v-model="slide" infinite>
              <q-carousel-slide :name="1" :img-src="DoctorWithPatientImage" />
            </q-carousel>
          </q-card>
        </div>
      </div>
    </div>

-->
    <AboutUsWindow />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeLandingBanner',
});
</script>

<script setup>
import DoctorWithPatientImage from '../assets/doctor-with-patient.jpg';
import { computed, ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import AboutUsWindow from 'components/AboutUsWindow.vue';

const authStore = useAuthStore();

const slide = ref(1);

const isAuth = computed(() => authStore.isAuthenticated);
</script>
