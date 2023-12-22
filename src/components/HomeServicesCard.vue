<template>
  <q-card class="bg-white q-pb-md" dark flat>
    <q-card-section>
      <h6 class="text-h6 q-my-none">Try our offered services</h6>
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-card class="text-black">
            <q-card-section>
              <q-item class="q-px-none q-pt-none">
                <q-item-section
                  ><p class="text-subtitle1 text-bold q-mb-none">
                    <q-icon name="calendar_month" class="q-mr-xs"></q-icon>Book
                    an Appointment
                  </p>
                  <p class="text-body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, nihil.
                  </p>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions class="justify-end">
              <q-btn
                color="primary"
                outline
                class="text-capitalize"
                unelevated
                @click="onBookScheduleAction"
                >Proceed</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black">
            <q-card-section>
              <q-item class="q-px-none q-pt-none">
                <q-item-section
                  ><p class="text-subtitle1 text-bold q-mb-none">
                    <q-icon name="today" class="q-mr-xs"></q-icon>Queues
                  </p>
                  <p class="text-body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, nihil.
                  </p>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions class="justify-end">
              <q-btn
                color="primary"
                outline
                class="text-capitalize"
                unelevated
                @click="onOpenQueueAction"
                >View</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black">
            <q-card-section>
              <q-item class="q-px-none q-pt-none">
                <q-item-section
                  ><p class="text-subtitle1 text-bold q-mb-none">
                    <q-icon name="event_available" class="q-mr-xs"></q-icon
                    >Check my Schedule
                  </p>
                  <p class="text-body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, nihil.
                  </p>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions class="justify-end">
              <q-btn
                color="primary"
                outline
                class="text-capitalize"
                unelevated
                @click="onOpenTrackerAction"
                >View</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black">
            <q-card-section>
              <q-item class="q-px-none q-pt-none">
                <q-item-section
                  ><p class="text-subtitle1 text-bold q-mb-none">
                    <q-icon name="medical_information" class="q-mr-xs"></q-icon
                    >Health Centers
                  </p>
                  <p class="text-body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, nihil.
                  </p>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions class="justify-end">
              <q-btn color="primary" outline class="text-capitalize" unelevated
                >Find</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black">
            <q-card-section>
              <q-item class="q-px-none q-pt-none">
                <q-item-section
                  ><p class="text-subtitle1 text-bold q-mb-none">
                    <q-icon name="medical_services" class="q-mr-xs"></q-icon
                    >Doctors
                  </p>
                  <p class="text-body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, nihil.
                  </p>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions class="justify-end">
              <q-btn color="primary" outline class="text-capitalize" unelevated
                >Find</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black">
            <q-card-section>
              <q-item class="q-px-none q-pt-none">
                <q-item-section
                  ><p class="text-subtitle1 text-bold q-mb-none">
                    <q-icon name="help_center" class="q-mr-xs"></q-icon>Help
                    Center
                  </p>
                  <p class="text-body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, nihil.
                  </p>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions class="justify-end">
              <q-btn color="primary" outline class="text-capitalize" unelevated
                >View</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-card-section>

    <ScheduleAppointmentDialog v-model="isAppointmentDialogOpen" />
    <QueueDialog v-model="isQueueDialogOpen" />
    <ScheduleTrackerDialog v-model="isTrackerDialogOpen" />
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeServicesBanner',
});
</script>

<script setup>
import { ref } from 'vue';
import ScheduleAppointmentDialog from 'components/ScheduleAppointmentDialog.vue';
import ScheduleTrackerDialog from 'components/ScheduleTrackerDialog.vue';
import QueueDialog from 'components/QueueDialog.vue';

const isAppointmentDialogOpen = ref(false);
const isQueueDialogOpen = ref(false);
const isTrackerDialogOpen = ref(false);

const onBookScheduleAction = () =>
  (isAppointmentDialogOpen.value = !isAppointmentDialogOpen.value);
const onOpenQueueAction = () =>
  (isQueueDialogOpen.value = !isQueueDialogOpen.value);
const onOpenTrackerAction = () =>
  (isTrackerDialogOpen.value = !isTrackerDialogOpen.value);
</script>
