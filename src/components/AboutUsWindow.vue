<template>
  <div class="q-mt-xl">
    <div class="container q-mb-xl q-pa-sm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <div>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div class="bg-primary q-pa-sm" style="padding: 5rem 0">
      <div class="container text-white">
        <div class="row q-col-gutter">
          <template v-for="(feature, index) in features" :key="index">
            <div class="col-12 col-md-3 q-pa-md">
              <div class="text-center">
                <q-icon
                  :name="feature.icon"
                  size="5rem"
                  class="q-mb-md"
                ></q-icon>
                <div class="text-center text-h6 q-mb-md text-weight-bold">
                  {{ feature.title }}
                </div>
                <div class="text-center text-subtitle1 q-mb-none">
                  {{ feature.description }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutUsWindow',
});
</script>

<script setup>
import ArchieImage from '../assets/proponents/archie.jpg';
import AshleeImage from '../assets/proponents/ashlee.png';
import DorynImage from '../assets/proponents/doryn.jpeg';
import MichaelaImage from '../assets/proponents/michaela.jpeg';
import SofiaImage from '../assets/proponents/sofia.jpeg';
import IsaacImage from 'assets/proponents/isaac.jpg';
import MeImage from 'assets/me.jpg';

const features = [
  {
    icon: 'event',
    title: 'Effortless Scheduling',
    description:
      'Take control of your time with our intuitive appointment system. Your schedule, your way.',
  },
  {
    icon: 'update',
    title: 'Stay on Top',
    description:
      'Our Schedule Tracker keeps you in the loop, ensuring you never miss a beat. Real-time updates, always at your fingertips.',
  },
  {
    icon: 'account_circle',
    title: 'Manage with Ease',
    description:
      'Simplify your life with our comprehensive Account Management tools. Your details, your preferences—perfectly organized.',
  },
  {
    icon: 'mobile_friendly',
    title: 'Go Where You Go',
    description:
      "Experience ultimate flexibility with our mobile-friendly design. Access anytime, anywhere, because your world doesn't stand still.",
  },
];

const proponents = [
  {
    image: AshleeImage,
    name: 'Armas, Ashlee B.',
  },
  {
    image: SofiaImage,
    name: 'Bartolo, Sofia P.',
  },
  {
    image: DorynImage,
    name: 'David, Doryn Maurice C.',
  },
  {
    image: MichaelaImage,
    name: 'Domingo, Micaela Denise G.',
  },
  {
    image: ArchieImage,
    name: 'Ferrera, Archie B.',
  },
  {
    image: IsaacImage,
    name: 'Melgar, Isaac Gregory P.',
  },
];
</script>
