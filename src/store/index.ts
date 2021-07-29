import { createStore } from "vuex";

declare module "vuex" {
  export function useStore(): typeof store;
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: typeof store;
  }
}

const store = createStore({}, true);

export default store;
