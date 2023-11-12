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
            <div class="row q-col-gutter-lg">
              <div class="col-12">
                <p class="text-subtitle2 text-grey-6">Personal Information</p>
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-input color="primary" outlined label="First Name" />
                  </div>
                  <div class="col-6">
                    <q-input color="primary" outlined label="Last Name" />
                  </div>
                  <div class="col-12">
                    <q-input color="primary" outlined label="Birthday" />
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
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <p class="text-subtitle2 text-grey-6">Account Details</p>
                  <q-input color="primary" outlined label="Mobile No." />
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
                  <q-input
                    type="password"
                    color="primary"
                    outlined
                    label="Password Confirmation"
                  />
                </div>
              </div>
              <div class="col-12">
                <q-btn
                  color="primary"
                  class="text-capitalize"
                  style="width: 100%"
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
import { defineComponent } from "vue";
export default defineComponent({
  name: "RegisterPage",
  components: {},
});
</script>
