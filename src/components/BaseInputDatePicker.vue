<template>
  <q-input
    :color="color"
    :outlined="outlined"
    :label="label"
    borderless
    v-model="modelValueLocal"
  >
    <template v-slot:append>
      <q-icon name="calendar_today" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date mask="YYYY-MM-DD" v-model="modelValueLocal">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'BaseInputDatePicker',
};
</script>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
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
</script>

<style lang="scss" scoped>
.c-time-picker {
  :disabled {
  }
}
</style>
