<template>
  <q-page class="row justify-center items-start">
    <div
      style="min-width: 50%; max-width: 65%"
      class="column justify-start items-center"
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
      <template v-else>
        <div class="self-start">
          <h4
            class="q-ml-sm q-mb-sm text-primary text-weight-medium text-capitalize"
          >
            Hi, PlaceHolder!
          </h4>
        </div>
      </template>
      <div
        class="full-width row q-gutter-md q-column-gutter-md q-mb-xl q-mt-none"
      >
        <template v-for="(choice, index) in choices" :key="index">
          <div class="col-5">
            <q-btn
              style="height: 8rem"
              class="column justify-baseline items-start full-width q-py-lg text-left shadow-5"
              color="white"
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

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const choices = [
  {
    icon: 'calendar_month',
    title: 'Book an Appointment',
    description: 'Schedule a checkup for your pet through VET 119.',
  },
  {
    icon: 'event',
    title: 'View Available Schedule',
    description:
      'This is the button description. What will this button do? What do users expect?',
  },
  {
    icon: 'event_available',
    title: 'Your Appointments',
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
