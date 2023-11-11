<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-lg">
          <div class="col-4">
            <h5
              class="text-h5 text-bold bg-black text-white inline-block q-pa-sm q-mt-none"
            >
              Please Wait...
            </h5>
            <div class="row q-col-gutter-lg">
              <template v-for="n in 8" :key="n">
                <div class="col-6">
                  <p
                    class="inline-block text-black text-h5 text-center text-bold"
                  >
                    071{{ n }}
                  </p>
                </div>
              </template>
            </div>
          </div>
          <div class="col-4">
            <h5
              class="text-h5 text-bold bg-primary text-white inline-block q-pa-sm q-mt-none"
            >
              Upcoming...
            </h5>
            <div class="row q-col-gutter-lg">
              <template v-for="n in 8" :key="n">
                <div class="col-6">
                  <p
                    class="inline-block text-primary text-h5 text-center text-bold"
                  >
                    071{{ n }}
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="bg-primary text-white justify-center">
        <span class="text-bold">
          You're viewing Super Health Center @ 1120 Super address here
        </span>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScheduleQueueDialog",
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
