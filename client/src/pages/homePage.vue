<script setup>
import { onMounted, ref } from "vue";
import { getAllUsers, deleteUser } from "../api/service";
import { useAuthStore } from "../context/authStore";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();

const authStore = useAuthStore();

const allUsers = ref([]);

const loadUsers = async () => {
  try {
    const res = await getAllUsers();
    // console.log(res.data);
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
    // console.log(res);
    loadUsers();

    if (res.status == 204) {
      toast.warn("usuario eliminado", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section>
    <div class="text-center my-4">
      <h2 class="text-2xl capitalize font-semibold">Lista de usuarios</h2>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
    >
      <div
        v-if="allUsers.length >= 2"
        v-for="(user, i) in allUsers"
        v-show="authStore.userId !== user.id"
        :key="i"
        class="bg-slate-800 p-2 m-2 rounded-md relative"
      >
        <!-- <div v-if="authStore.userId !== user.id" class="bg-red-500"> -->
        <div>
          <img
            :src="`http://localhost:5000${user.foto}`"
            alt=""
            class="w-full rounded-md"
          />
        </div>
        <div class="mb-9">
          <p class="text-white">
            <span class="text-orange-500">nombre:</span> {{ user.nombre }}
          </p>
          <p class="text-white">
            <span class="text-orange-500">apellido:</span> {{ user.apellido }}
          </p>
          <p class="text-white">
            <span class="text-orange-500">email:</span> {{ user.email }}
          </p>
        </div>
        <div class="absolute bottom-1">
          <button
            @click="handleDelete(user.id)"
            class="bg-red-600 px-2 py-1 rounded-md text-white capitalize mx-2 my-1"
          >
            Eliminar
          </button>
          <button
            @click="
              router.push({
                name: 'update',
                params: {
                  id: user.id,
                },
              })
            "
            class="bg-yellow-600 px-2 py-1 rounded-md text-white capitalize mx-2 my-1"
          >
            editar
          </button>
        </div>
      </div>
      <div v-else class="text-center my-4">
        <h2 class="text-2xl">
          No hay usuarios
          <span
            @click="router.push({ name: 'register' })"
            class="text-blue-600 cursor-pointer"
            >Registra aquí</span
          >
        </h2>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
