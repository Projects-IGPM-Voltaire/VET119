<template>
  <q-dialog>
    <q-card class="q-px-md q-py-lg" style="max-width: 60vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-bold text-primary">Appointment Details</div>
        <q-space />
        <q-btn icon="close" color="grey-8" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="row text-left items-stretch">
        <div class="q-mb-xs col-6 row text-left">
          <span class="q-mb-xs col text-grey">Owner Name</span>
          <span class="q-mb-xs col text-base">{{ appointment.owner }}</span>
        </div>
        <div class="q-mb-xs col-6 row text-left">
          <span class="q-mb-xs col text-grey">Reference Number</span>
          <span class="q-mb-xs col text-base">{{ appointment.refno }}</span>
        </div>
        <div class="q-mb-xs col-6 row text-left">
          <span class="q-mb-xs col text-grey">Number of Pets</span>
          <span class="q-mb-xs col text-base">{{ appointment.petno }}</span>
        </div>
        <div class="q-mb-xs col-6 row text-left">
          <span class="q-mb-xs col text-grey">Appointment Date</span>
          <span class="q-mb-xs col text-base">{{ convertToDateReadable(appointment.dt) }}</span>
        </div>
        <div class="q-mb-xs col-6 row text-left">
          <span class="q-mb-xs col text-grey">Species of Pet(s)</span>
          <span class="q-mb-xs col text-base">{{ appointment.species }}</span>
        </div>
        <div class="q-mb-xs col-6 row text-left">
          <span class="q-mb-xs col text-grey">Appointment Time</span>
          <span class="q-mb-xs col text-base">{{ convertTo12HourFormat(appointment.dt) }}</span>
        </div>
        <div class="q-mb-xs col-6 row text-left">
          <span class="col text-grey">Names of Pet(s)</span>
          <span class="col text-base">{{ appointment.petname }}</span>
        </div>
        <div class="col-6 row text-left">
          <span class="col text-grey">Purpose</span>
          <span class="col text-base">{{ appointment.purpose }}</span>
        </div>
        <div class="col-6 row text-left">
          <span class="col text-grey">Breed of Pet(s)</span>
          <span class="col text-base">{{ appointment.breed }}</span>
        </div>
      </q-card-section>
      <q-card-section class="row items-stretch">
        <q-btn unelevated color="primary" text-color="white" class="q-py-md q-mb-sm col-12 text-bold" label="Close" v-close-popup />
        <q-btn outline unelevated color="red" text-color="red" class="q-py-md col-12 text-bold" label="Cancel Appointment"
          @click="deleteAppointment"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'AppointmentDetailsDialog',
  });
</script>

<script setup>
import { defineProps } from 'vue';
import { convertTo12HourFormat, convertToDateReadable } from 'src/extras/misc';
import { useQuasar } from 'quasar';
import { useAppointmentStore } from 'src/stores/appointment';

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  },
})

const $q = useQuasar();

const appointmentStore = useAppointmentStore();

const deleteAppointment = () => {
  $q.dialog({
    title: 'Delete Appointment',
    message: 'Are you sure you want to delete this appointment?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    const { code, message, data } = await appointmentStore.delete([props.appointment.refno]);
    if (code === 200) {
      $q.notify({
        type: 'positive',
        message: message,
        position: 'top',
        timeout: 2000,
      });
      location.reload();
    } else {
      $q.notify({
        type: 'negative',
        message: message,
        position: 'top',
        timeout: 2000,
      });
    }
  });
}

</script>
