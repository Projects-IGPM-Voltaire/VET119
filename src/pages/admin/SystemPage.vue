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
      <template v-if="booted">
        <q-card-section>
          <q-card>
            <p
              class="text-subtitle1 text-negative"
              v-if="!!operationHourFormError"
            >
              {{ operationHourFormError }}
            </p>
            <q-card-section>
              <p class="subtitle-1">Operation Hours</p>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <BaseInputTimePicker
                    label="Open Time"
                    outlined
                    v-model="operationHour.time_from"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <BaseInputTimePicker
                    label="Close Time"
                    outlined
                    disable-past-hours
                    :time-from="operationHour.time_from"
                    v-model="operationHour.time_to"
                  />
                </div>
              </div>
            </q-card-section>
            <q-card-actions>
              <q-btn
                label="Save"
                color="primary"
                class="full-width text-capitalize"
                :loading="isOperationHourFormLoading"
                :disable="isOperationHourFormLoading"
                @click="onUpdateOperationHour"
              />
            </q-card-actions>
          </q-card>
        </q-card-section>
      </template>
      <!--
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

-->
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
import { computed, onMounted, ref } from 'vue';
import BaseInputTimePicker from 'components/BaseInputTimePicker.vue';
import { useHealthCenterStore } from 'stores/healthCenter';
import { useAuthStore } from 'stores/auth';
import { useQuasar } from 'quasar';

const healthCenterStore = useHealthCenterStore();
const authStore = useAuthStore();
const $q = useQuasar();

const booted = ref(false);
const operationHour = ref({
  time_from: null,
  time_to: null,
});
const isOperationHourFormLoading = ref(false);
const operationHourFormError = ref(null);

const authUser = computed(() => authStore.user);
const healthCenterID = computed(
  () => authUser.value.health_center_member.center.id
);

const getOperationHour = async () => {
  const { code, data } = await healthCenterStore.getOperationHour({
    healthCenterID: healthCenterID.value,
  });
  if (code === 200) {
    operationHour.value = Object.assign({}, data);
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};
const onUpdateOperationHour = async () => {
  operationHourFormError.value = null;
  isOperationHourFormLoading.value = true;
  const { code, data, message } = await healthCenterStore.updateOperationHour({
    healthCenterID: healthCenterID.value,
    timeFrom: operationHour.value.time_from,
    timeTo: operationHour.value.time_to,
  });
  isOperationHourFormLoading.value = false;
  if (code === 200) {
    $q.notify({
      message: 'Operation hours saved successfully!',
      color: 'positive',
    });
    return;
  }
  operationHourFormError.value = message;
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};

onMounted(async () => {
  await getOperationHour();
  booted.value = true;
});
</script>
