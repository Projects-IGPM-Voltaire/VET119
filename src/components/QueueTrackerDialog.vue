<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Check my Queue</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-lg">
          <div class="col-12">
            <q-card class="bg-primary text-white">
              <q-card-section>
                <p class="text-subtitle2">Enter your Reference No.</p>
                <q-input filled color="white" input-class="text-white" />
              </q-card-section>
              <q-card-actions class="flex justify-between">
                <div></div>
                <q-btn color="white" class="text-black text-capitalize"
                  >Search <q-icon name="search"
                /></q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-12">
            <p class="text-subtitle1 q-mb-sm">
              <q-icon
                size="md"
                name="event_available"
                class="q-mr-xs text-black"
              />Schedule details
            </p>
            <ul class="q-mt-none q-gutter-md">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "QueueTrackerDialog",
});
</script>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const modelValueLocal = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit("update:modelValue", val)
);
</script>
