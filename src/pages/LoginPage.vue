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
                  v-model="form.email"
                />
              </div>
              <div class="col-12">
                <CustomPasswordInput
                  color="accent"
                  outlined
                  label="Password"
                  v-model="form.password"
                />
                <router-link
                    class="row inline"
                    style="text-decoration: none"
                    :to="{ name: 'forgot-email-page' }"
                >
                  <span class="text-caption text-grey-7">Forgot password?</span>
                </router-link>
              </div>
              <div class="col-12">
                <q-btn
                  color="primary"
                  class="q-py-lg text-capitalize text-body1 text-bold"
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
                class="text-accent text-bold"
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
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import CustomPasswordInput from 'components/CustomPasswordInput.vue';
import Logo from 'assets/vet119-logo-medium.png';

const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const form = ref({
  email: null,
  password: null,
});

const formError = ref(null);
const isFormLoading = ref(false);

const onLogin = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message, data } = await authStore.login(form.value);
  isFormLoading.value = false;
  if (code === 200) {
    const { user } = data;
    let routeName = null;
    if (user.level === 'admin') {
      routeName = 'admin-dashboard-page';
    } else {
      routeName = 'home-page';
    }
    await router.push({ name: routeName });
    $q.notify({
      message: 'Login success!',
      color: 'positive',
    });
    return;
  }
  formError.value = message;
};
</script>
