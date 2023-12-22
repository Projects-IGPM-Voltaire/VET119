<template>
  <q-select
    v-model="modelValueLocal"
    :color="color"
    :outlined="outlined"
    :label="label"
    :options="options"
    emit-value
    map-options
  />
</template>

<script>
export default {
  name: 'CustomHealthCenterSelect',
};
</script>

<script setup>
import { ref, watch } from 'vue';
import { useHealthCenterStore } from 'stores/healthCenter';

const props = defineProps({
  modelValue: {
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
  disabled: {
    type: Boolean,
    required: false,
  },
  barangayCode: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const healthCenterStore = useHealthCenterStore();

const model = ref(null);
const modelValueLocal = ref(props.modelValue);
const options = ref([]);

const getOptions = () => {
  healthCenterStore
    .list({ barangayCode: props.barangayCode })
    .then(({ data }) => {
      options.value = data.map((healthCenter) => ({
        label: healthCenter.name,
        value: healthCenter.id,
      }));
    })
    .catch((err) => {
      options.value = [];
    });
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
watch(
  () => props.disabled,
  (value) => {
    if (!value) {
      getOptions();
    }
  }
);

if (!props.disabled) {
  getOptions();
}
</script>
