<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 300px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-capitalize">
          Reset {{ user.first_name }} Password
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <p class="text-subtitle1 text-negative" v-if="!!formError">
          {{ formError }}
        </p>

        <div class="row q-col-gutter-md">
          <div class="col-12">
            <CustomPasswordInput
              outlined
              label="New password"
              v-model="form.password"
            />
          </div>
          <div class="col-12">
            <CustomPasswordInput
              outlined
              label="Confirm password"
              v-model="form.password_confirmation"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          label="Reset"
          color="primary"
          class="full-width text-capitalize"
          :loading="isFormLoading"
          :disable="isFormLoading"
          @click="onResetPassword"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminUserResetPasswordDialog',
});
</script>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user';
import CustomPasswordInput from 'components/CustomPasswordInput.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: false,
  },
});
const emit = defineEmits(['update:modelValue', 'onCreateSuccess']);

const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

const modelValueLocal = ref(props.modelValue);
const defaultForm = {
  password: null,
  password_confirmation: null,
};

let form = reactive(Object.assign({}, defaultForm));
const isFormLoading = ref(false);
const formError = ref(false);

const onResetPassword = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message } = await userStore.resetPassword({
    userID: props.user.id,
    password: form.password,
    passwordConfirmation: form.password_confirmation,
  });
  isFormLoading.value = false;
  if (code === 200) {
    $q.notify({
      message: 'User password reset successfully!',
      color: 'positive',
    });
    modelValueLocal.value = false;
    emit('onCreateSuccess');
    form = Object.assign({}, defaultForm);
    return;
  }
  formError.value = message;
};

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => {
    emit('update:modelValue', val);
    if (!val) {
      form = Object.assign({}, defaultForm);
      formError.value = null;
    }
  }
);
</script>
