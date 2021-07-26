import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./vuetify";

const app = createApp(App);
app.use(vuetify);
app.use(store);
app.mount("#app");
