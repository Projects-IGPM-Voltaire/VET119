<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-sm-11 col-md-10 col-md-8 col-lg-6">
        <q-card flat>
          <q-card-section class="q-mb-none">
            <div class="text-center q-mb-xl">
              <h5 class="text-h5 text-bold q-my-none text-primary">
                MediQueue Admin
              </h5>
            </div>
            <p class="text-subtitle2">Login to system using:</p>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input color="primary" outlined label="Username" />
              </div>
              <div class="col-12">
                <q-input
                  type="password"
                  color="primary"
                  outlined
                  label="Password"
                />
              </div>
              <div class="col-12">
                <q-btn
                  color="primary"
                  class="text-capitalize"
                  style="width: 100%"
                  :to="{ name: 'admin-dashboard-page' }"
                  >Login</q-btn
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
  name: 'AdminLoginPage',
  components: {},
});
</script>
