<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Book an Appointment</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step
          :name="1"
          title="Schedule"
          icon="calendar_month"
          :done="step > 1"
        >
          <template v-if="booted">
            <p class="text-subtitle1 text-negative" v-if="!!formError">
              {{ formError }}
            </p>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <div class="row q-col-gutter-md">
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
                          :disable="!form.date"
                          :options="timeRanges"
                          outlined
                        />
                      </div>
                      <template v-if="doctors.length > 0">
                        <div class="col-12">
                          <p class="text-subtitle2 text-grey-6">
                            Available Doctors
                          </p>
                          <div class="row col-gutter-md">
                            <template
                              v-for="(doctor, index) in doctors"
                              :key="index"
                            >
                              <div class="col-12 col-lg-6">
                                <div>
                                  <q-item clickable v-ripple>
                                    <q-item-section
                                      avatar
                                      v-if="objetHasValue(doctor.image)"
                                    >
                                      <q-avatar>
                                        <img
                                          :src="
                                            toPublicImage(doctor.image.path)
                                          "
                                        />
                                      </q-avatar>
                                    </q-item-section>
                                    <q-item-section
                                      >{{ doctor.first_name }}
                                      {{ doctor.last_name }}</q-item-section
                                    >
                                  </q-item>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <q-btn
              label="Continue"
              color="primary"
              class="full-width text-capitalize q-mt-lg"
              :loading="isFormLoading"
              :disable="isFormLoading"
              @click="onCreate"
            />
          </template>
          <div class="q-py-xl" v-else>
            <p class="text-center text-grey">Loading... Please wait...</p>
          </div>
        </q-step>
        <q-step
          :name="2"
          title="Reminder"
          icon="notifications_active"
          :done="step > 2"
        >
          <div class="row q-col-gutter-lg">
            <div class="col-12" v-if="objetHasValue(schedule)">
              <q-card class="bg-primary text-white">
                <q-card-section>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle2 q-mb-none">
                        Patient Number
                      </q-item-label>
                      <q-item-label class="text-h6 q-my-none text-bold">
                        #{{ schedule.patient_number }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-btn
                        icon="content_copy"
                        class="text-white"
                        round
                        rounded
                        unelevated
                        @click="copyPatientNumber"
                      ></q-btn>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12">
              <p class="text-subtitle1 q-mb-sm">
                <q-icon
                  size="md"
                  name="report"
                  class="q-mr-xs text-bold"
                />Reminders for Appointment!
              </p>
              <ul class="q-mt-none q-gutter-md">
                <li>
                  Reference Number:
                  <span
                    style="text-decoration: underline; cursor: pointer"
                    class="text-primary text-bold"
                    @click="copyReferenceNumber"
                    >{{ schedule.reference_number }}
                    <q-icon name="content_copy"
                  /></span>
                </li>
                <li>
                  Save your reference number beforehand to your notes app or as
                  a picture for easy access during your booking day.
                </li>
                <li>
                  Using your mobile device, you can track your queue in real
                  time.
                </li>
                <li>
                  Familiarize yourself with the Health Center Location.
                  Accessible through the website's map under the health center
                  tab.
                </li>
                <li>
                  Bring light snacks and water. Consume these while waiting for
                  your queue.
                </li>
                <li>
                  Punctuality matters. Come on time to ensure a smooth process
                  and to avoid pushing back your appointment and queue.
                </li>
              </ul>
            </div>
          </div>

          <!--
          <q-btn
            label="Book Again"
            color="primary"
            class="full-width text-capitalize q-mt-lg"
            @click="onBookAgain"
          />
-->
        </q-step>
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
import { computed, onMounted, reactive, ref, watch } from 'vue';
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
let form = reactive(Object.assign({}, defaultForm));
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

const authUser = computed(() => authStore.user);
const healthCenterID = computed(
  () => authUser.value.health_center_member.center.id
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
  const { code, message, data } = await scheduleStore.create({
    ...form,
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
  form.date = null;
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
