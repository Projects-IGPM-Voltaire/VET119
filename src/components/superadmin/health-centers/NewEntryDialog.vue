<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add new Health Center</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input color="primary" outlined label="Name" />
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
              <div class="col-12">
                <q-input color="primary" outlined label="Google Map Link" />
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
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SuperadminHealthCenterNewEntryDialog",
});
</script>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const modelValueLocal = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit("update:modelValue", val)
);
</script>
