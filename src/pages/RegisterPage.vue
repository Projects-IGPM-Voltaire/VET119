<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-md-10 col-lg-8 col-lg-6">
        <q-card flat>
          <q-card-section>
            <div class="text-center">
              <h6 class="text-h6 q-mt-none q-mb-lg">
                Create your
                <span class="text-primary text-bold">MediQueue</span> Account
              </h6>
            </div>
            <p class="text-subtitle1 text-negative" v-if="!!formError">
              {{ formError }}
            </p>
            <div class="row q-col-gutter-lg">
              <div class="col-12">
                <p class="text-subtitle2 text-grey-6">Personal Information</p>
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-input
                      color="primary"
                      outlined
                      label="First Name"
                      v-model="form.first_name"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      color="primary"
                      outlined
                      label="Last Name"
                      v-model="form.last_name"
                    />
                  </div>
                  <div class="col-12">
                    <BaseInputDatePicker
                      color="primary"
                      outlined
                      label="Birthday"
                      v-model="form.birthday"
                    />
                  </div>
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
                      v-model="form.house_number"
                    />
                  </div>
                  <div class="col-8">
                    <q-input
                      color="primary"
                      outlined
                      label="Street"
                      v-model="form.street"
                    />
                  </div>
                  <div class="col-12">
                    <CustomBarangaySelect
                      color="primary"
                      outlined
                      label="Barangay"
                      v-model="form.barangay_code"
                    />
                  </div>
                  <div class="col-12">
                    <CustomHealthCenterSelect
                      color="primary"
                      outlined
                      label="Health center"
                      :disabled="form.barangay_code === null"
                      :barangayCode="form.barangay_code"
                      v-model="form.health_center_id"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <p class="text-subtitle2 text-grey-6">Account Details</p>
                    <q-input
                      color="primary"
                      outlined
                      label="Mobile No."
                      v-model="form.mobile_number"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      type="password"
                      color="primary"
                      outlined
                      label="Password"
                      v-model="form.password"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      type="password"
                      color="primary"
                      outlined
                      label="Password Confirmation"
                      v-model="form.password_confirmation"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <q-btn
                  color="primary"
                  class="text-capitalize"
                  style="width: 100%"
                  @click="onRegister"
                  :loading="isFormLoading"
                  :disable="isFormLoading"
                  >Register</q-btn
                >
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import CustomBarangaySelect from 'components/CustomBarangaySelect.vue';
export default defineComponent({
  name: 'RegisterPage',
  components: { CustomBarangaySelect },
});
</script>

<script setup>
import { reactive, ref } from 'vue';
import BaseInputDatePicker from 'components/BaseInputDatePicker.vue';
import { useAuthStore } from 'stores/auth';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import CustomHealthCenterSelect from 'components/CustomHealthCenterSelect.vue';

const authStore = useAuthStore();
const $q = useQuasar();
const router = useRouter();

const form = reactive({
  first_name: null,
  last_name: null,
  birthday: null,
  mobile_number: null,
  password: null,
  password_confirmation: null,
  level: 'guest',
  city_code: '137504',
  barangay_code: null,
  house_number: null,
  street: null,
  health_center_id: null,
});
const isFormLoading = ref(false);
const formError = ref(false);

const onRegister = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message } = await authStore.register(form);
  isFormLoading.value = false;
  if (code === 200) {
    await router.push({ name: 'login-page' });
    $q.notify({
      message: 'Account registered successfully!',
      caption: 'You will be redirect to the login page...',
      color: 'positive',
    });
    return;
  }
  formError.value = message;
};
</script>
