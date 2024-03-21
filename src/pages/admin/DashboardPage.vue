<template>
  <q-page class="row justify-center items-start">
    <div style="width:1000px;max-width:1000px;" class="q-pb-xl column items-stretch">
      <h4 class="text-bold text-capitalize text-primary">Hi, Admin!</h4>
      <div class="row justify-between">
        <div class="col-8 row justify-start">
          <q-input outlined type="search" label="Search.." color="grey" class="col-7 q-mr-md"
            v-model="search"
           />
          <q-btn outline label="Filter" color="accent" class="col-4 q-py-md q-px-lg text-bold"
            :to="{ name: {} }"
            @click="filterDialogOpen = true"
           />
        </div>
        <div class="col-3 row justify-end">
          <q-btn outline label="Add" color="accent" class="col-5 q-mr-xs q-py-sm q-px-lg text-bold"
          v-if="!editMode"
          :to="{ name: {} }"
          @click="$emit('sched')"
          />
          <q-btn outline label="Delete" color="red" class="col-5 q-mr-xs q-py-sm q-px-lg text-bold"
          v-if="editMode"
          @click="confirmDeleteDialog = true"
          />
          <q-btn outline v-bind:label="editMode ? 'View' : 'Edit'" color="accent" class="col-5 q-py-sm q-px-lg text-bold"
            @click="editMode = !editMode"
          />
        </div>
      </div>
      <q-table
        color="primary"
        dense
        flat
        square
        class="q-my-lg"
        table-header-class="bg-primary-50"
        :columns="cols"
        :rows="appointments"
        row-key="refno"
        v-model:pagination="pagination"
        :selection="editMode ? 'multiple' : 'none'"
        v-model:selected="selected"
        hide-pagination
      />
      <q-pagination
          class="self-center"
          v-model="pagination.page"
          color="accent"
          active-color="accent"
          active-text-color="white"
          active-design="unelevated"
          gutter="none"
          size="lg"
          :max="pagesNumber"
          direction-links
          outline
      />
      <div style="width:800px; max-width:800px;" class="self-center row q-my-xl q-col-gutter-md justify-center">
        <div class="col">
          <q-btn
              style="height:8.5rem;"
              color="white"
          >
            <q-card flat style="text-transform: none;" class="full-width column items-stretch justify-between q-px-sm q-py-md q-gutter-xs">
              <div class="q-mb-md col-12 text-left">
                <q-icon name="calendar_month" color="accent" />
                <span class="text-bold text-base q-ml-md">Appointment Schedule</span>
              </div>
              <div class="text-left text-grey col-12 q-my-none q-mb-xs row justify-start">
                <p>Update available hours and appointment times for the clinic.</p>
              </div>
            </q-card>
          </q-btn>
        </div>
        <div class="col">
          <q-btn
              style="height:8.5rem;"
              color="white"
          >
            <q-card flat style="text-transform: none;" class="full-width column items-stretch justify-baseline q-px-sm q-py-md q-gutter-xs">
              <div class="q-mb-md col-12 text-left">
                <q-icon name="info" color="accent" />
                <span class="text-bold text-base q-ml-md">Clinic Information</span>
              </div>
              <div class="text-left text-grey col-12 q-my-none q-mb-xs row justify-start">
                <p>Update information about the clinic including services offered, operating hours, and veterinarians available.</p>
              </div>
            </q-card>
          </q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="confirmDeleteDialog">
      <q-card style="width:50vw;">
        <q-card-section class="q-pa-md column items-stretch q-gutter-md">
          <div class="row col-12 q-col-gutter-md q-py-md q-pl-md">
            <p class="text-bold text-primary text-h6">
              Are you sure you want to delete the selected appointment(s)?
            </p>
          </div>
          <div class="col-12">
            <q-btn unelevated color="red" class="full-width text-bold q-py-md" label="Confirm"
            @click="() => { deleteAppointments(); confirmDeleteDialog = false; }"
            />
            <q-btn unelevated outline class="full-width text-bold q-py-md q-mt-sm" label="Cancel"
              @click="confirmDeleteDialog = false"
            />
          </div>
        </q-card-section>
      </q-card>
  </q-dialog>
    <q-dialog v-model="filterDialogOpen">
      <q-card style="width:50vw;">
        <q-card-section class="q-pa-md column items-stretch q-gutter-md">
          <div class="row col-12 q-col-gutter-md q-py-md q-pl-md">
            <q-input outlined class="col" icon="calendar-month" color="grey" type="date" label="Date From"
              v-model="filter.dateFrom"
            />
            <q-input outlined class="col" icon="calendar-month" color="grey" type="date" label="Date To"
              v-model="filter.dateTo"
            />
          </div>
          <div class="row col-12 q-col-gutter-md q-pl-md">
            <q-input outlined class="col" icon="calendar-month" color="grey" type="time" label="Time From"
              v-model="filter.timeFrom"
            />
            <q-input outlined class="col" icon="calendar-month" color="grey" type="time" label="Time To"
              v-model="filter.timeTo"
            />
          </div>
          <div class="col-12">
            <q-select outlined color="grey" label="Purpose"
              v-model="filter.purpose"
              :options="['Checkup', 'Follow-up', 'Other']"
            />
          </div>
          <div class="col-12">
            <q-btn unelevated color="primary" class="full-width text-bold q-py-md" label="Filter"
            @click="() => { getAppointments(); filterDialogOpen = false; }"
            />
            <q-btn unelevated outline class="full-width text-bold q-py-md q-mt-sm" label="Clear"
              @click="() => {
                filter = { dateFrom: '', dateTo: '', timeFrom: '', timeTo: '', purpose: '' };
                getAppointments();
                }"
            />
          </div>
        </q-card-section>
      </q-card>
  </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'AdminDashboardPage',
  components: {},
});
const cols = [
{ name: 'refno', required: true, label: 'Reference Number', field: row => row.refno, align: 'left', },
{ name: 'owner', required: true, label: 'Pet Owner Name', field: row => row.owner, align: 'left', },
{ name: 'purpose', required: true, label: 'Purpose', field: row => row.purpose, align: 'left', },
{ name: 'date_time', required: true, label: 'Date and Time', field: row => row.dt, align: 'left', sortable: true },
{ name: 'species', required: true, label: 'Species', field: row => row.species, align: 'left', },
{ name: 'petname', required: true, label: 'Pet Name', field: row => row.petname, align: 'left', },
];

