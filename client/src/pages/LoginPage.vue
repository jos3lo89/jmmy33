<script setup>
import { reactive } from "vue";
import { loginUsers } from "../api/service";
import { useRouter } from "vue-router";
import { useAuthStore } from "../context/authStore";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const router = useRouter();

const userData = reactive({
  email: "",
  clave: "",
});

const handleLogin = async () => {
  try {
    const res = await loginUsers(userData);
    // console.log(res);
    authStore.token = res.data.token;
    authStore.nombre = res.data.nombre;
    authStore.userId = res.data.id;
    router.push({ name: "home" });
  } catch (error) {
    // console.log(error);
    error.response.data.message.forEach((err) => {
      toast.warn(err, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    });
  }
};
</script>

<template>
  <section>
    <div class="text-center my-4">
      <h2 class="capitalize text-2xl font-semibold">Ingresar</h2>
    </div>
    <div class="flex items-center justify-center">
      <form @submit.prevent="handleLogin" class="bg-cyan-100 p-4 rounded-md">
        <input
          v-model="userData.email"
          type="email"
          placeholder="Emai"
          class="outline-none rounded-md p-2 bg-sky-900 text-white block mb-2"
          required
        />
        <input
          v-model="userData.clave"
          type="password"
          placeholder="Password"
          class="outline-none rounded-md p-2 bg-sky-900 text-white block mb-2"
          required
        />
        <div class="text-center">
          <button
            type="submit"
            class="bg-blue-600 py-1 px-2 rounded-md text-white"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
    <div class="text-center my-4">
      <p class="text-lg">
        ¿no tienes una cuenta?
        <span
          @click="router.push({ name: 'register' })"
          class="text-blue-600 cursor-pointer"
          >Registrate Aquí</span
        >
      </p>
    </div>
  </section>
</template>

<style scoped></style>
