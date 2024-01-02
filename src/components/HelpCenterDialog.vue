<template>
  <q-dialog persistent v-model="modelValueLocal">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div>
          <div class="text-h6">Help Center</div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div>
        <q-card-section>
          <h5>Getting Started:</h5>
          <p>
            MediQueue is a queueing management system that allows patients to
            book an appointment online beforehand without visiting the actual
            health center. The available schedules provided in the website will
            be the appointment time of the patient based on the services they
            needed. This allows them to choose the most suitable schedule that
            works for them and decrease their waiting time.
          </p>
        </q-card-section>

        <q-card-section>
          <h5>User Guide:</h5>
          <ol>
            <li>
              Choose - Browse from our offered services and choose one that
              suits your needs.
            </li>
            <li>
              Register - Let us know about you. Fill up and complete the
              required registration details.
            </li>
            <li>
              Book - Book your appointment and choose the schedule that works
              for you.
            </li>
          </ol>
        </q-card-section>

        <q-card-section>
          <h5>Features:</h5>
          <ol>
            <li>
              <h6>Home Page (Poster of Seasonal Projects):</h6>
              <p>
                Display seasonal projects on the home page to keep users
                informed about ongoing initiatives.
              </p>
            </li>
            <!-- Add other features here... -->
          </ol>
        </q-card-section>

        <q-card-section>
          <h5>Troubleshooting:</h5>
          <ul>
            <li>Check your data or wifi connection and reload the website.</li>
            <li>
              If still not in work, contact information for customer support by
              sending an email to mediqueue.pr2@gmail.com.
            </li>
          </ul>
        </q-card-section>

        <q-card-section>
          <h5>Security and Privacy:</h5>
          <p>
            This website, created by Valenzuela City School of Mathematics and
            Science Grade 12 students in compliance with their Practical II
            Research Subject, prioritizes the security and privacy of user
            information. All data collected from this website will be treated
            with utmost confidentiality and used solely for healthcare purposes.
          </p>
          <!-- Add more details about security and privacy... -->
        </q-card-section>

        <q-card-section>
          <h5>Updates and Release Notes:</h5>
          <p>
            For more updates please visit our page: MediQueue (or link)*
            assuming fb page ito
          </p>
        </q-card-section>

        <q-card-section>
          <h5>Terms of Service:</h5>
          <p>
            The use of MediQueue website or sending an email to
            mediqueue.pr2@gmail.com means that you are allowing us to
            communicate with you and work on your details from the registration.
            Therefore, we will communicate with you via email. And for
            clarification, you agree that our communication and the information
            we provided satisfy any legal requirements that such communications
            be in writing.
          </p>
        </q-card-section>

        <q-card-section>
          <h5>Feedback:</h5>
          <p>
            We value your feedback as it plays a crucial role in enhancing and
            refining the user experience of the MediQueue website. Your insights
            and suggestions help us identify areas for improvement and ensure
            that we continue to meet your expectations.
          </p>
          <p>
            To provide feedback on the system, please follow these instructions:
          </p>
          <ol>
            <li>Navigate to the [link].</li>
            <li>
              Fill out the feedback form with your thoughts, suggestions, or any
              issues you may have encountered.
            </li>
            <li>
              Submit the form to contribute to the ongoing improvement of our
              services.
            </li>
          </ol>
          <p>
            Thank you for taking the time to share your feedback with us. Your
            input is invaluable in our commitment to providing a seamless and
            efficient healthcare appointment management experience.
          </p>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpCenterDialog',
});
</script>

<script setup>
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const $q = useQuasar();

const modelValueLocal = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => (modelValueLocal.value = val)
);
watch(
  () => modelValueLocal.value,
  (val) => emit('update:modelValue', val)
);
</script>
