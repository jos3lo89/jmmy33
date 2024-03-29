<script setup>
import { reactive } from "vue";
import { loginUsers } from "../api/service";
import { useRouter } from "vue-router";
import { useAuthStore } from "../context/authStore";

const authStore = useAuthStore();
const router = useRouter();

const userData = reactive({
  email: "",
  clave: "",
});

const handleLogin = async () => {
  try {
    const res = await loginUsers(userData);
    console.log(res);
    authStore.token = res.data.token;
    authStore.nombre = res.data.nombre;
    authStore.userId = res.data.id;
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section>
    <div>
      <h2>Ingresar</h2>
    </div>
    <div>
      <form @submit.prevent="handleLogin">
        <input v-model="userData.email" type="email" placeholder="Emai" />
        <input
          v-model="userData.clave"
          type="password"
          placeholder="Password"
        />
        <div>
          <button type="submit">Ingresar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
