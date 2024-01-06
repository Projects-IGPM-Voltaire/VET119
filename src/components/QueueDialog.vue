<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <template v-if="booted">
        <div class="q-py-xl" v-if="noSchedules">
          <p class="text-center text-grey">No appointments today.</p>
        </div>
        <q-card-section v-else>
          <div class="row q-col-gutter-lg">
            <div class="col-6">
              <h5
                class="text-h5 text-bold bg-black text-white inline-block q-pa-sm q-mt-none"
              >
                Upcoming
              </h5>
              <div class="row q-col-gutter-lg">
                <template
                  v-for="(sched, index) in tomorrowSchedules"
                  :key="index"
                >
                  <div class="col-6">
                    <p
                      class="inline-block text-black text-h5 text-center text-bold"
                    >
                      {{ sched.patient_number }}
                    </p>
                  </div>
                </template>
              </div>
            </div>
            <div class="col-4">
              <h5
                class="text-h5 text-bold bg-primary text-white inline-block q-pa-sm q-mt-none"
              >
                Ongoing
              </h5>
              <div class="row q-col-gutter-lg">
                <template
                  v-for="(sched, index) in upcomingSchedules"
                  :key="index"
                >
                  <div class="col-6">
                    <p
                      class="inline-block text-primary text-h5 text-center text-bold"
                    >
                      {{ sched.patient_number }}
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </q-card-section>
      </template>
      <div class="q-py-xl" v-else>
        <p class="text-center text-grey">Loading... Please wait...</p>
      </div>
      <q-card-actions class="bg-primary text-white justify-center">
        <span class="text-bold"> You're viewing {{ healthCenter.name }} </span>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QueueDialog',
});
</script>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useScheduleStore } from 'stores/schedule';
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const authStore = useAuthStore();
const scheduleStore = useScheduleStore();

const modelValueLocal = ref(props.modelValue);
const upcomingSchedules = ref([]);
const tomorrowSchedules = ref([]);
const booted = ref(false);

const authUser = computed(() => authStore.user);
const healthCenterID = computed(
  () => authUser.value.health_center_member.health_center_id
);
const healthCenter = computed(() => authUser.value.health_center_member.center);
const noSchedules = computed(
  () =>
    upcomingSchedules.value.length === 0 && tomorrowSchedules.value.length === 0
);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);

const getOngoingSchedules = async () => {
  const { code, data } = await scheduleStore.list({
    healthCenterID: healthCenterID.value,
    conditions: ['ongoing'],
  });
  if (code === 200) {
    upcomingSchedules.value = data;
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};
const getUpcomingSchedules = async () => {
  const { code, data } = await scheduleStore.list({
    healthCenterID: healthCenterID.value,
    conditions: ['upcoming'],
  });
  if (code === 200) {
    tomorrowSchedules.value = data;
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};

onMounted(async () => {
  await getOngoingSchedules();
  await getUpcomingSchedules();
  booted.value = true;
});
</script>
