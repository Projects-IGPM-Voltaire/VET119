<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-md-10 col-lg-8 col-lg-6">
        <q-card flat>
          <q-card-section>
            <div class="text-left">
              <h5 class="text-bold text-primary q-mt-xl q-mb-xl">
                Create an Account
              </h5>
            </div>
            <p class="text-subtitle1 text-negative" v-if="!!formError">
              {{ formError }}
            </p>
            <div class="row q-gutter-lg q-pl-md justify-center">
              <div class="col-12">
                <p class="text-subtitle2 text-left text-accent text-uppercase text-bold">Personal Information</p>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      color="primary"
                      outlined
                      label="First Name"
                      v-model="form.first_name"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      color="primary"
                      outlined
                      label="Last Name"
                      v-model="form.last_name"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="row q-col-gutter-md">
                  <div class="col-12">
                    <p class="q-mb-none q-mt-xl text-subtitle2 text-left text-accent text-bold text-uppercase">Account Details</p>
                  </div>
                  <div class="col">
                    <q-input
                      color="accent"
                      outlined
                      label="Email Address"
                      v-model="form.email"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      color="accent"
                      outlined
                      label="Mobile No."
                      v-model="form.mobile_number"
                    />
                  </div>
                  <div class="col-12">
                    <CustomPasswordInput
                      color="accent"
                      outlined
                      label="Password"
                      v-model="form.password"
                    />
                  </div>
                  <div class="col-12">
                    <CustomPasswordInput
                      color="accent"
                      outlined
                      label="Re-enter Password"
                      v-model="form.password_confirmation"
                    />
                  </div>
                </div>
              </div>
              <div class="col-3 q-my-xl">
                <q-btn
                  color="accent"
                  class="q-py-lg text-capitalize text-bold text-body1"
                  style="width: 100%"
                  @click="onRegister"
                  :loading="isFormLoading"
                  :disable="isFormLoading"
                  >Create Account</q-btn
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
export default defineComponent({
  name: 'RegisterPage',
});
</script>

<script setup>
import { ref } from 'vue';
import BaseInputDatePicker from 'components/BaseInputDatePicker.vue';
import { useAuthStore } from 'stores/auth';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import CustomHealthCenterSelect from 'components/CustomHealthCenterSelect.vue';
import CustomPasswordInput from 'components/CustomPasswordInput.vue';

const authStore = useAuthStore();
const $q = useQuasar();
const router = useRouter();

const form = ref({
  first_name: null,
  last_name: null,
  email: null,
  mobile_number: null,
  password: null,
  password_confirmation: null,
  level: 'guest',
});
const isFormLoading = ref(false);
const formError = ref(false);

const onRegister = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message } = await authStore.register(form.value);
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
