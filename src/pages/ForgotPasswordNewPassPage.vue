
<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-sm-11 col-md-10 col-md-8 col-lg-6">
        <q-card flat>
          <q-card-section class="q-mb-none">
            <div class="row q-mb-lg justify-center">
              <q-img :src="Logo" style="height: 8rem; max-width: 5.5rem;"/>
              <h4 class="q-mx-lg text-primary text-uppercase text-weight-bolder">Vet 119</h4>
              <q-separator class="q-mx-lg" vertical />
              <h4 class="q-mx-lg text-primary text-weight-bold">Login</h4>
            </div>
            <p class="text-subtitle1 text-negative" v-if="!!formError">
              {{ formError }}
            </p>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <CustomPasswordInput
                  color="accent"
                  outlined
                  label="Enter New Password"
                  v-model="password"
                />
              </div>
              <div class="col-12">
                <CustomPasswordInput
                  color="accent"
                  outlined
                  label="Re-enter New Password"
                  v-model="password_confirmation"

                />
              </div>
              <div class="col-12">
                <q-btn
                  color="primary"
                  class="q-py-lg text-capitalize text-body1 text-bold"
                  style="width: 100%"
                  :disable="isFormLoading"
                  :loading="isFormLoading"
                  @click="onConfirmNewPassword"
                  >Confirm New Password</q-btn
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
import CustomPasswordInput from 'components/CustomPasswordInput.vue';
export default defineComponent({
  name: 'ForgotPasswordNewPassPage',
  components: {},
});
</script>
<script setup>
import Logo from 'assets/vet119-logo-medium.png';

import { ref } from 'vue';
import { useResetStore } from 'src/stores/reset';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
// get url params
import { useRoute } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const isFormLoading = ref(false);
const formError = ref('');
const { reset } = useResetStore();

const reset_code = ref(route.params.code);
const password = ref('');
const password_confirmation = ref('');

const onConfirmNewPassword = async () => {
  isFormLoading.value = true;

  if (password.value !== password_confirmation.value) {
    formError.value = 'Passwords do not match';
    isFormLoading.value = false;
    return;
  }

  formError.value = '';
  const {code, message, data} = await reset(reset_code.value, password_confirmation.value)

  if (code === 200) {
    $q.notify({
      type: 'positive',
      message: 'Password reset successful',
    });
    console.log(response);
    router.push({ name: 'login-page' });
  } else {
    formError.value = message;
    $q.notify({
      type: 'negative',
      message: message,
    });
  }

  isFormLoading.value = false;
};
</script>
