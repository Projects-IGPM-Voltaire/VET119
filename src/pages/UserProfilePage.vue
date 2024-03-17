<template>
  <q-page class="row flex-center q-pb-xl bg-secondary">
    <div class="col q-gutter-xl q-pl-xl q-py-xl" style="height: 70vh; padding-left: 20vw;">
      <h4 class="text-weight-bold text-capitalize text-primary">User Profile</h4>
      <div class="row q-gutter-xs">
        <div class="col-12">
          <p class="text-subtitle2 text-bold text-primary-300 text-uppercase">
            Personal Information
          </p>
        </div>
        <div class="col-4"><span class="text-grey">First Name</span></div>
        <div class="col-7"><span class="text-base">{{ user.first_name }}</span></div>
        <div class="col-4"><span class="text-grey">Last Name</span></div>
        <div class="col-7"><span class="text-base">{{ user.last_name }}</span></div>
      </div>
      <div class="row q-gutter-xs">
        <div class="col-12">
          <p class="text-subtitle2 text-bold text-primary-300 text-uppercase">
            Account Information
          </p>
        </div>
        <div class="col-4"><span class="text-grey">Email</span></div>
        <div class="col-7"><span class="text-base">{{ user.email }}</span></div>
        <div class="col-4"><span class="text-grey">Contact Number</span></div>
        <div class="col-7"><span class="text-base">{{ user.mobile_number }}</span></div>
      </div>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'UserProfilePage',
  });
</script>

<script setup>
  import { computed } from 'vue';

  const authStore = useAuthStore();
  const user = computed(() => {
    return authStore.user;
  });
</script>
