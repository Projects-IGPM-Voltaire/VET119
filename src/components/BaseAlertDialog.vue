<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="width: 30rem; max-width: 30rem">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          :label="actionLabel"
          :style="{ width: '10rem', backgroundColor: `${actionColor}` }"
          class="action-button text-capitalize text-white"
          rounded
          unelevated
          :loading="loading"
          @click="onProceed"
        />
        <q-btn
          color="negative"
          label="Cancel"
          :style="{ width: '10rem' }"
          class="action-button text-capitalize text-white"
          rounded
          unelevated
          :loading="loading"
          @click="closeDialog"
          v-if="showCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseAlertDialog',
});
</script>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  actionLabel: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
  actionColor: {
    type: String,
    default: '#656565',
  },
  showCancel: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['onProceed']);

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

const onProceed = () => {
  emit('onProceed');
};
const closeDialog = () => {
  modelValueLocal.value = false;
};
</script>
