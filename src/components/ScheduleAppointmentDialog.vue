<template>
  <q-dialog v-model="showBookModal" persistent>
    <q-card style="width: 700px; max-width: 700px" class="q-px-md bg-secondary">
      <q-card-section class="bg-secondary row items-center q-pb-none q-pt-lg">
        <div class="text-h6 text-bold text-primary">Book an Appointment</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-stepper class="bg-secondary" v-model="step" ref="stepper" flat animated>
        <q-step
          :name="1"
          color="accent"
          class="text-white"
          prefix="1"
          title="Set Appointment"
          :done="step > 1"
        >
          <div class="col q-col-gutter-lg">
            <div class="col" v-if="isAdmin">
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
                v-model="firstName"
              />
              <q-input outlined color="accent" class="col-5" label="Last Name"
                v-model="lastName"
              />
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
                v-model="petCount"
                :min="1"
                :max="10"
              />
              <div class="col no-wrap q-col-gutter-lg">
                <div class="col q-col-gutter-xs">
                  <q-input
                    color="accent"
                    class="col"
                    v-for="(_, index) in pets"
                    v-model="pets[index].name"
                    :key="index"
                    :label="`Name of Pet #${index + 1}`"
                  />
                </div>
                <div class="col q-col-gutter-xs">
                  <q-input
                    color="accent"
                    class="col"
                    v-for="(_, index) in pets"
                    v-model="pets[index].species"
                    :key="index"
                    :label="`Species of Pet #${index + 1}`"
                  />
                </div>
                <div class="col q-col-gutter-xs">
                  <span class="col-12 text-uppercase text-overline text-blue-grey"
                    >Optional</span
                  >
                  <q-input
                    color="accent"
                    class="col"
                    v-for="(_, index) in pets"
                    v-model="pets[index].breed"
                    :key="index"
                    :label="`Breed of Pet #${index + 1}`"
                  />
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-sm q-gutter-xs">
              <div class="col-12">
                <p class="text-subtitle2 text-bold text-uppercase text-primary">
                  Appointment Information
                </p>
              </div>
              <q-select class="col-12" color="accent" outlined label="Purpose"
                v-model="purpose"
                :options="['Checkup', 'Follow-up', 'Other']"
              />
              <q-input
                class="col-6"
                color="accent"
                outlined
                label="Select Appointment Date"
                type="date"
                v-model="date"
              />
              <q-select
                class="col"
                color="accent"
                outlined
                label="Select Appointment Time"
                v-model="selectedTime"
                :options="timeRanges"
                :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
                :disable="!date"
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
              <span class="col text-gray">{{ authUser.first_name }} {{ authUser.last_name }}</span>
            </div>
            <div class="col-2 row">
              <span class="col text-gray">Number of Pets</span>
              <span class="col text-gray">{{ petCount }}</span>
            </div>
            <div class="col-2 row">
              <span class="col text-gray">Names of Pet(s)</span>
              <span class="col text-gray">{{ pets.map((pet) => pet.name).join(', ') }}</span>
            </div>
            <div class="col-2 row">
              <span class="col text-gray">Species of Pet(s)</span>
              <span class="col text-gray">{{ pets.map((pet) => pet.species).join(', ') }}</span>
            </div>
            <div class="col-2 row">
              <span class="col text-gray">Breed of Pet(s)</span>
              <span class="col text-gray">{{ pets.map((pet) => pet.breed ? pet.breed : 'N/A').join(', ') }}</span>
            </div>
            <div class="col-2 row">
              <span class="col text-gray">Appointment Date</span>
              <span class="col text-gray">{{ formatDateString(date) }}</span>
            </div>
            <div class="col-2 row">
              <span class="col text-gray">Appointment Time</span>
              <span class="col text-gray">{{ selectedTime.label }}</span>
            </div>
            <div class="col-2 row">
              <span class="col text-gray">Purpose</span>
              <span class="col text-gray">{{ purpose }}</span>
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
              <span class="text-accent text-bold">{{ formatDateString(date) }}</span> at
              <span class="text-accent text-bold">{{ selectedTime.label }}</span>
            </p>
            <p class="text-center text-base">
              Your reference number is shown below:
            </p>
            <q-btn unelevated rounded color="accent-50" class="q-py-lg q-mb-lg"
              @click="copyReferenceNumber"
            >
              <span class="text-primary text-weight-bold text-h4"
                >{{ referenceNumber }}</span
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
              @click="() => {if(validateForm()) $refs.stepper.next()}"
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
              v-if="step === 2"
              unelevated
              style="text-transform: none"
              class="col text-bold q-py-md"
              @click="onCreate"
              color="primary"
              label="Set Appointment"
              :disable="isFormLoading"
              :loading="isFormLoading"
            />
            <q-btn
              v-if="step === 3"
              unelevated
              style="text-transform: none"
              class="col text-bold q-py-md"
              color="primary"
              label="Done"
              v-close-popup
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScheduleAppointmentDialog',
});
</script>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useAppointmentStore } from 'src/stores/appointment';
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user';
import { useAuthStore } from 'stores/auth';
import { objetHasValue } from 'src/extras/object';
import { useHealthCenterStore } from 'stores/healthCenter';
import { copyToClipboard } from 'quasar';
import { toPublicImage } from 'src/extras/misc';

