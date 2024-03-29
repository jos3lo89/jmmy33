<script setup>
import { RouterView } from "vue-router";
import MainLayout from "./layout/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <template v-slot:mainSlot>
      <RouterView></RouterView>
    </template>
  </MainLayout>
</template>

<style scoped></style>
