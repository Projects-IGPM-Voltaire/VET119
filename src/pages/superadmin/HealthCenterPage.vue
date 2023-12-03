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
          <div class="flex justify-between">
            <div>
              <q-input
                dense
                placeholder="Search"
                outlined
                clearable
                v-model="search"
              >
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
          <q-table flat :rows="healthCenters" :columns="columns" row-key="name">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="image" :props="props">
                  <q-img
                    :src="toPublicImage(props.row.image.path)"
                    width="10rem"
                    v-if="objetHasValue(props.row.image)"
                  />
                  <span class="text-grey-6" v-else>No Image.</span>
                </q-td>
                <q-td class="text-bold" key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="address" :props="props">
                  <a :href="props.row.address.map_url" target="_blank">{{
                    toAddress(props.row.address)
                  }}</a>
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn
                    flat
                    icon="edit"
                    dense
                    rounded
                    @click="onOpenViewEntryDialog(props.row)"
                  />
                  <q-btn flat icon="delete" dense rounded class="text-red" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </q-card-section>
    </q-card>
    <SuperadminHealthCenterNewEntryDialog
      v-model="isNewEntryDialog"
      @onCreateSuccess="getHealthCenters"
    />
    <SuperadminHealthCenterViewEntryDialog
      :health-center="healthCenter"
      v-model="isViewEntryDialog"
      v-if="objetHasValue(healthCenter)"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AdminHealthCenterPage',
  components: {},
});
</script>

<script setup>
import { ref, watch } from 'vue';
import SuperadminHealthCenterNewEntryDialog from 'components/superadmin/health-centers/NewEntryDialog.vue';
import SuperadminHealthCenterViewEntryDialog from 'components/superadmin/health-centers/ViewEntryDialog.vue';
import { useHealthCenterStore } from 'stores/healthCenter';
import { useQuasar } from 'quasar';
import { debounce, toAddress, toPublicImage } from 'src/extras/misc';
import { objetHasValue } from 'src/extras/object';

const healthCenterStore = useHealthCenterStore();
const $q = useQuasar();

const columns = [
  {
    name: 'image',
    field: 'image',
    align: 'left',
    label: 'Image',
    sortable: false,
  },
  {
    name: 'name',
    field: 'name',
    align: 'left',
    label: 'Name',
    sortable: false,
  },
  {
    name: 'address',
    align: 'left',
    label: 'Address',
    field: 'address',
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

const healthCenters = ref([]);
const isNewEntryDialog = ref(false);
const isViewEntryDialog = ref(false);
const search = ref(null);
const healthCenter = ref(null);

const onOpenNewEntryDialog = () =>
  (isNewEntryDialog.value = !isNewEntryDialog.value);
const onOpenViewEntryDialog = (data) => {
  healthCenter.value = Object.assign(data);
  isViewEntryDialog.value = !isViewEntryDialog.value;
};

const getHealthCenters = async () => {
  const { code, data } = await healthCenterStore.list({
    search: search.value || null,
  });
  if (code === 200) {
    healthCenters.value = data;
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};

watch(
  () => search.value,
  debounce(async () => await getHealthCenters(), 500)
);

getHealthCenters();
</script>
