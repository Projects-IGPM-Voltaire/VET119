<template>
  <q-input
    :color="color"
    :outlined="outlined"
    :label="label"
    borderless
    mask="time"
    :rules="['time']"
    v-model="modelValueLocal"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time
            :minute-options="[0]"
            :with-seconds="false"
            v-model="modelValueLocal"
            :options="disablePastHoursFunc"
            v-if="disablePastHours"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
          <q-time
            :minute-options="[0]"
            :with-seconds="false"
            v-model="modelValueLocal"
            v-else
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'BaseInputTimePicker',
};
</script>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  outlined: {
    type: Boolean,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  disablePastHours: {
    type: Boolean,
    required: false,
  },
  timeFrom: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const modelValueLocal = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    modelValueLocal.value = value;
  }
);
watch(
  () => modelValueLocal.value,
  (value) => {
    emit('update:modelValue', value);
  }
);

const disablePastHoursFunc = (hour) => {
  const startHour = parseInt(props.timeFrom.split(':')[0], 10);
  return hour >= startHour;
};
</script>

<style lang="scss" scoped>
/*.c-time-picker {
  :disabled {
  }
}*/
</style>
