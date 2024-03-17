<template>
  <q-page padding>
    <div class="row justify-center q-mb-none q-col-gutter-md">
      <div class="col-12 col-sm-11 col-md-10 col-md-8 col-lg-6">
        <q-card flat>
          <q-card-section class="q-mb-none">
            <div class="row q-mb-lg justify-center">
              <q-img :src="Logo" style="height: 8rem; max-width: 5.5rem;"/>
              <h4 class="q-mx-lg text-primary text-uppercase text-weight-bolder">Vet 119</h4>
              <q-separator class="q-mx-lg" vertical />
              <h4 class="q-mx-lg text-primary text-weight-bold">Login</h4>
            </div>
          </q-card-section>
          <q-card-section class="q-mb-xl q-gutter-md column flex-center">
            <q-icon name="check_circle_outline" color="accent" size="7rem"/>
            <p class="col-7 text-body1 text-center">Your account is now verified. You can now login to access our services. Thank you very much!</p>
            <q-btn color="accent" class="full-width text-body1 text-bold q-px-md q-py-md" label="Proceed to Login" :to="{ name: 'login-page' }" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EmailVerifPage',
  components: {},
});
</script>
<script setup>
  import Logo from "assets/vet119-logo-medium.png";
</script>
