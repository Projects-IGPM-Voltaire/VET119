<template>
  <q-page class="row justify-center items-start">
    <div
      style="min-width: 50%; max-width: 65%"
      class="column justify-start items-center q-pb-xl"
    >
      <template v-if="isAuthenticated">
        <div class="self-start">
          <h4
            class="q-ml-sm q-mb-sm text-primary text-weight-medium text-capitalize"
          >
            Hi, {{ user.first_name }} {{ user.last_name }}!
          </h4>
        </div>
      </template>
      <div
        class="full-width row q-gutter-xl q-column-gutter-md q-mb-xl q-mt-none"
      >
        <div class="col-5">
          <q-btn
            style="height: 8rem"
            class="column justify-baseline items-start full-width q-py-lg text-left button-shadow"
            color="white"
            @click="$emit('sched')"
          >
            <div
              style="text-align: left; text-transform: none"
              class="column justify-baseline items-start"
            >
              <div class="q-py-0 q-mt-sm row inline">
                <q-icon name="calendar_month" color="accent" />
                <span class="text-bold text-base q-ml-md q-mb-md">Book an
                  Appointment</span>
              </div>
              <p class="text-grey">Schedule a checkup for your pet through VET 119.</p>
            </div>
          </q-btn>
        </div>
        <div class="col-5">
          <q-btn
            style="height: 8rem"
            class="column justify-baseline items-start full-width q-py-lg text-left button-shadow"
            color="white"
            :to="{ name: 'check-appointments-page' }"
          >
            <div
              style="text-align: left; text-transform: none"
              class="column justify-baseline items-start"
            >
              <div class="q-py-0 q-mt-sm row inline">
                <q-icon name="event_available" color="accent" />
                <span class="text-bold text-base q-ml-md q-mb-md">Your
                  Appointments</span>
              </div>
              <p class="text-grey">View your upcoming appointments in VET 119.</p>
            </div>
          </q-btn>
        </div>
        <div class="col-5">
          <q-btn
            style="height: 8rem"
            class="column justify-baseline items-start full-width q-py-lg text-left button-shadow"
            color="white"
            href="https://maps.app.goo.gl/X7wvaRRzND4mFerL6"
          >
            <div
              style="text-align: left; text-transform: none"
              class="column justify-baseline items-start"
            >
              <div class="q-py-0 q-mt-sm row inline">
                <q-icon name="location_on" color="accent" />
                <span class="text-bold text-base q-ml-md q-mb-md">View Location
                of Veterinary Clinic</span>
              </div>
              <p class="text-grey">View partner institution on Google Maps.</p>
            </div>
          </q-btn>
        </div>
        <div class="col-5">
          <q-btn
            style="height: 8rem"
            class="column justify-baseline items-start full-width q-py-lg text-left button-shadow"
            color="white"
            @click="contactDialog=true"
          >
            <div
              style="text-align: left; text-transform: none"
              class="column justify-baseline items-start"
            >
              <div class="q-py-0 q-mt-sm row inline">
                <q-icon name="phone" color="accent" />
                <span class="text-bold text-base q-ml-md q-mb-md">View Contact
                Information</span>
              </div>
              <p class="text-grey">Get in touch with our partner institution to
              answer your questions.</p>
            </div>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="contactDialog">
    <q-card style="width: 700px; max-width: 700px" class="q-px-md q-py-md bg-secondary">
      <q-card-section class="bg-secondary row items-center q-pb-none q-pt-lg">
        <div class="text-h6 text-bold text-primary">Contact Information</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="column justify-start q-px-md q-py-md">
        <div class="col-2 row">
          <span class="col text-gray">Clinic Name</span>
          <span class="col">De La Salle Araneta University Veterinary Teaching Hospital</span>
        </div>
        <div class="col-2 row">
          <span class="col text-gray">Contact Number(s)</span>
          <span class="col">(+632) 8330-9129</span>
        </div>
        <div class="col-2 row">
          <span class="col text-gray">Email Address</span>
          <span class="col">vetmedhospital@dlsau.edu.ph</span>
        </div>
        <div class="col-2 row">
          <span class="col text-gray"></span>
          <a href="https://maps.app.goo.gl/X7wvaRRzND4mFerL6" class="col">View location using map</a>
        </div>
      </div>
      <div class="row q-gutter-sm">
        <q-btn
          unelevated
          style="text-transform: none"
          class="col text-bold q-py-md"
          color="primary"
          label="Close"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserDashboardPage',
});
</script>

<script setup>
import { useAuthStore } from 'stores/auth';
import { computed } from 'vue';
import { ref } from 'vue';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const contactDialog = ref(false);

const user = computed(() => authStore.user);
</script>
