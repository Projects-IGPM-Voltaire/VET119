<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="width: 800px">
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
                <div>
                  <a
                    :href="center.address.map_url"
                    class="text-subtitle2"
                    target="_blank"
                  >
                    <q-icon name="map" class="q-mr-xs" />
                    {{ toAddress(center.address) }}
                  </a>
                </div>
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                <q-img width="100%" :src="toPublicImage(center.image.path)" />
              </q-card-section>
              <q-card-section
                v-if="
                  center.members.filter(
                    (member, _) => member.position === 'doctor'
                  ).length > 0
                "
              >
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
                        <q-item clickable v-ripple>
                          <q-item-section
                            avatar
                            v-if="objetHasValue(member.user.image)"
                          >
                            <q-avatar>
                              <img
                                :src="toPublicImage(member.user.image.path)"
                              />
                            </q-avatar>
                          </q-item-section>
                          <q-item-section
                            >{{ member.user.first_name }}
                            {{ member.user.last_name }}</q-item-section
                          >
                        </q-item>
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
import { ref, watch } from 'vue';
import { objetHasValue } from 'src/extras/object';
import { useQuasar } from 'quasar';
import { toAddress, toPublicImage } from '../extras/misc';
import { useHealthCenterStore } from 'stores/healthCenter';
import { useAuthStore } from 'stores/auth';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const $q = useQuasar();
const healthCenterStore = useHealthCenterStore();
const authStore = useAuthStore();

const modelValueLocal = ref(props.modelValue);
const healthCenters = ref([]);

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
