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
            <div>
              <q-input dense placeholder="Search" outlined clearable>
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div>
              <q-btn icon="filter_alt" flat rounded round dense></q-btn>
              <q-btn icon="sort" flat rounded round dense></q-btn>
            </div>
          </div>
          <q-table flat :rows="rows" :columns="columns" row-key="name">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="date" :props="props">
                  {{ props.row.date }}
                </q-td>
                <q-td key="time" :props="props">
                  {{ props.row.time }}
                </q-td>
                <q-td key="patient" :props="props">
                  {{ props.row.patient }}
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn
                    flat
                    icon="edit"
                    dense
                    rounded
                    @click="onOpenViewEntryDialog"
                  />
                  <q-btn flat icon="delete" dense rounded class="text-red" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </q-card-section>
    </q-card>
    <AdminScheduleNewEntryDialog v-model="isNewEntryDialog" />
    <AdminScheduleViewEntryDialog v-model="isViewEntryDialog" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AdminSchedulePage",
  components: {},
});
</script>

<script setup>
import { ref } from "vue";
import AdminScheduleNewEntryDialog from "components/admin/schedules/NewEntryDialog.vue";
import AdminScheduleViewEntryDialog from "components/admin/schedules/ViewEntryDialog.vue";

const columns = [
  {
    name: "date",
    field: "date",
    align: "left",
    label: "Date",
    sortable: false,
  },
  {
    name: "time",
    field: "time",
    align: "left",
    label: "Time",
    sortable: false,
  },
  {
    name: "patient",
    field: "patient",
    align: "left",
    label: "Patient",
    sortable: false,
  },
  {
    name: "actions",
    align: "left",
    label: "Actions",
    field: "actions",
    sortable: false,
  },
];
const sampleData = {
  date: "November 10, 2023",
  time: "7:00AM - 8:00AM",
  patient: "John Doe",
};
let rows = [sampleData];
for (let i = 1; i <= 20; i++) {
  rows = [...rows, sampleData];
}

const isNewEntryDialog = ref(false);
const isViewEntryDialog = ref(false);

const onOpenNewEntryDialog = () =>
  (isNewEntryDialog.value = !isNewEntryDialog.value);
const onOpenViewEntryDialog = () =>
  (isViewEntryDialog.value = !isViewEntryDialog.value);
</script>
