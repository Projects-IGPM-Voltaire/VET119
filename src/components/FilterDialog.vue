<template>
  <q-dialog v-model="dialogVisible">
    <q-card style="width:50vw;">
      <q-card-section class="q-pa-md column items-stretch q-gutter-md">
        <div class="row col-12 q-col-gutter-md q-py-md q-pl-md">
          <q-input outlined class="col" icon="calendar-month" color="grey" type="date" label="Date From" />
          <q-input outlined class="col" icon="calendar-month" color="grey" type="date" label="Date To" />
        </div>
        <div class="row col-12 q-col-gutter-md q-pl-md">
          <q-input outlined class="col" icon="calendar-month" color="grey" type="time" label="Time From" />
          <q-input outlined class="col" icon="calendar-month" color="grey" type="time" label="Time To" />
        </div>
        <div class="col-12">
          <q-select outlined color="grey" label="Purpose" />
        </div>
        <div class="col-12">
          <q-btn unelevated color="primary" class="full-width text-bold q-py-md" label="Filter" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FilterDialog',
  });
</script>
<script setup>
  import { ref } from 'vue';

  const dialogVisible = ref(true);
</script>
