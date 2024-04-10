<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-sm-11 col-md-10 col-md-8 col-lg-6">
        <q-card flat>
          <q-card-section class="q-mb-none">
            <div class="row q-pr-lg q-mb-lg justify-center">
              <q-img :src="Logo" height="9rem" width="8rem"
                           fit="cover"/>
              <h4 class="q-mx-lg text-primary text-uppercase text-weight-bolder">Vet 119</h4>
              <q-separator class="q-mx-lg" vertical />
              <h4 class="q-mx-lg text-primary text-weight-bold">Login</h4>
            </div>
            <p class="text-subtitle1 text-negative" v-if="!!formError">
              {{ formError }}
            </p>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  color="accent"
                  outlined
                  label="Email Address"
                  v-model="email"
                  type="email"
                />
              </div>
              <div class="col-12">
                <q-btn
                  color="primary"
                  class="q-py-lg text-capitalize text-body1 text-bold"
                  style="width: 100%"
                  @click="onSendOTP"
                  :disable="isFormLoading || linkSent"
                  :loading="isFormLoading"
                  >{{ linkSent ? 'Reset Link Sent' : 'Send Reset Link' }}</q-btn
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
  name: 'ForgotPasswordPage',
  components: {},
});
</script>
<script setup>
import Logo from 'assets/vet119-logo-medium.png';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useResetStore } from 'src/stores/reset';

const $q = useQuasar();
const { send } = useResetStore();

const email = ref('');
const isFormLoading = ref(false);
const linkSent = ref(false);

const onSendOTP = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.value)) {
    $q.notify({
      message: 'Invalid email address',
      color: 'negative',
      position: 'top',
      timeout: 3000,
    });
    return;
  }
  isFormLoading.value = true;
  send(email.value)
    .then(() => {
      $q.notify({
        message: 'Reset link sent to your email',
        color: 'positive',
        position: 'top',
        timeout: 3000,
      });
      linkSent.value = true;
    })
    .catch((error) => {
      $q.notify({
        message: error.message,
        color: 'negative',
        position: 'top',
        timeout: 3000,
      });
    })
    .finally(() => {
      isFormLoading.value = false;
    });

};

</script>