const props = defineProps(['open']);
const emit = defineEmits(['update:open']);
const showBookModal = computed({
  get() { return props.open; },
  set(val) { emit('update:open', val); },
});

const userStore = useUserStore();
const authStore = useAuthStore();
const $q = useQuasar();
const healthCenterStore = useHealthCenterStore();
const appointmentStore = useAppointmentStore();

const firstName = ref('');
const lastName = ref('');
const petCount = ref(1);
const pets = ref([{ name: '', species: '', breed: '' }]);
const purpose = ref(null);
const date = ref(null);

const selectedTime = ref(null);
const defaultForm = {
  date: null,
  time_from: null,
  time_to: null,
};
const isFormLoading = ref(false);
const formError = ref(false);
const booted = ref(false);
const step = ref(1);
const appointment = ref(null);
const referenceNumber = ref('');
const bookedDates = ref([]);

const formatDateString = (originalDateString) => {
  let date = new Date(originalDateString);

  // Format the date
  let options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleString('en-US', options);
}

const validateForm = () => {
  // for each pet, check if the name and species is not empty
  const hasEmptyPet = pets.value.some(
    (pet) => {
      return (pet.name === '' || pet.species === '');
    }
  );
  if (hasEmptyPet) {
    $q.notify({
      message: 'Please fill up the pet information.',
      color: 'negative',
    });
    return false;
  }
  if (purpose.value === null) {
    $q.notify({
      message: 'Please select the purpose of the appointment.',
      color: 'negative',
    });
    return false;
  }
  if (date.value === null) {
    $q.notify({
      message: 'Please select the date of the appointment.',
      color: 'negative',
    });
    return false;
  }
  if (selectedTime.value === null) {
    $q.notify({
      message: 'Please select the time of the appointment.',
      color: 'negative',
    });
    return false;
  }

  return true;
}

watch(
  () => date.value,
  (value) => {
    if (new Date(value) < new Date()) {
      date.value = null;
      $q.notify({
        message: 'Please select a valid date.',
        color: 'negative',
      });
    }
    selectedTime.value = null;
  }
)

watch(
  () => appointment.value,
  (value) => {
    if (value) {
      referenceNumber.value = value.reference_number;
    }
  }
)


const generateTimeRanges = () => {
  const timeRanges = [];
  const startTime = new Date().setHours(8, 0, 0, 0);
  const endTime = new Date().setHours(16, 59, 59, 999);
  const interval = 30 * 60 * 1000; // 30 minutes in milliseconds

  for (let time = startTime; time <= endTime; time += interval) {
    const timeFrom = new Date(time);
    const timeTo = new Date(time + interval);
    const formattedTimeFrom = timeFrom.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedTimeTo = timeTo.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const time_from = timeFrom.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const time_to = timeTo.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const inactive = bookedDates.value.some((date) => {
      return date.time_from === time_from
    });

    timeRanges.push({
      label: `${formattedTimeFrom} - ${formattedTimeTo}`,
      value: {
        time_from: time_from,
        time_to: time_to,
      },
      inactive: inactive,
    });
  }

  return timeRanges;
};

const timeRanges = ref([]);

const authUser = computed(() => authStore.user);

const isAdmin = computed(() => authUser.value.level === 'admin');

watch(
  () => date.value,
  (value) => {
    getBookedDates();
  }
);

watch(
  () => petCount.value,
  (value) => {
    pets.value = Array.from({ length: value }, (_, i) => ({
      name: '',
      species: '',
      breed: '',
    }));
  }
)

const onCreate = async () => {
  isFormLoading.value = true;
  const { code, message, data } = await appointmentStore.create({
    first_name: firstName.value,
    last_name: lastName.value,
    date: date.value,
    time_from: selectedTime.value.value.time_from,
    time_to: selectedTime.value.value.time_to,
    purpose: purpose.value,
    pets: pets.value,
    purpose: purpose.value,
  });
  isFormLoading.value = false;
  if (code === 200) {
    appointment.value = Object.assign({}, data);
    console.log(appointment.value.reference_number);
    step.value = 3;
    $q.notify({
      message: 'Appointment booked successfully!',
      color: 'positive',
    });
    return;
  }
  formError.value = message;
};

const copyReferenceNumber = async () => {
  await copyToClipboard(referenceNumber.value);
  $q.notify({
    message: 'Reference number copied to clipboard.',
    color: 'positive',
    icon: 'done',
  });
};

const getBookedDates = async () => {
  const { code, data } = await appointmentStore.filter(
    { date: date.value }
  );
  if (code === 200) {
    bookedDates.value = data;
    timeRanges.value = generateTimeRanges();
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};

onMounted(async () => {
  booted.value = true;
});
</script>
