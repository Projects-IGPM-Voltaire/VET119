<template>
  <q-select
    v-model="modelValueLocal"
    :color="color"
    :outlined="outlined"
    :label="label"
    use-input
    fill-input
    hide-selected
    emit-value
    map-options
    @filter="fetchOptions"
    :options="options"
  />
</template>

<script>
export default {
  name: "CustomBarangaySelect",
};
</script>

<script setup>
import { ref, watch } from "vue";
import { useReferenceStore } from "stores/reference";

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
});

const emit = defineEmits(["update:modelValue"]);

const referenceStore = useReferenceStore();

const model = ref(null);
const modelValueLocal = ref(props.modelValue);
const options = ref([]);

const fetchOptions = (val, update, abort) => {
  if (val.length < 2) {
    abort();
    return;
  }

  referenceStore
    .getBarangays({ page: 1, perPage: 10, search: val })
    .then(({ data }) => {
      const barangays = data.data;
      update(() => {
        options.value = barangays.map((barangay) => ({
          label: `${barangay.name} (${barangay.city.name})`,
          value: barangay.code,
        }));
      });
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
    emit("update:modelValue", value);
  }
);
</script>
