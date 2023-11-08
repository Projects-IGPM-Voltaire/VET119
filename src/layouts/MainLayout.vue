<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary container">
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            style="text-decoration: none"
            :to="{ name: 'home-page' }"
            class="text-white text-bold"
            >MediQueue</router-link
          >
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn :to="{ name: 'home-page' }" class="text-capitalize q-mr-sm" flat
          >Home</q-btn
        >
        <q-btn :to="{ name: 'login-page' }" class="text-capitalize q-mr-sm" flat
          >Login</q-btn
        >
        <q-btn :to="{ name: 'register-page' }" class="text-capitalize" flat
          >Register</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<script setup></script>
