<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="width: 600px; max-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Check my Queue</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <p class="text-subtitle1 text-negative" v-if="!!formError">
          {{ formError }}
        </p>
        <div class="row q-col-gutter-lg">
          <div class="col-12">
            <q-card class="bg-primary text-white">
              <q-card-section>
                <p class="text-subtitle2">Enter your Reference No.</p>
                <q-input
                  filled
                  color="white"
                  input-class="text-white"
                  v-model="referenceNumber"
                />
              </q-card-section>
              <q-card-actions class="flex justify-between">
                <div></div>
                <q-btn
                  color="white"
                  class="text-black text-capitalize"
                  @click="onSearch"
                  >Search <q-icon name="search"
                /></q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-12" v-if="objetHasValue(schedule)">
            <p class="text-subtitle1 q-mb-md">
              <q-icon
                size="md"
                name="event_available"
                class="q-mr-xs text-black"
              />Schedule details
            </p>
            <div class="text-h6 px-xl">
              <div class="text-capitalize">
                Patient No. {{ schedule.patient_number }}
              </div>
              <div>{{ schedule.first_name }} {{ schedule.last_name }}</div>
              <div>
                {{ convertToDateReadable(schedule.date) }}
                {{ convertTo12HourFormat(schedule.time_from) }} -
                {{ convertTo12HourFormat(schedule.time_to) }}
              </div>
            </div>
          </div>
          <div class="col-12 text-center q-py-xl" v-if="isScheduleNotFound">
            <p class="text-subtitle1 q-mb-sm">Schedule not found!</p>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScheduleTrackerDialog',
});
</script>

<script setup>
import { ref, watch } from 'vue';
import { objetHasValue } from 'src/extras/object';
import { useScheduleStore } from 'stores/schedule';
import { useQuasar } from 'quasar';
import { convertTo12HourFormat, convertToDateReadable } from '../extras/misc';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const scheduleStore = useScheduleStore();
const $q = useQuasar();

const modelValueLocal = ref(props.modelValue);
const isFormLoading = ref(false);
const formError = ref(false);
const referenceNumber = ref(null);
const schedule = ref(null);
const isScheduleNotFound = ref(false);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);

const onSearch = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const _referenceNumber = referenceNumber.value
    ? referenceNumber.value.trim()
    : null;
  const { code, message, data } = await scheduleStore.getByReferenceNumber(
    _referenceNumber
  );
  isFormLoading.value = false;
  if (code === 200) {
    if (objetHasValue(data)) {
      isScheduleNotFound.value = false;
      schedule.value = data;
      $q.notify({
        message: 'Schedule details fetched successfully!',
        color: 'positive',
      });
    } else {
      schedule.value = null;
      isScheduleNotFound.value = true;
    }
    return;
  }
  formError.value = message;
};
</script>
