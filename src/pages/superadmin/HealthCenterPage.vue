<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="q-mb-none">
        <div class="flex justify-between">
          <div>
            <h4 class="text-h4 q-my-none text-bold flex items-center">
              Health Centers
              <q-badge class="q-ml-xs bg-primary">Superadmin</q-badge>
            </h4>
            <p class="text-subtitle1">Manage health centers.</p>
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
          <div class="flex">
            <q-input dense placeholder="Search" outlined clearable>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <div></div>
          </div>
          <q-table flat :rows="rows" :columns="columns" row-key="name">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="image" :props="props">
                  <q-img :src="props.row.image" width="10rem" />
                </q-td>
                <q-td class="text-bold" key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="address" :props="props">
                  <a :href="props.row.address.link" target="_blank">{{
                    props.row.address.label
                  }}</a>
                </q-td>
                <q-td key="doctors" :props="props">
                  {{ props.row.doctors }}
                </q-td>
                <q-td key="doctors" :props="props">
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
    <SuperadminHealthCenterNewEntryDialog v-model="isNewEntryDialog" />
    <SuperadminHealthCenterViewEntryDialog v-model="isViewEntryDialog" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AdminHealthCenterPage",
  components: {},
});
</script>

<script setup>
import { ref } from "vue";
import SuperadminHealthCenterNewEntryDialog from "components/superadmin/health-centers/NewEntryDialog.vue";
import SuperadminHealthCenterViewEntryDialog from "components/superadmin/health-centers/ViewEntryDialog.vue";

const columns = [
  {
    name: "image",
    field: "image",
    align: "left",
    label: "Image",
    sortable: false,
  },
  {
    name: "name",
    field: "name",
    align: "left",
    label: "Name",
    sortable: false,
  },
  {
    name: "address",
    align: "left",
    label: "Address",
    field: "address",
    sortable: false,
  },
  {
    name: "doctors",
    align: "left",
    label: "No. of Doctors",
    field: "doctors",
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
  image:
    "https://pia.gov.ph/uploads/2023/06/ff17733667a781403e5a6d233eef9258-800-1200.jpg",
  name: "Super Health Center",
  address: {
    label: "San Mateo, Bulacan Philippines",
    link: "https://www.google.com/maps/place/Super+Health+Center+San+Mateo/@14.6935727,121.1198772,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ba3589fff545:0x4160e02915f88362!8m2!3d14.6935675!4d121.1224521!16s%2Fg%2F11bvv5b8__?entry=ttu",
  },
  doctors: 3,
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
