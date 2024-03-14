<template>
  <q-card style="width: 600px; max-width: 600px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Book an Appointment</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-stepper v-model="step" ref="stepper" flat animated>
      <q-step
        :name="1"
        color="accent"
        class="text-white"
        prefix="1"
        title="Set Appointment"
        :done="step > 1"
      >
        <div class="col q-col-gutter-lg">
          <div class="col">
            <div class="col-12">
              <p class="text-subtitle2 text-bold text-uppercase text-primary">
                Personal Information
              </p>
            </div>
            <q-input
              outlined
              color="accent"
              class="col-5 q-mb-sm"
              label="First Name"
            />
            <q-input outlined color="accent" class="col-5" label="Last Name" />
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 q-mb-none">
              <p class="text-subtitle2 text-bold text-uppercase text-primary">
                Pet Information
              </p>
            </div>
            <q-input
              outlined
              type="number"
              color="accent"
              class="col-3"
              label="No. of Pets"
            />
            <div class="col no-wrap q-col-gutter-lg">
              <div class="col q-col-gutter-xs">
                <q-select
                  color="accent"
                  class="col"
                  label="Species of Pet #1"
                />
                <q-select
                  color="accent"
                  class="col"
                  label="Species of Pet #2"
                />
              </div>
              <div class="col q-col-gutter-xs">
                <q-input color="accent" class="col" label="Name of Pet #1" />
                <q-input color="accent" class="col" label="Name of Pet #2" />
              </div>
              <div class="col q-col-gutter-xs">
                <span class="col-12 text-uppercase text-overline text-blue-grey"
                  >Optional</span
                >
                <q-input color="accent" class="col" label="Breed of Pet #1" />
                <q-input color="accent" class="col" label="Breed of Pet #2" />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-gutter-xs">
            <div class="col-12">
              <p class="text-subtitle2 text-bold text-uppercase text-primary">
                Pet Information
              </p>
            </div>
            <q-input class="col-12" color="accent" outlined label="Purpose" />
            <q-input
              class="col-6"
              color="accent"
              outlined
              label="Select Appointment Date"
              type="date"
            />
            <q-select
              class="col"
              color="accent"
              outlined
              label="Select Appointment Time"
              type="date"
            />
          </div>
        </div>
      </q-step>
      <q-step
        :name="2"
        color="accent"
        prefix="2"
        title="Confirmation"
        :done="step > 2"
      >
        <div class="col q-col-gutter-md">
          <div class="col-12">
            <p class="text-subtitle2 text-uppercase text-primary">
              Personal Information
            </p>
          </div>
          <div class="col-2 row">
            <span class="col text-gray">Owner Name</span>
            <span class="col text-gray">John Doe</span>
          </div>
          <div class="col-2 row">
            <span class="col text-gray">Number of Pets</span>
            <span class="col text-gray">2</span>
          </div>
          <div class="col-2 row">
            <span class="col text-gray">Species of Pet(s)</span>
            <span class="col text-gray">Moon,<br />Shine</span>
          </div>
          <div class="col-2 row">
            <span class="col text-gray">Species of Pet(s)</span>
            <span class="col text-gray">cat,<br />hamster</span>
          </div>
          <div class="col-2 row">
            <span class="col text-gray">Breed of Pet(s)</span>
            <span class="col text-gray">hamster</span>
          </div>
          <div class="col-2 row">
            <span class="col text-gray">Appointment Date</span>
            <span class="col text-gray">March 10, 2024</span>
          </div>
          <div class="col-2 row">
            <span class="col text-gray">Appointment Time</span>
            <span class="col text-gray">9:00 AM</span>
          </div>
          <div class="col-2 row">
            <span class="col text-gray">Purpose</span>
            <span class="col text-gray">vaccination</span>
          </div>
        </div>
      </q-step>
      <q-step :name="3" color="accent" prefix="3" title="Done">
        <div class="column justify-start">
          <h5 class="text-center text-weight-bold q-mt-xs q-mb-lg text-primary">
            You're all set!
          </h5>
          <p class="text-center q-mb-none text-base">
            You are set for an appointment on
          </p>
          <p class="text-center q-mb-none text-base">
            <span class="text-accent text-bold">March 10, 2024</span> at
            <span class="text-accent text-bold">9:00 AM.</span>
          </p>
          <p class="text-center text-base">
            Your reference number is shown below:
          </p>
          <q-btn unelevated rounded color="accent-50" class="q-py-lg q-mb-lg">
            <span class="text-primary text-weight-bold text-h4"
              >031024-0006-001</span
            >
            <q-icon
              name="copy_all"
              color="primary"
              class="q-ml-md"
              size="1.5rem"
            />
          </q-btn>
          <p class="text-primary text-uppercase">Reminders</p>
          <p class="text-body text-base">
            1. Save your reference number beforehand to your notes app or as a
            picture for easy use during your booking day.
          </p>
          <p class="text-body text-base">
            2. You can use your mobile device to track your queue in real time
          </p>
          <p class="text-body text-base">
            3. Familiarize yourself with the Veterinary Clinic Location. You can
            find the location by clicking here.
          </p>
          <p class="text-body text-base">
            4. Bring light snacks and water. Consume these while waiting for
            your queue.
          </p>
          <p class="text-body text-base">
            5. Punctuality matters. Come on time to ensure a smooth processand
            to avoid pushing back your appointment and queue.
          </p>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="row q-gutter-sm">
          <q-btn
            v-if="step === 1"
            unelevated
            style="text-transform: none"
            class="col text-bold q-py-md"
            @click="$refs.stepper.next()"
            color="primary"
            label="Continue"
          />
          <q-btn
            v-if="step === 2"
            unelevated
            outline
            style="text-transform: none"
            class="col text-bold q-py-md"
            @click="$refs.stepper.previous()"
            color="accent"
            label="Go Back"
          />
          <q-btn
            v-if="step >= 2"
            unelevated
            style="text-transform: none"
            class="col text-bold q-py-md"
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 2 ? 'Set Appointment' : 'Done'"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-card>
  <q-dialog persistent v-model="modelValueLocal"> </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScheduleAppointmentDialog',
});
</script>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useScheduleStore } from 'stores/schedule';
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user';
import { useAuthStore } from 'stores/auth';
import { objetHasValue } from 'src/extras/object';
import { useHealthCenterStore } from 'stores/healthCenter';
import { copyToClipboard } from 'quasar';
import { toPublicImage } from 'src/extras/misc';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const userStore = useUserStore();
const scheduleStore = useScheduleStore();
const authStore = useAuthStore();
const $q = useQuasar();
const healthCenterStore = useHealthCenterStore();

