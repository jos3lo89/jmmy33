<script setup>
import { useRoute } from "vue-router";
import { findUserById } from "../api/service";
import { onMounted, reactive, ref } from "vue";
import { updateUser, updateFotoUser } from "../api/service";

const route = useRoute();
const userData = reactive({
  nombre: "",
  apellido: "",
  email: "",
  clave: "",
});

const fotoUser = ref("");
const fotoView = ref(undefined);
const fotoActualizar = ref(undefined);
const inputFile = ref(null);

const loadUserData = async () => {
  try {
    const res = await findUserById(route.params.id);
    // console.log(res);
    userData.nombre = res.data.nombre;
    userData.apellido = res.data.apellido;
    userData.email = res.data.email;
    userData.clave = res.data.clave;

    fotoUser.value = res.data.foto;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadUserData();
});

const handleChangeFoto = (e) => {
  const fotoSelected = e.target.files[0];
  fotoActualizar.value = fotoSelected;
  fotoView.value = URL.createObjectURL(fotoSelected);
};

const handleUpdateUser = async () => {
  try {
    const res = await updateUser(route.params.id, {
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email,
      clave: userData.clave,
    });
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateFoto = async () => {
  const formData = new FormData();
  formData.append("foto", fotoActualizar.value);

  try {
    const res = await updateFotoUser(route.params.id, formData);
    // console.log(res);
    inputFile.value.value = null;
    fotoView.value = undefined;
    loadUserData();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section class="lg:flex lg:gap-20 lg:justify-center ">
    <div>
      <div class="text-center my-4">
        <h1 class="text-2xl capitalize font-semibold">actualizar datos</h1>
      </div>
      <div class="flex justify-center items-center">
        <form
          @submit.prevent="handleUpdateUser"
          class="bg-cyan-700 p-4 rounded-md"
        >
          <input
            v-model="userData.nombre"
            type="text"
            placeholder="Nombre"
            class="bg-slate-900 p-2 rounded-md outline-none text-white block w-full mb-2"
          />
          <input
            v-model="userData.apellido"
            type="text"
            placeholder="Apellido"
            class="bg-slate-900 p-2 rounded-md outline-none text-white block w-full mb-2"
          />
          <input
            v-model="userData.email"
            type="email"
            placeholder="Email"
            class="bg-slate-900 p-2 rounded-md outline-none text-white block w-full mb-2"
          />
          <input
            v-model="userData.clave"
            type="password"
            placeholder="Clave"
            class="bg-slate-900 p-2 rounded-md outline-none text-white block w-full mb-2"
          />
          <div class="text-center">
            <button
              type="submit"
              class="bg-yellow-600 text-white capitalize py-1 px-2 rounded-md"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>

    <div>
      <div class="text-center my-3">
        <h2 class="text-2xl capitalize font-semibold">Actualizar foto</h2>
      </div>
      <div class="flex justify-center items-center flex-col">
        <div class="bg-zinc-950 p-2 rounded-md m-1">
          <img :src="fotoUser" alt="" class="max-w-52 mx-auto" />
        </div>
        <div v-if="fotoView" class="bg-zinc-950 p-2 rounded-md m-1">
          <img :src="fotoView" alt="" class="max-w-52 mx-auto" />
        </div>
        <div class="mb-10">
          <input
            ref="inputFile"
            @change="handleChangeFoto"
            type="file"
            class="file:bg-blue-600 p-2 file:rounded-md file:outline-none file:border-none file:text-white bg-zinc-900 text-white rounded-md block my-3"
          />
          <button
            @click="handleUpdateFoto"
            class="bg-yellow-600 py-1 px-2 rounded-md text-white"
          >
            actualizar foto
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
