<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="width: 1200px; max-width: 1200px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ healthCenterLocal.name }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-tabs v-model="tab" dense align="left" class="text-primary">
          <q-tab
            name="about"
            label="About"
            class="text-capitalize text-black"
          />
          <q-tab
            name="users"
            label="users"
            class="text-capitalize text-black"
          />
          <q-tab
            name="schedules"
            label="Schedules"
            class="text-capitalize text-black"
          />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="about">
            <div class="row q-col-gutter-md">
              <div class="col-12 q-mb-md">
                <div class="col-12">
                  <p
                    class="text-subtitle1 text-negative"
                    v-if="!!healthCenterFormError"
                  >
                    {{ healthCenterFormError }}
                  </p>
                </div>
                <div class="row q-col-gutter-md">
                  <div
                    class="col-12 text-center"
                    v-if="healthCenterImagePreview"
                  >
                    <q-img
                      :src="healthCenterImagePreview"
                      width="10rem"
                      height="10rem"
                      position="center"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      color="primary"
                      outlined
                      label="Name"
                      v-model="healthCenterForm.name"
                    />
                  </div>
                  <div class="col-12">
                    <div class="col-12">
                      <q-input
                        @update:model-value="
                          (val) => {
                            file = val[0];
                          }
                        "
                        outlined
                        type="file"
                        hint="New Image"
                        clearable
                        @clear="healthCenterForm.image = null"
                        v-model="healthCenterForm.image"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <p class="text-subtitle2 text-grey-6">Address</p>
                    <div class="row q-col-gutter-md">
                      <div class="col-4">
                        <q-input
                          color="primary"
                          outlined
                          label="House number or building"
                          v-model="healthCenterForm.house_number"
                        />
                      </div>
                      <div class="col-8">
                        <q-input
                          color="primary"
                          outlined
                          label="Street"
                          v-model="healthCenterForm.street"
                        />
                      </div>
                      <!--                      <div class="col-12">
                        <CustomBarangaySelect
                          color="primary"
                          outlined
                          v-model="healthCenterForm.barangay_code"
                        />
                      </div>-->
                      <div class="col-12">
                        <q-input
                          color="primary"
                          outlined
                          label="Google Map Link"
                          v-model="healthCenterForm.map_url"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <q-btn
                      label="Update"
                      color="primary"
                      class="full-width text-capitalize"
                      :loading="isHealthCenterFormLoading"
                      :disable="isHealthCenterFormLoading"
                      @click="onUpdateHealthCenter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="users">
            <div class="flex justify-between">
              <div></div>
              <div>
                <q-btn
                  outline
                  class="text-capitalize text-black"
                  @click="onOpenNewUserEntryDialog"
                >
                  <q-icon name="add" class="q-mr-xs" /> Add
                  <span class="q-ml-xs text-lowercase">new entry</span>
                </q-btn>
              </div>
            </div>
            <div class="flex justify-between q-mt-lg">
              <div>
                <q-input
                  dense
                  placeholder="Search"
                  outlined
                  clearable
                  v-model="searchUser"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div>
                <!--
                <q-btn icon="filter_alt" flat rounded round dense></q-btn>
                <q-btn icon="sort" flat rounded round dense></q-btn>
-->
              </div>
            </div>
            <q-table flat :rows="users" :columns="userColumns" row-key="name">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="image" :props="props">
                    <q-img
                      :src="toPublicImage(props.row.image.path)"
                      width="5rem"
                      height="5rem"
                      position="center"
                      v-if="objetHasValue(props.row.image)"
                    />
                    <span class="text-grey-6" v-else>No Image.</span>
                  </q-td>
                  <q-td class="text-bold" key="name" :props="props">
                    {{ props.row.first_name }} {{ props.row.last_name }}
                  </q-td>
                  <q-td key="mobile-number" :props="props">
                    {{ props.row.mobile_number }}
                  </q-td>
                  <q-td key="name" class="text-capitalize" :props="props">
                    {{ props.row.health_center_member.position }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <q-btn
                      flat
                      icon="edit"
                      dense
                      rounded
                      @click="onOpenViewUserEntryDialog(props.row)"
                    />
                    <q-btn
                      flat
                      icon="lock_reset"
                      dense
                      rounded
                      @click="onOpenResetUserPasswordDialog(props.row)"
                    />
                    <q-btn
                      flat
                      icon="delete"
                      dense
                      rounded
                      class="text-red"
                      @click="deleteUser(props.row.id)"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="schedules">
            <div class="flex justify-between">
              <div></div>
              <div>
                <q-btn
                  outline
                  class="text-capitalize text-black"
                  @click="onOpenNewScheduleEntryDialog"
                >
                  <q-icon name="add" class="q-mr-xs" /> Add
                  <span class="q-ml-xs text-lowercase">new entry</span>
                </q-btn>
              </div>
            </div>
            <div class="flex justify-between q-mt-lg">
              <div></div>
              <!--              <div>
                <q-btn icon="filter_alt" flat rounded round dense></q-btn>
                <q-btn icon="sort" flat rounded round dense></q-btn>
              </div>-->
            </div>
            <div class="q-py-md">
              <q-table
                flat
                :rows="schedules"
                :columns="scheduleColumns"
                row-key="name"
              >
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
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
    <AdminUserNewEntryDialog
      :healthCenterID="healthCenterLocal.id"
      @onCreateSuccess="getUsers"
      v-model="isNewUserEntryDialogOpen"
    />
    <AdminUserResetPasswordDialog
      :user="userLocal"
      @onCreateSuccess="getUsers"
      v-model="isResetUserPasswordDialogOpen"
      v-if="objetHasValue(userLocal)"
    />
    <AdminUserViewEntryDialog
      :user="userLocal"
      @onUpdateSuccess="getUsers"
      v-model="isViewUserEntryDialogOpen"
      v-if="objetHasValue(userLocal)"
    />
    <AdminScheduleNewEntryDialog
      :healthCenterID="healthCenterLocal.id"
      @onCreateSuccess="getSchedules"
      v-model="isNewScheduleEntryDialogOpen"
      v-if="isNewScheduleEntryDialogOpen"
    />
    <AdminScheduleViewEntryDialog v-model="isViewScheduleEntryDialogOpen" />
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SuperadminHealthCenterViewEntryDialog',
});
</script>

