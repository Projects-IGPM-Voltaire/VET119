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
            <!--            <div>
              <q-btn icon="filter_alt" flat rounded round dense></q-btn>
              <q-btn icon="sort" flat rounded round dense></q-btn>
            </div>-->
          </div>
          <q-table flat :rows="filteredUsers" :columns="columns" row-key="name">
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
                    @click="onOpenViewEntryDialog(props.row)"
                  />
                  <q-btn
                    flat
                    icon="lock_reset"
                    dense
                    rounded
                    @click="onOpenResetPasswordDialog(props.row)"
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
        </div>
      </q-card-section>
    </q-card>
    <AdminUserNewEntryDialog
      :healthCenterID="healthCenterID"
      @onCreateSuccess="getUsers"
      v-model="isNewEntryDialogOpen"
    />
    <AdminUserResetPasswordDialog
      :user="user"
      @onCreateSuccess="getUsers"
      v-model="isResetPasswordDialogOpen"
      v-if="objetHasValue(user)"
    />
    <AdminUserViewEntryDialog
      :user="user"
      @onUpdateSuccess="getUsers"
      v-model="isViewEntryDialogOpen"
      v-if="objetHasValue(user)"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AdminUserPage',
  components: {},
});
</script>

<script setup>
import { computed, ref, watch } from 'vue';
import AdminUserNewEntryDialog from 'components/admin/users/NewEntryDialog.vue';
import AdminUserViewEntryDialog from 'components/admin/users/ViewEntryDialog.vue';
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user';
import { debounce, toPublicImage } from 'src/extras/misc';
import { objetHasValue } from 'src/extras/object';
import { useAuthStore } from 'stores/auth';
import AdminUserResetPasswordDialog from 'components/admin/users/ResetPasswordDialog.vue';

const userStore = useUserStore();
const authStore = useAuthStore();
const $q = useQuasar();

const users = ref([]);
const user = ref(null);
const search = ref(null);

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

const isNewEntryDialogOpen = ref(false);
const isViewEntryDialogOpen = ref(false);
const isResetPasswordDialogOpen = ref(false);

const authUser = computed(() => authStore.user);
const healthCenterID = computed(
  () => authUser.value.health_center_member.health_center_id
);
const filteredUsers = computed(() =>
  users.value.filter((user) => user.id !== authStore.user.id)
);

watch(
  () => search.value,
  debounce(async () => await getUsers(), 500)
);

const onOpenNewEntryDialog = () =>
  (isNewEntryDialogOpen.value = !isNewEntryDialogOpen.value);
const onOpenViewEntryDialog = (data) => {
  user.value = Object.assign(data);
  isViewEntryDialogOpen.value = !isViewEntryDialogOpen.value;
};
const onOpenResetPasswordDialog = (data) => {
  user.value = Object.assign(data);
  isResetPasswordDialogOpen.value = !isResetPasswordDialogOpen.value;
};
const getUsers = async () => {
  const { code, data } = await userStore.list({
    healthCenterID: healthCenterID.value,
    search: search.value || null,
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
</script>
