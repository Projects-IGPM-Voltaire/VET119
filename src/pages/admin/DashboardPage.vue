<template>
  <q-page class="row justify-center items-start">
    <div style="width:1000px;max-width:1000px;" class="q-pb-xl column items-stretch">
      <h4 class="text-bold text-capitalize text-primary">Hi, Admin!</h4>
      <div class="row justify-between">
        <div class="col-8 row justify-start">
          <q-input outlined type="search" label="Search.." color="grey" class="col-7 q-mr-md" />
          <q-btn outline label="Filter" color="accent" class="col-4 q-py-md q-px-lg text-bold" />
        </div>
        <div class="col-3 row justify-end">
          <q-btn outline label="Add" color="accent" class="col-5 q-mr-xs q-py-sm q-px-lg text-bold" />
          <q-btn outline label="Edit" color="accent" class="col-5 q-py-sm q-px-lg text-bold" />
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
          :rows="dummyr"
          row-key="name"
          v-model:pagination="pagination"
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
          :max="1"
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
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
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

const dummyr = [
  {
    refno: '092924-0021-001',
    owner: 'Maria Santos',
    purpose: 'vaccination',
    date_time: "Sept 29, 08:00 AM",
    species: 'dog',
    petname: 'Buddy',
  },
];
</script>

<script setup>
  import { ref, computed } from 'vue';

  const pagesNumber = computed(() => Math.ceil(dummyr.length / pagination.value.rowsPerPage));
  const pagination = ref({
    sortBy: 'date_time',
    descending: false,
    page: 1,
    rowsPerPage: 20,
  });
</script>
