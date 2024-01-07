<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 1200px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Super Health Center</div>
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
                <div class="row q-col-gutter-md">
                  <div class="col-12 text-center" v-if="imagePreview">
                    <q-img
                      :src="imagePreview"
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
                      readonly
                      v-model="healthCenterLocal.name"
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
                          readonly
                          v-model="healthCenterLocal.address.house_number"
                        />
                      </div>
                      <div class="col-8">
                        <q-input
                          color="primary"
                          outlined
                          label="Street"
                          readonly
                          v-model="healthCenterLocal.address.street"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          color="primary"
                          outlined
                          readonly
                          v-model="healthCenterLocal.address.barangay.name"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          color="primary"
                          outlined
                          label="Google Map Link"
                          readonly
                          v-model="healthCenterLocal.address.map_url"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--              <div class="col-12">-->
              <!--                <p class="text-subtitle2 text-grey-6">Services</p>-->
              <!--                <div class="row q-col-gutter-md">-->
              <!--                  <template v-for="n in 6" :key="n">-->
              <!--                    <div class="col-4">-->
              <!--                      <q-card>-->
              <!--                        <q-card-section>-->
              <!--                          <p class="text-subtitle1 text-bold q-mb-none">-->
              <!--                            Service {{ n }}-->
              <!--                          </p>-->
              <!--                          <div class="text-body2">lorem5</div>-->
              <!--                        </q-card-section>-->
              <!--                      </q-card>-->
              <!--                    </div>-->
              <!--                  </template>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--              -->
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
            <q-table flat :rows="users" :columns="userColumns" row-key="name">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="image" :props="props">
                    <q-img
                      :src="toPublicImage(props.row.image.path)"
                      width="10rem"
                      height="10rem"
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
            <q-table
              flat
              :rows="schedules"
              :columns="scheduleColumns"
              row-key="name"
            />
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
import { toPublicImage } from 'src/extras/misc';
import { objetHasValue } from 'src/extras/object';
import AdminUserViewEntryDialog from 'components/admin/users/ViewEntryDialog.vue';
import AdminUserNewEntryDialog from 'components/admin/users/NewEntryDialog.vue';
import { useQuasar } from 'quasar';
import AdminUserResetPasswordDialog from 'components/admin/users/ResetPasswordDialog.vue';

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
const emit = defineEmits(['update:modelValue']);

const userStore = useUserStore();
const $q = useQuasar();

const scheduleColumns = [
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
];
const schedules = [
  {
    date: 'November 10, 2023',
    time: '6:00AM - 7:00AM',
    patient: 'John Doe',
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

const imagePreview = computed(() =>
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
const getUsers = async () => {
  const { code, data } = await userStore.list({
    healthCenterID: healthCenterLocal.value.id,
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
getUsers();

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);

getUsers();
</script>
