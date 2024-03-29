import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPersisted from "pinia-plugin-persistedstate";
import router from "./router/router";
import vueCookies from "vue-cookies";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersisted);

app.use(pinia);
app.use(vueCookies, { expires: "1d" });
app.use(router);
app.mount("#app");
