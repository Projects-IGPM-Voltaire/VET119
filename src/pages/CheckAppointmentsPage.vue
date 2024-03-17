<template>
  <q-page class="bg-secondary">
    <div class="row q-py-lg q-px-xl q-col-gutter-xl q-gutter-lg">
      <div class="q-mt-none q-pt-none col-4 column q-gutter-none items-stretch">
        <div class="q-mb-lg">
          <h6 class="q-mb-sm text-primary text-bold text-capitalize">
            Check booked schedule
          </h6>
          <span class="text-base text-body">
            Click an appointment below for more details.
          </span>
        </div>
        <div>
          <q-btn
              class="full-width"
              color="white"
          >
            <q-card flat class="full-width column items-stretch justify-between q-px-sm q-py-md q-gutter-xs">
              <div class="q-mb-md col-12 text-left">
                <q-icon name="event_available" color="accent" />
                <span class="text-bold text-base q-ml-md">March 17, 2024, 10:00 AM</span>
              </div>
              <div class="col-12 q-mb-xs row justify-between">
                <span class="col text-grey text-left text-capitalize">Owner Name</span>
                <span class="col text-base text-right text-capitalize">John Doe</span>
              </div>
              <div class="col-12 row justify-between">
                <span class="col text-grey text-left text-capitalize">Number of Pets</span>
                <span class="col text-base text-right text-capitalize">2</span>
              </div>
              <div class="col-12 row justify-between">
                <span class="col text-grey text-left text-capitalize">Reference Number</span>
                <span class="col text-base text-right text-capitalize">031024-0006-001</span>
              </div>
            </q-card>
          </q-btn>
        </div>
      </div>
      <div class="q-mt-none q-pt-none col-7 column items-start">
        <h6 class="q-mb-sm text-bold text-primary">Reminders</h6>
        <p class="text-base">1. Save your reference number beforehand to your notes app or as a picture for easy access during your booking day.</p>
        <p class="text-base">2. You can use your mobile device to track your queue in real time</p>
        <p class="text-base">3. Familiarize yourself with the Veterinary Clinic Location. You can find the location by clicking here.</p>
        <p class="text-base">4. Bring light snacks and water. Consume these while waiting for your queue.</p>
        <p class="text-base">5. Punctuality matters. Come on time to ensure a smooth process and to avoid pushing back your appointment and queue.</p>
      </div>
      <div class="col-4">
        <div class="q-mt-xl q-pt-none col-4 column q-gutter-none items-stretch">
          <div class="q-mb-lg">
            <h6 class="q-mb-sm text-primary text-bold text-capitalize">
              Past Appointments
            </h6>
            <span class="text-base text-body">
              Click an appointment below for more details.
            </span>
          </div>
          <div>
            <q-btn
                class="full-width"
                color="white"
            >
              <q-card flat class="full-width column items-stretch justify-between q-px-sm q-py-md q-gutter-xs">
                <div class="q-mb-md col-12 text-left">
                  <q-icon name="event_available" color="accent" />
                  <span class="text-bold text-base q-ml-md">March 17, 2024, 10:00 AM</span>
                </div>
                <div class="col-12 q-mb-xs row justify-between">
                  <span class="col text-grey text-left text-capitalize">Owner Name</span>
                  <span class="col text-base text-right text-capitalize">John Doe</span>
                </div>
                <div class="col-12 row justify-between">
                  <span class="col text-grey text-left text-capitalize">Number of Pets</span>
                  <span class="col text-base text-right text-capitalize">2</span>
                </div>
                <div class="col-12 row justify-between">
                  <span class="col text-grey text-left text-capitalize">Reference Number</span>
                  <span class="col text-base text-right text-capitalize">031024-0006-001</span>
                </div>
              </q-card>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'CheckAppointmentsPage',
  });
</script>
