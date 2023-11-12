<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="q-mb-none">
        <div class="flex justify-between">
          <div>
            <h4 class="text-h4 q-my-none text-bold flex items-center">
              Users
              <q-badge class="q-ml-xs bg-primary">Admin</q-badge>
            </h4>
            <p class="text-subtitle1">Manage users.</p>
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
                  <q-img
                    :src="props.row.image"
                    position="center"
                    width="5rem"
                  />
                </q-td>
                <q-td class="text-bold" key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="birthday" :props="props">
                  {{ props.row.birthday }}
                </q-td>
                <q-td key="type" :props="props">
                  {{ props.row.type }}
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
    <AdminUserNewEntryDialog v-model="isNewEntryDialog" />
    <AdminUserViewEntryDialog v-model="isViewEntryDialog" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AdminUserPage",
  components: {},
});
</script>

<script setup>
import { ref } from "vue";
import AdminUserNewEntryDialog from "components/admin/users/NewEntryDialog.vue";
import AdminUserViewEntryDialog from "components/admin/users/ViewEntryDialog.vue";

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
    name: "birthday",
    field: "birthday",
    align: "left",
    label: "Birthday",
    sortable: false,
  },
  {
    name: "type",
    field: "type",
    align: "left",
    label: "Type",
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
    "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
  name: "John Doe",
  birthday: "May 21, 2000",
  type: "Doctor or Staff",
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
