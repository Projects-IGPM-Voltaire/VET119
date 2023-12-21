<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add new Appointment</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <p class="text-subtitle1 text-negative" v-if="!!formError">
          {{ formError }}
        </p>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <p class="text-subtitle2 text-grey-6">Personal Information</p>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  color="primary"
                  outlined
                  label="First Name"
                  v-model="form.first_name"
                />
              </div>
              <div class="col-6">
                <q-input
                  color="primary"
                  outlined
                  label="Last Name"
                  v-model="form.last_name"
                />
              </div>
              <div class="col-12">
                <BaseInputDatePicker
                  color="primary"
                  outlined
                  label="Birthday"
                  v-model="form.birthday"
                />
              </div>
              <div class="col-12">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <p class="text-subtitle2 text-grey-6">
                      Choose preferred date
                    </p>
                    <q-date
                      mask="YYYY-MM-DD"
                      color="primary"
                      style="width: 100%"
                      v-model="form.date"
                    />
                  </div>
                  <div class="col-12">
                    <p class="text-subtitle2 text-grey-6">
                      Choose preferred time
                    </p>
                    <q-select
                      v-model="selectedTime"
                      :options="timeRanges"
                      outlined
                    />
                  </div>
                  <div class="col-12">
                    <p class="text-subtitle2 text-grey-6">Available Doctors</p>
                    <div class="row col-gutter-md">
                      <div class="col-6">
                        <q-card class="my-card" flat bordered>
                          <template
                            v-for="(doctor, index) in doctors"
                            :key="index"
                          >
                            <q-item>
                              <!--                              <q-item-section avatar>
                                <q-avatar>
                                  <img
                                    src="https://cdn.quasar.dev/img/boy-avatar.png"
                                    alt="Sample"
                                  />
                                </q-avatar>
                              </q-item-section>-->

                              <q-item-section>
                                <q-item-label
                                  >Dr. {{ doctor.first_name }}
                                  {{ doctor.last_name }}</q-item-label
                                >
                                <!--
                                <q-item-label caption> Physician </q-item-label>

-->
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          label="Save"
          color="primary"
          class="full-width text-capitalize"
          :loading="isFormLoading"
          :disable="isFormLoading"
          @click="onCreate"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminScheduleNewEntryDialog',
});
</script>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useScheduleStore } from 'stores/schedule';
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user';
import { useAuthStore } from 'stores/auth';
import BaseInputDatePicker from 'components/BaseInputDatePicker.vue';
import { objetHasValue } from 'src/extras/object';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  healthCenterID: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const userStore = useUserStore();
const scheduleStore = useScheduleStore();
const authStore = useAuthStore();
const $q = useQuasar();

const modelValueLocal = ref(props.modelValue);
const illnesses = ref([]);
const commonIllnesses = ref([
  'Common Cold',
  'Influenza (Flu)',
  'Allergies',
  'Hypertension (High Blood Pressure)',
  'Type 2 Diabetes',
  'Asthma',
  'Bronchitis',
  'Gastroenteritis',
  'Urinary Tract Infection (UTI)',
  'Migraine',
  'Arthritis',
  'Acid Reflux',
  'Sinusitis',
  'Pneumonia',
  'Eczema',
]);
const timeRanges = ref([]);
const selectedTime = ref(null);
const defaultForm = {
  health_center_id: props.healthCenterID,
  first_name: null,
  last_name: null,
  birthday: null,
  date: null,
  time_from: null,
  time_to: null,
};
let form = reactive(Object.assign({}, defaultForm));
const isFormLoading = ref(false);
const formError = ref(false);
const doctors = ref([]);

const generateTimeRanges = () => {
  const timeRanges = [];
  const startHour = 6; // 6:00 AM
  const endHour = 20; // 8:00 PM

  for (let i = startHour; i < endHour; i++) {
    const currentHour = i % 24;
    const period = i < 12 ? 'AM' : 'PM';

    const label = `${
      currentHour === 0 ? 12 : currentHour > 12 ? currentHour - 12 : currentHour
    }:00 ${period} - ${
      (currentHour + 1) % 24 === 0
        ? 12
        : (currentHour + 1) % 24 > 12
        ? (currentHour + 1) % 12
        : (currentHour + 1) % 24
    }:00 ${period}`;

    timeRanges.push({
      label,
      value: i, // You can use a unique identifier if needed
      available: true,
      time_from: `${currentHour}:00:00`,
      time_to: `${
        (currentHour + 1) % 24 === 0 ? 0 : (currentHour + 1) % 24
      }:00:00`,
    });
  }

  return timeRanges;
};

const authUser = computed(() => authStore.user);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);

const onCreate = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message } = await scheduleStore.create({
    ...form,
    time_from: objetHasValue(selectedTime.value)
      ? selectedTime.value.time_from
      : null,
    time_to: objetHasValue(selectedTime.value)
      ? selectedTime.value.time_to
      : null,
    healthCenterID: props.healthCenterID,
  });
  isFormLoading.value = false;
  if (code === 200) {
    $q.notify({
      message: 'Schedule created successfully!',
      color: 'positive',
    });
    modelValueLocal.value = false;
    emit('onCreateSuccess');
    form = Object.assign({}, defaultForm);
    return;
  }
  formError.value = message;
};
const getDoctors = async () => {
  const { code, data } = await userStore.list({
    healthCenterID: props.healthCenterID,
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

onMounted(() => {
  timeRanges.value = generateTimeRanges();
});

getDoctors();
</script>
