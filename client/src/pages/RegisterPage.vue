<script setup>
import { reactive, ref } from "vue";
import { registerUser } from "../api/service";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();

const dataUser = reactive({
  nombre: "",
  apellido: "",
  email: "",
  clave: "",
});

const fotoUser = ref(null);
const fotoView = ref(undefined);

const inputFile = ref(null);

const handleChangeFoto = (e) => {
  const fotoSelected = e.target.files[0];

  fotoUser.value = fotoSelected;
  // console.log(fotoUser.value);

  fotoView.value = URL.createObjectURL(fotoSelected);
};

const saveUser = async () => {
  const dataForm = new FormData();

  dataForm.append("nombre", dataUser.nombre);
  dataForm.append("apellido", dataUser.apellido);
  dataForm.append("email", dataUser.email);
  dataForm.append("clave", dataUser.clave);
  dataForm.append("foto", fotoUser.value);

  try {
    const res = await registerUser(dataForm);
    // console.log(res);
    resetForm();

    if (res.status == 201) {
      toast.success("usuario creado", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
        transition: "slide",
      });
    }
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

const resetForm = () => {
  dataUser.nombre = "";
  dataUser.apellido = "";
  dataUser.email = "";
  dataUser.clave = "";

  inputFile.value.value = null;
  fotoView.value = undefined;
};
</script>

<template>
  <section>
    <div class="text-center my-4">
      <h2 class="text-2xl capitalize font-semibold">registrar</h2>
    </div>
    <div class="flex justify-center items-center">
      <form @submit.prevent="saveUser" class="bg-cyan-100 p-4 rounded-md">
        <input
          v-model="dataUser.nombre"
          type="text"
          placeholder="nombre"
          class="outline-none rounded-md p-2 bg-sky-900 text-white block mb-2 w-full"
          required
        />
        <input
          v-model="dataUser.apellido"
          type="text"
          placeholder="apellido"
          class="outline-none rounded-md p-2 bg-sky-900 text-white block mb-2 w-full"
          required
        />
        <input
          v-model="dataUser.email"
          type="email"
          placeholder="email"
          class="outline-none rounded-md p-2 bg-sky-900 text-white block mb-2 w-full"
          required
        />
        <input
          v-model="dataUser.clave"
          type="password"
          placeholder="passsword"
          class="outline-none rounded-md p-2 bg-sky-900 text-white block mb-2 w-full"
          required
        />
        <input
          ref="inputFile"
          @change="handleChangeFoto"
          type="file"
          class="block w-full bg-sky-900 p-2 rounded-md text-white file:bg-cyan-600 file:text-white file:outline-none file:border-none file:rounded-md file:cursor-pointer"
          required
        />
        <div v-if="fotoView" class="p-3 bg-cyan-950 mt-2 rounded-md">
          <img :src="fotoView" alt="" class="max-w-60 mx-auto" />
        </div>

        <div class="text-center my-2">
          <button
            type="submit"
            class="bg-blue-600 py-1 px-2 rounded-md text-white"
          >
            registrar
          </button>
        </div>
      </form>
    </div>
    <div class="text-center my-4">
      <p class="text-lg">
        ¿ya tienes una cuenta?
        <span
          @click="router.push({ name: 'login' })"
          class="text-blue-600 cursor-pointer"
          >Iniciar Sesión</span
        >
      </p>
    </div>
  </section>
</template>

<style scoped></style>
