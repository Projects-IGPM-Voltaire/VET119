<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="q-mb-none">
        <div class="flex justify-between">
          <div>
            <h4 class="text-h4 q-my-none text-bold flex items-center">
              Schedules
              <q-badge class="q-ml-xs bg-primary">Admin</q-badge>
            </h4>
            <p class="text-subtitle1">Manage schedules.</p>
          </div>
          <div>
            <q-btn
              outline
              class="text-capitalize text-black"
              @click="onOpenNewEntryDialog"
            >
              <q-icon name="add" class="q-mr-xs" /> Add
              <span class="q-ml-xs text-lowercase">new entry</span>
            </q-btn>
          </div>
        </div>
        <div class="q-py-md">
          <div class="flex justify-between">
            <div></div>
            <!--            <div>
              <q-btn icon="filter_alt" flat rounded round dense></q-btn>
              <q-btn icon="sort" flat rounded round dense></q-btn>
            </div>-->
          </div>
          <q-table flat :rows="schedules" :columns="columns" row-key="name">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="reference_number" :props="props">
                  {{ props.row.reference_number }}
                </q-td>
                <q-td key="patient_number" :props="props">
                  {{ props.row.patient_number }}
                </q-td>
                <q-td key="date" :props="props">
                  {{ props.row.date }}
                </q-td>
                <q-td key="time" :props="props">
                  {{ convertTo12HourFormat(props.row.time_from) }} -
                  {{ convertTo12HourFormat(props.row.time_to) }}
                </q-td>
                <q-td key="patient" :props="props">
                  {{ props.row.first_name }} {{ props.row.last_name }}
                </q-td>
                <q-td key="actions" :props="props">
                  <!--                  <q-btn-->
                  <!--                    flat-->
                  <!--                    icon="edit"-->
                  <!--                    dense-->
                  <!--                    rounded-->
                  <!--                    @click="onOpenViewEntryDialog"-->
                  <!--                  />-->
                  <q-btn
                    flat
                    icon="delete"
                    dense
                    rounded
                    class="text-red"
                    @click="deleteSchedule(props.row.id)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </q-card-section>
    </q-card>
    <AdminScheduleNewEntryDialog
      :healthCenterID="healthCenterID"
      @onCreateSuccess="getSchedules"
      v-model="isNewEntryDialog"
      v-if="isNewEntryDialog"
    />
    <AdminScheduleViewEntryDialog v-model="isViewEntryDialog" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AdminSchedulePage',
  components: {},
});
</script>

<script setup>
import { computed, ref, watch } from 'vue';
import AdminScheduleNewEntryDialog from 'components/admin/schedules/NewEntryDialog.vue';
import AdminScheduleViewEntryDialog from 'components/admin/schedules/ViewEntryDialog.vue';
import { useUserStore } from 'stores/user';
import { useAuthStore } from 'stores/auth';
import { useQuasar } from 'quasar';
import { debounce } from 'src/extras/misc';
import { useScheduleStore } from 'stores/schedule';
import AdminUserNewEntryDialog from 'components/admin/users/NewEntryDialog.vue';

const authStore = useAuthStore();
const scheduleStore = useScheduleStore();
const $q = useQuasar();

const schedules = ref([]);
const schedule = ref(null);
const search = ref(null);

const columns = [
  {
    name: 'reference_number',
    field: 'reference_number',
    align: 'left',
    label: 'Reference',
    sortable: false,
  },
  {
    name: 'patient_number',
    field: 'patient_number',
    align: 'left',
    label: 'Patient',
    sortable: false,
  },
  {
    name: 'date',
    field: 'date',
    align: 'left',
    label: 'Date',
    sortable: false,
  },
  {
    name: 'time',
    field: 'time',
    align: 'left',
    label: 'Time',
    sortable: false,
  },
  {
    name: 'patient',
    field: 'patient',
    align: 'left',
    label: 'Patient',
    sortable: false,
  },
  {
    name: 'actions',
    align: 'left',
    label: 'Actions',
    field: 'actions',
    sortable: false,
  },
];
const sampleData = {
  date: 'November 10, 2023',
  time: '7:00AM - 8:00AM',
  patient: 'John Doe',
};
let rows = [sampleData];
for (let i = 1; i <= 20; i++) {
  rows = [...rows, sampleData];
}

const isNewEntryDialog = ref(false);
const isViewEntryDialog = ref(false);

const authUser = computed(() => authStore.user);
const healthCenterID = computed(
  () => authUser.value.health_center_member.health_center_id
);

const onOpenNewEntryDialog = () =>
  (isNewEntryDialog.value = !isNewEntryDialog.value);
const onOpenViewEntryDialog = () =>
  (isViewEntryDialog.value = !isViewEntryDialog.value);

watch(
  () => search.value,
  debounce(async () => await getSchedules(), 500)
);

const getSchedules = async () => {
  const { code, data } = await scheduleStore.list({
    healthCenterID: healthCenterID.value,
    search: search.value || null,
  });
  if (code === 200) {
    schedules.value = data;
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};
const deleteSchedule = async (scheduleID) => {
  const { code } = await scheduleStore.delete(scheduleID);
  if (code === 200) {
    await getSchedules();
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};
const convertTo12HourFormat = (time24hr) => {
  const [hours, minutes] = time24hr.split(':');
  let period = 'AM';

  let hours12 = parseInt(hours, 10);
  if (hours12 >= 12) {
    period = 'PM';
    if (hours12 > 12) {
      hours12 -= 12;
    }
  }

  return `${hours12}:${minutes} ${period}`;
};

getSchedules();
</script>
