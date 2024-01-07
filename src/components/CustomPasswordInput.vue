<template>
  <q-input
    :color="color"
    :outlined="outlined"
    :label="label"
    borderless
    :type="isPasswordVisible ? 'text' : 'password'"
    v-model="modelValueLocal"
  >
    <template v-slot:append>
      <q-icon
        :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="onChangePasswordVisibility"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'CustomPasswordInput',
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
});

const emit = defineEmits(['update:modelValue']);

const modelValueLocal = ref(props.modelValue);
const isPasswordVisible = ref(false);

const onChangePasswordVisibility = () => {
  console.log('wew');
  isPasswordVisible.value = !isPasswordVisible.value;
};

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
