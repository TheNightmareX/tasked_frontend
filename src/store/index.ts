import VuexORM from "@vuex-orm/core";
import { createStore } from "vuex";

const store = createStore({
  plugins: [VuexORM.install()],
});
export default store;

declare module "vuex" {
  export function useStore(): typeof store;
}
