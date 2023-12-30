<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div>
          <div class="text-h6">Find other centers</div>
          <div class="text-subtitle2">
            Health centers at
            {{ authUser.health_center_member.center.address.barangay.name }}
          </div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section
        ><template v-for="(center, index) in healthCenters" :key="index">
          <q-item>
            <q-item-section top thumbnail class="q-ml-none">
              <img
                :src="toPublicImage(center.image.path)"
                v-if="objetHasValue(center.image)"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ center.name }}</q-item-label>
              <q-item-label caption>{{ center.members.length }}</q-item-label>
            </q-item-section>

            <q-item-section side top> </q-item-section>
          </q-item> </template
      ></q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HealthCentersDialog',
});
</script>

<script setup>
import { computed, ref, watch } from 'vue';
import { objetHasValue } from 'src/extras/object';
import { useScheduleStore } from 'stores/schedule';
import { useQuasar } from 'quasar';
import {
  convertTo12HourFormat,
  convertToDateReadable,
  debounce,
  toPublicImage,
} from '../extras/misc';
import { useHealthCenterStore } from 'stores/healthCenter';
import { useAuthStore } from 'stores/auth';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const $q = useQuasar();
const healthCenterStore = useHealthCenterStore();
const authStore = useAuthStore();

const modelValueLocal = ref(props.modelValue);
const healthCenters = ref([]);

const authUser = computed(() => authStore.user);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);

const getHealthCenters = async () => {
  const { code, data } = await healthCenterStore.list({
    barangayCode:
      authUser.value.health_center_member.center.address.barangay.code,
  });
  if (code === 200) {
    healthCenters.value = data;
    return;
  }
  $q.notify({
    message: 'Something went wrong to the server.',
    color: 'negative',
  });
};

getHealthCenters();
</script>
