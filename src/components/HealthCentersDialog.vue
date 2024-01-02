<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none">
        <div>
          <div class="text-h6">Health centers using Mediqueue</div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section
        ><template v-for="(center, index) in healthCenters" :key="index">
          <q-expansion-item>
            <template v-slot:header>
              <q-item-section avatar v-if="objetHasValue(center.image)">
                <q-avatar size="xl" square>
                  <img :src="toPublicImage(center.image.path)" />
                </q-avatar>
              </q-item-section>

              <q-item-section class="text-capitalize">
                <div class="text-h6 text-bold">
                  {{ center.name }}
                </div>
                <div class="text-subtitle2">
                  {{ toAddress(center.address) }}
                </div>
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                <q-img width="100%" :src="toPublicImage(center.image.path)" />
              </q-card-section>
              <q-card-section>
                <div class="text-subtitle2 q-mb-md">Doctors</div>
                <div class="row">
                  <template
                    v-for="(member, index2) in center.members"
                    :key="index2"
                  >
                    <div
                      class="col-12 col-lg-4"
                      v-if="member.position === 'doctor'"
                    >
                      <div>
                        <q-card class="my-card">
                          <q-img
                            :src="toPublicImage(member.user.image.path)"
                            v-if="objetHasValue(member.user.image)"
                          >
                            <div
                              class="absolute-bottom text-subtitle2 text-center"
                            >
                              {{ member.user.first_name }}
                              {{ member.user.last_name }}
                            </div>
                          </q-img>
                          <div
                            class="absolute-bottom text-subtitle2 text-center"
                            v-else
                          >
                            {{ member.user.first_name }}
                            {{ member.user.last_name }}
                          </div>
                        </q-card>
                      </div>
                    </div>
                  </template>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </template></q-card-section
      >
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
  toAddress,
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
    search: null,
    barangayCode: null,
  });
  if (code === 200) {
    console.log(data);
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
