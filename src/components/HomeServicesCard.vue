<template>
  <q-card class="bg-primary q-pb-md" dark flat>
    <q-card-section>
      <h6 class="text-h6 q-my-none">Try our offered services</h6>
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-card class="text-black" flat>
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
                color="secondary"
                class="text-capitalize"
                unelevated
                @click="onBookScheduleAction"
                >Proceed</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black" flat>
            <q-card-section>
              <q-item class="q-px-none q-pt-none">
                <q-item-section
                  ><p class="text-subtitle1 text-bold q-mb-none">
                    <q-icon name="today" class="q-mr-xs"></q-icon>Schedules
                  </p>
                  <p class="text-body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, nihil.
                  </p>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions class="justify-end">
              <q-btn color="secondary" class="text-capitalize" unelevated
                >View</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black" flat>
            <q-card-section>
              <q-item class="q-px-none q-pt-none">
                <q-item-section
                  ><p class="text-subtitle1 text-bold q-mb-none">
                    <q-icon name="event_available" class="q-mr-xs"></q-icon
                    >Check my Queue
                  </p>
                  <p class="text-body2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, nihil.
                  </p>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions class="justify-end">
              <q-btn color="secondary" class="text-capitalize" unelevated
                >View</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black" flat>
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
              <q-btn color="secondary" class="text-capitalize" unelevated
                >Find</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black" flat>
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
              <q-btn color="secondary" class="text-capitalize" unelevated
                >Find</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="text-black" flat>
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
              <q-btn color="secondary" class="text-capitalize" unelevated
                >View</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-card-section>

    <ScheduleAppointmentDialog v-model="isScheduleAppointmentDialogOpen" />
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeServicesBanner",
});
</script>

<script setup>
import { ref } from "vue";
import ScheduleAppointmentDialog from "components/ScheduleAppointmentDialog.vue";

const isScheduleAppointmentDialogOpen = ref(false);

const onBookScheduleAction = () =>
  (isScheduleAppointmentDialogOpen.value =
    !isScheduleAppointmentDialogOpen.value);
</script>
