import { createApp } from "vue";
import App from "./App.vue";
import "reset-css";
import "@/assets/style/style.css";
import router from "./routes";
import $bus from "./utils/Events";

const app = createApp(App);

app.use(router);

app.config.globalProperties.$bus = $bus;

app.mount("#app");
