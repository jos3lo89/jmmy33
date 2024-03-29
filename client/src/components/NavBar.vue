<script setup>
import { RouterLink } from "vue-router";
import { logoutUser } from "../api/service";
import { useRouter } from "vue-router";
import { useAuthStore } from "../context/authStore";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await logoutUser();
    authStore.token = undefined;
    authStore.nombre = undefined;
    authStore.userId = undefined;
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <header>
    <div><span>Vue - sqlite</span></div>
    <nav>
      <RouterLink :to="{ name: 'home' }">home</RouterLink>
      <RouterLink :to="{ name: 'login' }">login</RouterLink>
      <RouterLink :to="{ name: 'register' }">register</RouterLink>
    </nav>

    <div v-if="authStore.token">
      <p>{{ authStore.nombre }}</p>
    </div>

    <button v-if="!authStore.token" @click="router.push({ name: 'login' })">
      iniciar sesion
    </button>
    <button v-else @click="handleLogout">cerra sesion</button>
  </header>
</template>

<style scoped></style>
