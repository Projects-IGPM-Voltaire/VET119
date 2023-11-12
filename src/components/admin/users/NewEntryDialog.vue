<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add new User</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
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
            </div>
          </div>
          <div class="col-12">
            <q-select label="User type" outlined></q-select>
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
  name: "AdminUserNewEntryDialog",
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