const modelValueLocal = ref(props.modelValue);
const timeRanges = ref([]);
const selectedTime = ref(null);
const defaultForm = {
  date: null,
  time_from: null,
  time_to: null,
};
let form = ref(Object.assign({}, defaultForm));
const isFormLoading = ref(false);
const formError = ref(false);
const doctors = ref([]);
const booted = ref(false);
const operationHour = ref(null);
const step = ref(1);
const schedule = ref(null);

const generateTimeRanges = () => {
  if (objetHasValue(operationHour.value)) {
    const timeRanges = [];
    const { time_from, time_to } = operationHour.value;

    const startHour = parseInt(time_from.split(':')[0]);
    const endHour = parseInt(time_to.split(':')[0]);
    const currentHour = new Date().getHours();
    const isToday =
      new Date().setHours(0, 0, 0, 0) ===
      new Date(form.value.date).setHours(0, 0, 0, 0);

    for (let i = startHour; i < endHour; i++) {
      if (i <= currentHour && isToday) {
        continue;
      }
      const startHourStr = new Date(1970, 0, 1, i, 0, 0).toLocaleTimeString(
        'en-US',
        { hour: '2-digit', minute: '2-digit', hour12: true }
      );
      const endHourStr = new Date(1970, 0, 1, i + 1, 0, 0).toLocaleTimeString(
        'en-US',
        { hour: '2-digit', minute: '2-digit', hour12: true }
      );

      timeRanges.push({
        label: `${startHourStr} - ${endHourStr}`,
        value: i,
        time_from: `${new Date(1970, 0, 1, i, 0, 0).toLocaleTimeString(
          'en-US',
          {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }
        )}:00`,
        time_to: `${new Date(1970, 0, 1, i + 1, 0, 0).toLocaleTimeString(
          'en-US',
          {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }
        )}:00`,
      });
    }

    return timeRanges;
  }
};

const authUser = computed(() => authStore.user);
const healthCenterID = computed(
  () => authUser.value.health_center_member.center.id
);
const noAvailableTimeslotsError = computed(
  () => !!form.value.date && timeRanges.value.length === 0
);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);
watch(
  () => form.value.date,
  (value) => {
    timeRanges.value = generateTimeRanges();
  }
);

const onCreate = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message, data } = await scheduleStore.create({
    ...form.value,
    time_from: objetHasValue(selectedTime.value)
      ? selectedTime.value.time_from
      : null,
    time_to: objetHasValue(selectedTime.value)
      ? selectedTime.value.time_to
      : null,
    healthCenterID: healthCenterID.value,
    userID: authUser.value.id,
  });
  isFormLoading.value = false;
  if (code === 200) {
    schedule.value = Object.assign({}, data);
    step.value = 2;
    $q.notify({
      message: 'Schedule booked successfully!',
      color: 'positive',
    });
    return;
  }
  formError.value = message;
};
const getDoctors = async () => {
  const { code, data } = await userStore.list({
    healthCenterID: healthCenterID.value,
    position: 'doctor',
  });
  if (code === 200) {
    doctors.value = data;
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};
const getOperationHour = async () => {
  const { code, data } = await healthCenterStore.getOperationHour({
    healthCenterID: healthCenterID.value,
  });
  if (code === 200) {
    operationHour.value = Object.assign({}, data);
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};
const disablePastDates = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  return date >= now || date.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0);
};
const copyPatientNumber = async () => {
  await copyToClipboard(schedule.value.patient_number);
  $q.notify({
    message: 'Patient number copied to clipboard.',
    color: 'positive',
    icon: 'done',
  });
};
const copyReferenceNumber = async () => {
  await copyToClipboard(schedule.value.reference_number);
  $q.notify({
    message: 'Reference number copied to clipboard.',
    color: 'positive',
    icon: 'done',
  });
};
const onBookAgain = async () => {
  modelValueLocal.value = false;
  form.value.date = null;
  selectedTime.value = null;
  step.value = 1;
  modelValueLocal.value = true;
};
const checkHasSchedule = async () => {
  const { code, data } = await scheduleStore.check();
  if (code === 200) {
    const { has_schedule } = data;
    if (has_schedule) {
      schedule.value = Object.assign({}, data.schedule);
      step.value = 2;
    }
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};

onMounted(async () => {
  await getDoctors();
  await getOperationHour();
  await checkHasSchedule();
  booted.value = true;
});
</script>
