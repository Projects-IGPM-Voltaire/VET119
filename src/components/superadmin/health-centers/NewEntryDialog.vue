<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add new Health Center</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <p class="text-subtitle1 text-negative" v-if="!!formError">
          {{ formError }}
        </p>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              color="primary"
              outlined
              label="Name"
              v-model="form.name"
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

          <div class="col-12">
            <p class="text-subtitle2 text-grey-6">Address</p>
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  color="primary"
                  outlined
                  label="House number or building"
                  v-model="form.house_number"
                />
              </div>
              <div class="col-8">
                <q-input
                  color="primary"
                  outlined
                  label="Street"
                  v-model="form.street"
                />
              </div>
              <div class="col-12">
                <CustomBarangaySelect
                  color="primary"
                  outlined
                  label="Barangay"
                  v-model="form.barangay_code"
                />
              </div>
              <div class="col-12">
                <q-input
                  color="primary"
                  outlined
                  label="Google Map Link"
                  v-model="form.map_url"
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
  name: 'SuperadminHealthCenterNewEntryDialog',
});
</script>

<script setup>
import { reactive, ref, watch } from 'vue';
import CustomBarangaySelect from 'components/CustomBarangaySelect.vue';
import { useHealthCenterStore } from 'stores/healthCenter';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'onCreateSuccess']);

const healthCenter = useHealthCenterStore();
const router = useRouter();
const $q = useQuasar();

const modelValueLocal = ref(props.modelValue);
const defaultForm = {
  name: null,
  image: null,
  house_number: null,
  street: null,
  city_code: '137504',
  barangay_code: null,
  map_url: null,
};
let form = reactive(Object.assign(defaultForm));
const isFormLoading = ref(false);
const formError = ref(false);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);

const onCreate = async () => {
  formError.value = null;
  isFormLoading.value = true;
  const { code, message } = await healthCenter.create(form);
  isFormLoading.value = false;
  if (code === 200) {
    $q.notify({
      message: 'Health center created successfully!',
      color: 'positive',
    });
    modelValueLocal.value = false;
    emit('onCreateSuccess');
    form = Object.assign(defaultForm);
    return;
  }
  formError.value = message;
};
</script>
