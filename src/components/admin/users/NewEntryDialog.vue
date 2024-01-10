<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="width: 600px; max-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add new User</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <p class="text-subtitle1 text-negative" v-if="!!formError">
          {{ formError }}
        </p>

        <div class="row q-col-gutter-md">
          <div class="col-12">
            <p class="text-subtitle2 text-grey-6">Personal Information</p>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  color="primary"
                  outlined
                  label="First Name"
                  v-model="form.first_name"
                />
              </div>
              <div class="col-6">
                <q-input
                  color="primary"
                  outlined
                  label="Last Name"
                  v-model="form.last_name"
                />
              </div>
              <div class="col-12">
                <BaseInputDatePicker
                  color="primary"
                  outlined
                  label="Birthday"
                  v-model="form.birthday"
                />
              </div>
              <div class="col-12">
                <q-input
                  @update:model-value="
                    (val) => {
                      file = val[0];
                    }
                  "
                  outlined
                  type="file"
                  hint="Image"
                  v-model="form.image"
                />
              </div>
            </div>
          </div>
          <div class="col-12">
            <q-select
              label="User type"
              outlined
              :options="userTypes"
              emit-value
              v-model="form.position"
            />
          </div>
          <div class="col-12">
            <p class="text-subtitle2 text-grey-6">Login Information</p>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  label="Mobile No."
                  outlined
                  v-model="form.mobile_number"
                ></q-input>
              </div>
              <div class="col-12">
                <CustomPasswordInput
                  label="Password"
                  outlined
                  v-model="form.password"
                />
              </div>
              <div class="col-12">
                <CustomPasswordInput
                  label="Password Confirmation"
                  outlined
                  v-model="form.password_confirmation"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          label="Save"
          color="primary"
          class="full-width text-capitalize"
          :loading="isFormLoading"
          :disable="isFormLoading"
          @click="onCreate"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminUserNewEntryDialog',
});
</script>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user';
import BaseInputDatePicker from 'components/BaseInputDatePicker.vue';
import CustomPasswordInput from 'components/CustomPasswordInput.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  healthCenterID: {
    type: Number,
    required: false,
  },
});
const emit = defineEmits(['update:modelValue', 'onCreateSuccess']);

const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

const modelValueLocal = ref(props.modelValue);
const defaultForm = {
  first_name: null,
  last_name: null,
  birthday: null,
  mobile_number: null,
  password: null,
  password_confirmation: null,
  position: null,
  level: 'admin',
};

let form = reactive(Object.assign({}, defaultForm));
const isFormLoading = ref(false);
const formError = ref(false);

const userTypes = [
  {
    label: `Doctor`,
    value: 'doctor',
  },
  {
    label: `Staff`,
    value: 'staff',
  },
];

const onCreate = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message } = await userStore.create({
    ...form,
    healthCenterID: props.healthCenterID,
  });
  isFormLoading.value = false;
  if (code === 200) {
    $q.notify({
      message: 'User created successfully!',
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
  (val) => emit('update:modelValue', val)
);
</script>
