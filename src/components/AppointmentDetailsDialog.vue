<template>
  <q-card class="q-px-md q-py-lg" style="max-width: 60vw;">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6 text-bold text-primary">Appointment Details</div>
      <q-space />
      <q-btn icon="close" color="grey-8" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="row text-left items-stretch">
      <div class="q-mb-xs col-6 row text-left">
        <span class="q-mb-xs col text-grey">Owner Name</span>
        <span class="q-mb-xs col text-base">John Doe</span>
      </div>
      <div class="q-mb-xs col-6 row text-left">
        <span class="q-mb-xs col text-grey">Reference Number</span>
        <span class="q-mb-xs col text-base">031024-0006-001</span>
      </div>
      <div class="q-mb-xs col-6 row text-left">
        <span class="q-mb-xs col text-grey">Number of Pets</span>
        <span class="q-mb-xs col text-base">2</span>
      </div>
      <div class="q-mb-xs col-6 row text-left">
        <span class="q-mb-xs col text-grey">Appointment Date</span>
        <span class="q-mb-xs col text-base">March 10, 2024</span>
      </div>
      <div class="q-mb-xs col-6 row text-left">
        <span class="q-mb-xs col text-grey">Species of Pet(s)</span>
        <span class="q-mb-xs col text-base">Moon,<br /> Shine</span>
      </div>
      <div class="q-mb-xs col-6 row text-left">
        <span class="q-mb-xs col text-grey">Appointment Time</span>
        <span class="q-mb-xs col text-base">March 10, 2024</span>
      </div>
      <div class="q-mb-xs col-6 row text-left">
        <span class="col text-grey">Species of Pet(s)</span>
        <span class="col text-base">cat,<br /> hamster</span>
      </div>
      <div class="col-6 row text-left">
        <span class="col text-grey">Purpose</span>
        <span class="col text-base">vaccination</span>
      </div>
      <div class="col-6 row text-left">
        <span class="col text-grey">Breed of Pet(s)</span>
        <span class="col text-base">Persian,<br />N/A</span>
      </div>
    </q-card-section>
    <q-card-section class="row items-stretch">
      <q-btn unelevated color="primary" text-color="white" class="q-py-md q-mb-sm col-12 text-bold" label="Close" />
      <q-btn outline unelevated color="red" text-color="red" class="q-py-md col-12 text-bold" label="Cancel Appointment" />
    </q-card-section>
  </q-card>
</template>
<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'AppointmentDetailsDialog',
  });
</script>
