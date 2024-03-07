import { createApp } from "vue";
import App from "./App.vue";
import "reset-css";
import "@/assets/style/style.css";
import router from "./routes";

const app = createApp(App);

app.use(router);

app.mount("#app");
