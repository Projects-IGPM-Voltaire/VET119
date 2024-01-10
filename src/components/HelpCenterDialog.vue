<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div>
          <div class="text-h6">Help</div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div>
        <q-card-section>
          <h6 class="text-h6 q-my-md">Getting Started:</h6>
          <p>
            MediQueue is a queueing management system that allows patients to
            book an appointment online beforehand without visiting the actual
            health center. The available schedules provided in the website will
            be the appointment time of the patient based on the services they
            needed. This allows them to choose the most suitable schedule that
            works for them and decrease their waiting time.
          </p>
        </q-card-section>
        <q-card-section>
          <h6 class="text-h6 q-my-md">To successfully book an appointment:</h6>
          <p>
            <span class="text-weight-bold">Step 1</span>: Book an Appointment
            Choose your preferred appointment date and time. Take note of your
            Reference Number. Be guided with the reminders provided for the day
            of your appointment.
          </p>
          <p>
            <span class="text-weight-bold">Step 2</span>: Check your Booking To
            confirm the details of your appointment, go to Check my Schedule and
            enter your Reference Number. The details of your appointment should
            appear.
          </p>
          <p>
            <span class="text-weight-bold">Step 3</span>: Appointment Check your
            queue in Queues with your Patient Number as your reference. You will
            know if you are next in line for the appointment.
          </p>
          <p>
            <span class="text-weight-bold">Step 3</span>: Appointment Check your
            queue in Queues with your Patient Number as your reference. You will
            know if you are next in line for the appointment.
          </p>
        </q-card-section>
        <q-card-section>
          <h6 class="text-h6 q-my-md">Troubleshooting:</h6>
          <p>
            <span class="text-weight-bold">1.</span> Check your data or wifi
            connection and reload the website.
          </p>
          <p>
            <span class="text-weight-bold">2.</span> If errors still persist,
            contact us via email (<span class="text-weight-bold"
              >mediqueue.pr2@gmail.com</span
            >) for customer support.
          </p>
        </q-card-section>
        <q-card-section>
          <h6 class="text-h6 q-my-md">Security and Privacy:</h6>
          <p>
            MediQueue, created by Valenzuela City School of Mathematics and
            Science Grade 12 students in compliance with their Practical II
            Research Subject, prioritizes the security and privacy of user
            information. All data collected from this website will be treated
            with utmost confidentiality and used solely for healthcare purposes.
            In strict adherence to the Republic Act 10173 – Data Privacy Act of
            2012, the collected data will not be disclosed to the public in any
            manner that could identify the patients.
          </p>
        </q-card-section>
        <q-card-section>
          <h6 class="text-h6 q-my-md">Terms of Service:</h6>
          <p>
            The use of MediQueue website or sending an email to
            mediqueue.pr2@gmail.com means that you are allowing us to
            communicate with you and work on your details from the registration.
            Therefore, we will communicate with you via email. And for
            clarification, you agree that our communication and the information
            we provided satisfy any legal requirements that such communications
            be in writing.
          </p>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpCenterDialog',
});
</script>

<script setup>
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const $q = useQuasar();

const modelValueLocal = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);
</script>
