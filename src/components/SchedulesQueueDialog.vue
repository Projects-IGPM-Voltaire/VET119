<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Book an Appointment</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step
          :name="1"
          title="About the Patient"
          icon="account_box"
          :done="step > 1"
        >
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <p class="text-subtitle2 text-grey-6">How you feeling?</p>
              <q-select
                color="primary"
                label="Choose illnesses"
                outlined
                :options="commonIllnesses"
                multiple
                stack-label
                use-chips
                v-model="illnesses"
              />
            </div>

            <div class="col-12">
              <p class="text-subtitle2 text-grey-6">Patient Information</p>
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  <q-input color="primary" outlined label="First Name" />
                </div>
                <div class="col-6">
                  <q-input color="primary" outlined label="Last Name" />
                </div>
                <div class="col-2">
                  <q-input color="primary" outlined label="Age" type="number" />
                </div>
                <div class="col-10">
                  <q-input color="primary" outlined label="Mobile Number" />
                </div>
              </div>
            </div>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Schedule"
          icon="calendar_month"
          :done="step > 2"
        >
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <p class="text-subtitle2 text-grey-6">Choose preferred date</p>
              <q-date color="primary" style="width: 100%" />
            </div>
            <div class="col-12">
              <p class="text-subtitle2 text-grey-6">Choose preferred time</p>
              <q-select v-model="selectedTime" :options="timeRanges" outlined />
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
        </q-step>

        <q-step
          :name="3"
          title="Reminder"
          icon="notifications_active"
          :done="step > 3"
        >
          <div class="row q-col-gutter-lg">
            <div class="col-12">
              <q-card class="bg-primary text-white">
                <q-card-section>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle2 q-mb-none">
                        Generated reference number
                      </q-item-label>
                      <q-item-label class="text-h6 q-my-none text-bold">
                        #GUEST-001
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-btn
                        icon="content_copy"
                        class="text-white"
                        round
                        rounded
                        unelevated
                      ></q-btn>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12">
              <p class="text-subtitle1 q-mb-sm">
                <q-icon
                  size="md"
                  name="report"
                  class="q-mr-xs text-black"
                />Reminders for Appointment!
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
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.next()"
              color="primary"
              :label="step === 3 ? 'Finish' : 'Next'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScheduleAppointmentDialog",
});
</script>

<script setup>
import { onMounted, ref, watch } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const modelValueLocal = ref(props.modelValue);
const step = ref(1);
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
