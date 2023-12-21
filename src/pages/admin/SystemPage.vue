<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="q-mb-none">
        <div class="flex justify-between">
          <div>
            <h4 class="text-h4 q-my-none text-bold flex items-center">
              System Settings
              <q-badge class="q-ml-xs bg-primary">Admin</q-badge>
            </h4>
            <p class="text-subtitle1">Manage system settings.</p>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-card>
          <q-card-section>
            <p class="subtitle-1">Profile</p>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input color="primary" outlined label="Name" />
              </div>
              <div class="col-12">
                <q-input
                  @update:model-value="
                    (val) => {
                      file = val[0];
                    }
                  "
                  outlined
                  type="file"
                  hint="Image"
                />
              </div>

              <div class="col-12">
                <p class="text-subtitle2 text-grey-6">Address</p>
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      color="primary"
                      outlined
                      label="House number or building"
                    />
                  </div>
                  <div class="col-8">
                    <q-input color="primary" outlined label="Street" />
                  </div>
                  <div class="col-12">
                    <q-input color="primary" outlined label="Region" />
                  </div>
                  <div class="col-12">
                    <q-input color="primary" outlined label="Province" />
                  </div>
                  <div class="col-12">
                    <q-input color="primary" outlined label="Barangay" />
                  </div>
                  <div class="col-12">
                    <q-input color="primary" outlined label="Google Map Link" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="flex justify-between">
            <q-btn
              label="Save"
              color="primary"
              class="full-width text-capitalize"
            />
          </q-card-actions>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AdminSystemPage',
  components: {},
});
</script>

<script setup>
import { ref } from 'vue';

const selected = ref([]);

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'center',
    label: 'Calories',
    field: 'calories',
    sortable: true,
  },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
];

const getSelectedString = () => {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} record${
        selected.value.length > 1 ? 's' : ''
      } selected of ${rows.length}`;
};
</script>
