<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add new Appointment</div>
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
          label="Save"
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
  name: "AdminScheduleNewEntryDialog",
});
</script>

<script setup>
import { onMounted, ref, watch } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const modelValueLocal = ref(props.modelValue);
const illnesses = ref([]);
const commonIllnesses = ref([
  "Common Cold",
  "Influenza (Flu)",
  "Allergies",
  "Hypertension (High Blood Pressure)",
  "Type 2 Diabetes",
  "Asthma",
  "Bronchitis",
  "Gastroenteritis",
  "Urinary Tract Infection (UTI)",
  "Migraine",
  "Arthritis",
  "Acid Reflux",
  "Sinusitis",
  "Pneumonia",
  "Eczema",
]);
const timeRanges = ref([]);
const selectedTime = ref(null);

const generateTimeRanges = () => {
  const timeRanges = [];
  const startHour = 6; // 6:00 AM
  const endHour = 20; // 8:00 PM

  for (let i = startHour; i < endHour; i++) {
    const currentHour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? "AM" : "PM";

    const label = `${currentHour}:00 ${period} - ${
      (currentHour + 1) % 12
    }:00 ${period}`;

    timeRanges.push({
      label,
      value: i, // You can use a unique identifier if needed
      available: true,
    });
  }

  return timeRanges;
};

onMounted(() => {
  timeRanges.value = generateTimeRanges();
});

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit("update:modelValue", val)
);
</script>
