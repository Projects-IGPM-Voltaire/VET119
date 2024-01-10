<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">View {{ userLocal.first_name }} Details</div>
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
              <div class="col-12 text-center" v-if="imagePreview">
                <q-img
                  :src="imagePreview"
                  width="10rem"
                  height="10rem"
                  position="center"
                />
              </div>
              <div class="col-6">
                <q-input
                  color="primary"
                  outlined
                  label="First Name"
                  v-model="userLocal.first_name"
                />
              </div>
              <div class="col-6">
                <q-input
                  color="primary"
                  outlined
                  label="Last Name"
                  v-model="userLocal.last_name"
                />
              </div>
              <div class="col-12">
                <q-input
                  color="primary"
                  outlined
                  label="Birthday"
                  v-model="userLocal.birthday"
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
                  hint="New Image"
                  clearable
                  @clear="userLocal.image = null"
                  v-model="userLocal.image"
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
              v-model="userLocal.position"
            ></q-select>
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          label="Update"
          color="primary"
          class="full-width text-capitalize"
          :loading="isFormLoading"
          :disable="isFormLoading"
          @click="onUpdate"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminUserViewEntryDialog',
});
</script>

<script setup>
import { computed, ref, watch } from 'vue';
import { toPublicImage } from 'src/extras/misc';
import { objetHasValue } from 'src/extras/object';
import { useUserStore } from 'stores/user';
import { useQuasar } from 'quasar';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();
const $q = useQuasar();

const emit = defineEmits(['update:modelValue', 'onUpdateSuccess']);
const modelValueLocal = ref(props.modelValue);
const tab = ref('schedules');
const userLocal = ref(
  Object.assign(
    {},
    {
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      birthday: props.user.birthday,
      position: props.user.health_center_member.position,
      image: null,
    }
  )
);
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

const imagePreview = computed(() =>
  props.user.image ? toPublicImage(props.user.image.path) : null
);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);

const onUpdate = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message } = await userStore.update({
    ...userLocal.value,
    userID: props.user.id,
  });
  isFormLoading.value = false;
  if (code === 200) {
    $q.notify({
      message: 'User updated successfully!',
      color: 'positive',
    });
    modelValueLocal.value = false;
    userLocal.value.image = null;
    emit('onUpdateSuccess');
    return;
  }
  formError.value = message;
};
</script>
