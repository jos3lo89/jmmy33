<script setup>
import { reactive, ref } from "vue";
import { registerUser } from "../api/service";

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
  console.log(fotoUser.value);

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
    console.log(res);
    resetForm();
  } catch (error) {
    console.log(error);
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
    <div>
      <h2>registra</h2>
    </div>
    <div>
      <form @submit.prevent="saveUser">
        <input v-model="dataUser.nombre" type="text" placeholder="nombre" />
        <input v-model="dataUser.apellido" type="text" placeholder="apellido" />
        <input v-model="dataUser.email" type="email" placeholder="email" />
        <input
          v-model="dataUser.clave"
          type="password"
          placeholder="passsword"
        />
        <input ref="inputFile" @change="handleChangeFoto" type="file" />
        <div v-if="fotoView">
          <img :src="fotoView" alt="" />
        </div>
        <div>
          <button type="submit">registrar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
