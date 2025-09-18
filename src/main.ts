import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./styles.css";
import { loadThoughtsFromStorage } from "./data/thoughts";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// localStorage dan thoughts ni yuklash
loadThoughtsFromStorage();

app.mount("#app");