</script>

<script setup>
  import { ref, computed } from 'vue';
  import { useAppointmentStore } from 'stores/appointment';
  import { watch } from 'vue';
  import { onMounted } from 'vue';
  import { debounce } from 'src/extras/misc';

  const $q = useQuasar();

  const appointmentStore = useAppointmentStore();
  const appointments = ref([]);

  const editMode = ref(false);
  const selected = ref([]);
  const confirmDeleteDialog = ref(false);

  const formatDateString = (originalDateString) => {
    let date = new Date(originalDateString);

    // Format the date
    let options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
}

  const search = ref('');
  watch(
  () => search.value,
  debounce(async () => await getAppointments(), 500)
);


  const filter = ref({
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
    purpose: '',
  })

  const filterDialogOpen = ref(false);

  const getAppointments = async () => {
    const { code, data } = await appointmentStore.list({
      search: search.value,
      dateFrom: filter.value.dateFrom,
      dateTo: filter.value.dateTo,
      timeFrom: filter.value.timeFrom,
      timeTo: filter.value.timeTo,
      purpose: filter.value.purpose,
    });
    if (code === 200) {
      appointments.value = data.map((appointment) => ({
        refno: appointment.reference_number,
        owner: appointment.first_name + ' ' + appointment.last_name,
        purpose: appointment.purpose,
        dt: formatDateString(appointment.date + ' ' + appointment.time_from),
        species: appointment.pets.map((pet) => pet.species).join(', '),
        petname: appointment.pets.map((pet) => pet.name).join(', '),
      }));
      return;
    }
    $q.notify({
      message: 'Something went wrong to the server.',
      color: 'negative',
    });
  };

  const deleteAppointments = async () => {

    if (selected.value.length === 0) {
      $q.notify({
        message: 'No appointment(s) selected.',
        color: 'negative',
      });
      return;
    }

    const { code, data, message } = await appointmentStore.delete(selected.value.map((appointment) => appointment.refno));
    if (code === 200) {
      $q.notify({
        message: 'Appointment(s) deleted successfully.',
        color: 'positive',
      });
      selected.value = [];
      appointments.value = [];
      getAppointments();
      return;
    }
    console.log(message);
    $q.notify({
      message: 'Something went wrong to the server.',
      color: 'negative',
    });
  };

  const pagesNumber = computed(() => Math.ceil(appointments.value.length / pagination.value.rowsPerPage));
  const pagination = ref({
    sortBy: 'date_time',
    descending: false,
    page: 1,
    rowsPerPage: 20,
  });

  onMounted(() => {
    getAppointments();
  });

</script>
