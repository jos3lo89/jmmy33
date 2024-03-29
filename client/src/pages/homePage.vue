<script setup>
import { onMounted, ref } from "vue";
import { getAllUsers, deleteUser } from "../api/service";
import { useAuthStore } from "../context/authStore";
const authStore = useAuthStore();

const allUsers = ref([]);

const loadUsers = async () => {
  try {
    const res = await getAllUsers();
    console.log(res.data);
    allUsers.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadUsers();
});

const handleDelete = async (id) => {
  try {
    const res = await deleteUser(id);
    console.log(res);
    loadUsers();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section>
    <div>
      <h2>Lista de usuarios</h2>
    </div>
    <div>
      <div v-if="allUsers.length >= 2" v-for="(user, i) in allUsers" :key="i">
        <div v-if="authStore.userId !== user.id">
          <div>
            <img :src="`http://localhost:5000${user.foto}`" alt="" />
          </div>
          <p>nombre: {{ user.nombre }}</p>
          <p>apellido: {{ user.apellido }}</p>
          <p>email: {{ user.email }}</p>
          <div>
            <button @click="handleDelete(user.id)">Eliminar</button>
            <button @click="">editra</button>
          </div>
        </div>
      </div>
      <div v-else>
        <h2>No hay usuario que mostrar excepto solo el tuyo</h2>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
