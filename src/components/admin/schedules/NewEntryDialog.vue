<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="width: 800px; max-width: 800px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Book an Appointment</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <template v-if="booted">
        <q-card-section>
          <p
            class="text-subtitle1 text-negative"
            v-if="noAvailableTimeslotsError"
          >
            No timeslots available. Please try again tomorrow.
          </p>
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
                        :options="disablePastDates"
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
                        :disable="!form.date"
                        outlined
                      />
                    </div>
                    <template v-if="doctors.length > 0">
                      <div class="col-12">
                        <p class="text-subtitle2 text-grey-6">
                          Available Doctors
                        </p>
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
                    </template>
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
      </template>
      <div class="q-py-xl" v-else>
        <p class="text-center text-grey">Loading... Please wait...</p>
      </div>
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
import { useHealthCenterStore } from 'stores/healthCenter';

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
const healthCenterStore = useHealthCenterStore();

const modelValueLocal = ref(props.modelValue);
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
const booted = ref(false);
const operationHour = ref(null);

const noAvailableTimeslotsError = computed(
  () => !!form.date && timeRanges.value.length === 0
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
  () => form.date,
  (value) => {
    timeRanges.value = generateTimeRanges();
  }
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
      message: 'Schedule booked successfully!',
      color: 'positive',
    });
    modelValueLocal.value = false;
    emit('onCreateSuccess');
    selectedTime.value = null;
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
const getOperationHour = async () => {
  const { code, data } = await healthCenterStore.getOperationHour({
    healthCenterID: props.healthCenterID,
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
const generateTimeRanges = () => {
  if (objetHasValue(operationHour.value)) {
    const timeRanges = [];
    const { time_from, time_to } = operationHour.value;
    const startHour = parseInt(time_from.split(':')[0]);
    const endHour = parseInt(time_to.split(':')[0]);
    const currentHour = new Date().getHours();
    const isToday =
      new Date().setHours(0, 0, 0, 0) ===
      new Date(form.date).setHours(0, 0, 0, 0);

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

onMounted(async () => {
  await getDoctors();
  await getOperationHour();
  booted.value = true;
});
</script>
