import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const token = ref(undefined);
    const nombre = ref(undefined);
    const userId = ref(undefined);

    return { token, nombre, userId };
  },
  { persist: true }
);
