<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Super Health Center</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-tabs v-model="tab" dense align="left" class="text-primary">
          <q-tab
            name="schedules"
            label="Schedules"
            class="text-capitalize text-black"
          />
          <q-tab
            name="users"
            label="users"
            class="text-capitalize text-black"
          />
          <q-tab
            name="about"
            label="About"
            class="text-capitalize text-black"
          />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="schedules">
            <q-table
              flat
              :rows="schedules"
              :columns="scheduleColumns"
              row-key="name"
            />
          </q-tab-panel>
          <q-tab-panel name="users">
            <q-table flat :rows="users" :columns="userColumns" row-key="name">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="image" :props="props">
                    <q-img :src="props.row.image" />
                  </q-td>
                  <q-td class="text-bold" key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="name" :props="props">
                    {{ props.row.type }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <q-btn flat icon="edit" dense rounded />
                    <q-btn flat icon="delete" dense rounded class="text-red" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="about">
            <div class="row q-col-gutter-md">
              <div class="col-12 q-mb-md">
                <div class="row q-col-gutter-md">
                  <div class="col-12 flex justify-center">
                    <q-img
                      src="https://pia.gov.ph/uploads/2023/06/ff17733667a781403e5a6d233eef9258-800-1200.jpg"
                      width="50%"
                      height="auto"
                      class="q-mx-auto"
                    />
                  </div>
                  <div class="col-12">
                    <q-input color="primary" outlined label="Name" />
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
                        <q-input
                          color="primary"
                          outlined
                          label="Google Map Link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <p class="text-subtitle2 text-grey-6">Services</p>
                <div class="row q-col-gutter-md">
                  <template v-for="n in 6" :key="n">
                    <div class="col-4">
                      <q-card>
                        <q-card-section>
                          <p class="text-subtitle1 text-bold q-mb-none">
                            Service {{ n }}
                          </p>
                          <div class="text-body2">lorem5</div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SuperadminHealthCenterViewEntryDialog",
});
</script>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const scheduleColumns = [
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
];
const schedules = [
  {
    date: "November 10, 2023",
    time: "6:00AM - 7:00AM",
    patient: "John Doe",
  },
];

const userColumns = [
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
const users = [
  {
    image:
      "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    name: "Dr. John Doe",
    type: "Dr or Staff",
  },
];

const modelValueLocal = ref(props.modelValue);
const tab = ref("schedules");

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit("update:modelValue", val)
);
</script>
