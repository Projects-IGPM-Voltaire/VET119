<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary container">
      <q-toolbar>
        <q-toolbar-title class="text-bold">Mediqueue </q-toolbar-title>
        <q-space></q-space>
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
