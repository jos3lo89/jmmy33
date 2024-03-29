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
  <header class="bg-sky-950 text-white flex justify-around py-4">
    <div>
      <span class="text-2xl capitalize font-semibold">Vue - sqlite</span>
    </div>
    <nav v-if="authStore.token">
      <RouterLink
        class="text-2xl border-b-2 border-orange-600"
        :to="{ name: 'home' }"
        >Inicio</RouterLink
      >
    </nav>

    <div class="flex gap-3 items-center">
      <p v-if="authStore.token" class="capitalize bg-sky-900 rounded-md p-1">
        {{ authStore.nombre }}
      </p>

      <button
        v-if="!authStore.token"
        @click="router.push({ name: 'login' })"
        class="bg-blue-600 py-1 px-2 rounded-md"
      >
        iniciar sesion
      </button>
      <button
        v-else
        @click="handleLogout"
        class="bg-red-600 py-1 px-2 rounded-md"
      >
        cerra sesion
      </button>
    </div>
  </header>
</template>

<style scoped></style>
