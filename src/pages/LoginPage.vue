<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-sm-11 col-md-10 col-md-8 col-lg-6">
        <q-card flat>
          <q-card-section class="q-mb-none">
            <div class="text-center q-mb-xl">
              <h5 class="text-h5 text-bold q-my-none text-primary">
                MediQueue
              </h5>
            </div>
            <p class="text-subtitle1 text-negative" v-if="!!formError">
              {{ formError }}
            </p>
            <p class="text-subtitle2">Login to system using:</p>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  color="primary"
                  outlined
                  label="Mobile No."
                  v-model="form.username"
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
                <q-btn
                  color="primary"
                  class="text-capitalize"
                  style="width: 100%"
                  @click="onLogin"
                  :disable="isFormLoading"
                  :loading="isFormLoading"
                  >Login</q-btn
                >
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <p class="text-subtitle2 text-center">
              Don't have an account?
              <router-link
                :to="{ name: 'register-page' }"
                class="text-primary text-bold"
                style="text-decoration: none"
              >
                Register here
              </router-link>
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LoginPage',
  components: {},
});
</script>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const form = reactive({
  username: null,
  password: null,
});
const formError = ref(null);
const isFormLoading = ref(false);

const onLogin = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message, data } = await authStore.login(form);
  isFormLoading.value = false;
  if (code === 200) {
    $q.notify({
      message: 'Login success!',
      color: 'positive',
    });
    console.log(data);
    await router.push({ name: 'login-page' });
    return;
  }
  formError.value = message;
};
</script>
