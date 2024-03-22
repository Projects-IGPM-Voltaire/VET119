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
        <template v-for="(choice, index) in choices" :key="index">
          <div class="col-5">
            <q-btn
              style="height: 8rem"
              class="column justify-baseline items-start full-width q-py-lg text-left button-shadow"
              color="white"
              :to="{ name: (choice.link) ? choice.link : {} }"
              @click="(choice.title === 'Book an Appointment') ? $emit('sched') :
                (choice.title === 'View Contact Information') ? contactDialog = true : {}"
            >
              <div
                style="text-align: left; text-transform: none"
                class="column justify-baseline items-start"
              >
                <div class="q-py-0 q-mt-sm row inline">
                  <q-icon :name="choice.icon" color="accent" />
                  <span class="text-bold text-base q-ml-md q-mb-md">{{
                    choice.title
                  }}</span>
                </div>
                <p class="text-grey">
                  {{ choice.description }}
                </p>
              </div>
            </q-btn>
          </div>
        </template>
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
          <span class="col">This is the clinic name</span>
        </div>
        <div class="col-2 row">
          <span class="col text-gray">Contact Number(s)</span>
          <span class="col">This is a contact number</span>
        </div>
        <div class="col-2 row">
          <span class="col text-gray"></span>
          <span class="col">This is a contact number</span>
        </div>
        <div class="col-2 row">
          <span class="col text-gray">Email Address</span>
          <span class="col">This is an email</span>
        </div>
        <div class="col-2 row">
          <span class="col text-gray"></span>
          <a href="" class="col">View location using map</a>
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

const choices = [
  {
    icon: 'calendar_month',
    title: 'Book an Appointment',
    description: 'Schedule a checkup for your pet through VET 119.',
  },
  {
    icon: 'event_available',
    title: 'Your Appointments',
    link: 'check-appointments-page',
    description: 'View your upcoming appointments in VET 119.',
  },
  {
    icon: 'location_on',
    title: 'View Location of Veterinary Clinic',
    description: 'View partner institution on Google Maps.',
  },
  {
    icon: 'phone',
    title: 'View Contact Information',
    description:
      'Get in touch with our partner institution to answer your questions.',
  },
];
const user = computed(() => authStore.user);
</script>
