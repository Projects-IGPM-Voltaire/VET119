<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">View John Doe Appointment</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <p class="text-subtitle2 text-grey-6">Personal Information</p>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input color="primary" outlined label="First Name" />
              </div>
              <div class="col-6">
                <q-input color="primary" outlined label="Last Name" />
              </div>
              <div class="col-12">
                <q-input color="primary" outlined label="Birthday" />
              </div>
              <div class="col-12">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <p class="text-subtitle2 text-grey-6">
                      Choose preferred date
                    </p>
                    <q-date color="primary" style="width: 100%" />
                  </div>
                  <div class="col-12">
                    <p class="text-subtitle2 text-grey-6">
                      Choose preferred time
                    </p>
                    <q-select
                      v-model="selectedTime"
                      :options="timeRanges"
                      outlined
                    />
                  </div>
                  <div class="col-12">
                    <p class="text-subtitle2 text-grey-6">Available Doctors</p>
                    <div class="row col-gutter-md">
                      <div class="col-6">
                        <q-card class="my-card" flat bordered>
                          <q-item>
                            <q-item-section avatar>
                              <q-avatar>
                                <img
                                  src="https://cdn.quasar.dev/img/boy-avatar.png"
                                  alt="Sample"
                                />
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label>Dr. John Doe</q-item-label>
                              <q-item-label caption> Physician </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          label="Update"
          color="primary"
          class="full-width text-capitalize"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminScheduleViewEntryDialog",
});
</script>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const modelValueLocal = ref(props.modelValue);
const tab = ref("schedules");

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit("update:modelValue", val)
);
</script>