<script setup>
import { computed, ref, watch } from 'vue';
import { useUserStore } from 'stores/user';
import { debounce, toPublicImage } from 'src/extras/misc';
import { objetHasValue } from 'src/extras/object';
import AdminUserViewEntryDialog from 'components/admin/users/ViewEntryDialog.vue';
import AdminUserNewEntryDialog from 'components/admin/users/NewEntryDialog.vue';
import { useQuasar } from 'quasar';
import AdminUserResetPasswordDialog from 'components/admin/users/ResetPasswordDialog.vue';
import { useScheduleStore } from 'stores/schedule';
import AdminScheduleViewEntryDialog from 'components/admin/schedules/ViewEntryDialog.vue';
import AdminScheduleNewEntryDialog from 'components/admin/schedules/NewEntryDialog.vue';
import { useHealthCenterStore } from 'stores/healthCenter';
import CustomBarangaySelect from 'components/CustomBarangaySelect.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  healthCenter: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue', 'onUpdateHealthCenterSuccess']);

const userStore = useUserStore();
const scheduleStore = useScheduleStore();
const $q = useQuasar();
const healthCenterStore = useHealthCenterStore();

const scheduleColumns = [
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
const userColumns = [
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
    name: 'mobile-number',
    field: 'mobile-number',
    align: 'left',
    label: 'Mobile No.',
    sortable: false,
  },
  {
    name: 'type',
    field: 'type',
    align: 'left',
    label: 'Type',
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

const modelValueLocal = ref(props.modelValue);
const tab = ref('about');
const healthCenterLocal = ref(Object.assign({}, props.healthCenter));
const users = ref([]);
const userLocal = ref(null);
const isNewUserEntryDialogOpen = ref(false);
const isViewUserEntryDialogOpen = ref(false);
const isResetUserPasswordDialogOpen = ref(false);
const schedules = ref([]);
const isNewScheduleEntryDialogOpen = ref(false);
const isViewScheduleEntryDialogOpen = ref(false);
const searchUser = ref(null);
const isHealthCenterFormLoading = ref(false);
const healthCenterFormError = ref(false);
const defaultHealthCenterForm = {
  name: props.healthCenter.name,
  image: null,
  house_number: props.healthCenter.address.house_number,
  street: props.healthCenter.address.street,
  city_code: '137504',
  barangay_code: props.healthCenter.address.barangay_code,
  map_url: props.healthCenter.address.map_url,
};
const healthCenterForm = ref(Object.assign({}, defaultHealthCenterForm));

const healthCenterImagePreview = computed(() =>
  props.healthCenter.image ? toPublicImage(props.healthCenter.image.path) : null
);

const onOpenNewUserEntryDialog = () =>
  (isNewUserEntryDialogOpen.value = !isNewUserEntryDialogOpen.value);
const onOpenViewUserEntryDialog = (data) => {
  userLocal.value = Object.assign({}, data);
  isViewUserEntryDialogOpen.value = !isViewUserEntryDialogOpen.value;
};
const onOpenResetUserPasswordDialog = (data) => {
  userLocal.value = Object.assign({}, data);
  isResetUserPasswordDialogOpen.value = !isResetUserPasswordDialogOpen.value;
};
const onOpenNewScheduleEntryDialog = () =>
  (isNewScheduleEntryDialogOpen.value = !isNewScheduleEntryDialogOpen.value);
const onOpenViewScheduleEntryDialog = () =>
  (isViewScheduleEntryDialogOpen.value = !isViewScheduleEntryDialogOpen.value);
const getUsers = async () => {
  const { code, data } = await userStore.list({
    healthCenterID: healthCenterLocal.value.id,
    search: searchUser.value || null,
  });
  if (code === 200) {
    users.value = data;
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};
const deleteUser = async (userID) => {
  const { code } = await userStore.delete(userID);
  if (code === 200) {
    await getUsers();
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};
const getSchedules = async () => {
  const { code, data } = await scheduleStore.list({
    healthCenterID: healthCenterLocal.value.id,
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
const onUpdateHealthCenter = async () => {
  healthCenterFormError.value = null;
  isHealthCenterFormLoading.value = true;
  const { code, message } = await healthCenterStore.update({
    healthCenterID: healthCenterLocal.value.id,
    ...healthCenterForm.value,
  });
  isHealthCenterFormLoading.value = false;
  if (code === 200) {
    $q.notify({
      message: 'Health center updated successfully!',
      color: 'positive',
    });
    modelValueLocal.value = false;
    healthCenterForm.value.image = null;
    emit('onUpdateHealthCenterSuccess');
    return;
  }
  healthCenterFormError.value = message;
};

watch(
  () => searchUser.value,
  debounce(async () => await getUsers(), 500)
);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);

getUsers();
getSchedules();
</script>
